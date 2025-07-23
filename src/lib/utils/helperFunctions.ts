export const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
  }).format(value);
