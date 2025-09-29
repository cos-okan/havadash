export interface ApiResponse<T = any> {
  status: string;
  data: {
    status: string;
    statusCode: number;
    message: string;
    data: T;
    meta: PaginationMeta | null;
  };
}

export interface PaginationMeta {
  page: number;
  totalPage: number;
  totalCount: number;
  limit: number;
}
