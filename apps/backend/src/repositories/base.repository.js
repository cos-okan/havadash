export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async countAll() {
    return this.model.query().resultSize();
  }

  async parseOperator(op) {
    switch (op) {
      case 'gte':
        return '>=';
      case 'lte':
        return '<=';
      case 'gt':
        return '>';
      case 'lt':
        return '<';
      case 'neq':
        return '<>';
      case 'like':
        return 'like';
      case 'ilike':
        return 'ilike';
      default:
        return '=';
    }
  }

  async parseFilters(filterObj = {}, mainTableName) {
    const filters = [];
    Object.entries(filterObj).forEach(([key, filterValue]) => {
      const isOperatorObject = typeof filterValue === 'object' && filterValue !== null && !Array.isArray(filterValue);

      const opKey = isOperatorObject ? Object.keys(filterValue)[0] : 'eq';
      const value = isOperatorObject ? filterValue[opKey] : filterValue;

      const lastDotIndex = key.lastIndexOf('.');
      let path = mainTableName;
      let column = key;

      if (lastDotIndex !== -1) {
        path = key.substring(0, lastDotIndex);
        column = key.substring(lastDotIndex + 1);
      }

      filters.push({
        path,
        column,
        operator: this.allowFiltersCheckparseOperator(opKey),
        value,
      });
    });
    return filters;
  }

  async parseSort(sortObj = {}) {
    const sorts = [];
    Object.entries(sortObj).forEach(([key, direction]) => {
      const lastDotIndex = key.lastIndexOf('.');
      if (lastDotIndex === -1) return;

      const path = key.substring(0, lastDotIndex);
      const column = key.substring(lastDotIndex + 1);

      sorts.push({
        path,
        column,
        direction: String(direction).toLowerCase() === 'desc' ? 'desc' : 'asc',
      });
    });
    return sorts;
  }

  /**
   * buildQuery
   * modelClass: Objection.js model (User, Customer, Product)
   * queryParams: { include, fields, filter, sort, page }
   * options: { allowedIncludes, allowedFilters, allowedFields, allowedSorts, maxLimit } // YENİ
   */
  async buildQuery(base, params = {}, options = {}) {
    const { include, fields = {}, filter = {}, sort = {}, page = {} } = params;

    const {
      allowedIncludes = null,
      allowedFilters = {},
      allowedFields = {},
      allowedSorts = {},
      maxLimit = 100,
    } = options;

    const modelClass = typeof base.tableName === 'string' ? base : base.modelClass();
    let query = typeof base.query === 'function' ? base.query() : base;
    const mainTable = modelClass.tableName;

    const parsedFilters = this.parseFilters(filter, mainTable);
    parsedFilters.forEach(({ path, column, operator, value }) => {
      const allowFiltersCheck =
        !options.allowedFilters || (allowedFilters[path] && allowedFilters[path].includes(column));
      if (!allowFiltersCheck) {
        return;
      }

      if (path === mainTable) {
        query.where(column, operator, value);
      } else {
        const relationAlias = path.replace(/\./g, ':');
        query.whereIn(
          `${mainTable}.id`,
          modelClass
            .query()
            .select(`${mainTable}.id`)
            .joinRelated(path)
            .where(`${relationAlias}.${column}`, operator, value),
        );
      }
    });

    const pageOffset = parseInt(page.offset, 10) || 1;
    const requestedLimit = parseInt(page.limit, 10) || 20;
    const pageLimit = Math.min(requestedLimit, maxLimit);

    const countQuery = query.clone();
    countQuery.clear('select').clear('limit').clear('offset').clear('orderBy').clear('orderByRaw');
    const totalResult = await countQuery.count(`${mainTable}.id as count`).first();
    const totalItems = parseInt(totalResult.count, 10);

    if (include) {
      let relations = include.split(',');

      if (allowedIncludes) {
        relations = relations.filter((rel) => allowedIncludes.includes(rel));
      }

      if (relations.length > 0) {
        query.withGraphFetched(`[${relations.join(',')}]`);
      }
    }

    const sanitizedFields = {};
    const useFieldCheck = Object.keys(allowedFields).length > 0;

    if (useFieldCheck) {
      Object.entries(fields).forEach(([path, cols]) => {
        if (allowedFields[path]) {
          const allowedColumnsForPath = allowedFields[path];
          const validCols = cols
            .split(',')
            .map((c) => c.trim())
            .filter((col) => allowedColumnsForPath.includes(col));

          if (validCols.length > 0) {
            sanitizedFields[path] = validCols.join(',');
          }
        }
      });
    }
    const fieldsToUse = useFieldCheck ? sanitizedFields : fields;

    // Ana tablo kolonları
    if (fieldsToUse[mainTable]) {
      const mainCols = fieldsToUse[mainTable]
        .split(',')
        .map((c) => c.trim())
        .map((c) => `${mainTable}.${c}`);
      query.select(mainCols);
    } else {
      query.select(`${mainTable}.*`);
    }

    // Join edilen tablolar için güvenli kolonlar
    Object.entries(fieldsToUse).forEach(([path, cols]) => {
      if (path !== mainTable) {
        const safeCols = cols
          .split(',')
          .map((c) => c.trim())
          .filter((c) => c.toLowerCase() !== 'id'); // join id’leri eklenmez
        if (safeCols.length > 0) {
          query.modifyGraph(path, (builder) => builder.select(safeCols));
        }
      }
    });

    const parsedSorts = this.parseSort(sort);
    parsedSorts.forEach(({ path, column, direction }) => {
      const allowSortsCheck = !options.allowedSorts || (allowedSorts[path] && allowedSorts[path].includes(column));
      if (!allowSortsCheck) {
        return;
      }

      if (path === mainTable) {
        query.orderBy(column, direction);
      } else {
        query.modifyGraph(path, (builder) => {
          builder.orderBy(column, direction);
        });
      }
    });

    const data = await query.page(pageOffset - 1, pageLimit);

    const meta = {
      page: pageOffset,
      totalPage: Math.ceil(totalItems / pageLimit),
      totalCount: totalItems,
      limit: pageLimit,
    };

    return { data, meta };
  }
}