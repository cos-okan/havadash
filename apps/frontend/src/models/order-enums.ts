export const OrderStateCode = {
  PENDING: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2,
  CANCELED: 3,
} as const;

export type OrderStateCode = (typeof OrderStateCode)[keyof typeof OrderStateCode];

export const ORDER_STATES = [
  { code: OrderStateCode.PENDING, name: 'Beklemede' },
  { code: OrderStateCode.IN_PROGRESS, name: 'İşlemde' },
  { code: OrderStateCode.COMPLETED, name: 'Tamamlandı' },
  { code: OrderStateCode.CANCELED, name: 'İptal Edildi' },
];

export function getOrderStateLabel(code: OrderStateCode): string {
  const state = ORDER_STATES.find((s) => s.code === code);
  return state ? state.name : 'Bilinmeyen';
}

export function getOrderStateColor(code: OrderStateCode): string {
  switch (code) {
    case OrderStateCode.PENDING:
      return 'bg-yellow-100 text-yellow-800';
    case OrderStateCode.IN_PROGRESS:
      return 'bg-blue-100 text-blue-800';
    case OrderStateCode.COMPLETED:
      return 'bg-green-100 text-green-800';
    case OrderStateCode.CANCELED:
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
