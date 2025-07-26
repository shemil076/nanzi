export const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
  }).format(value);

export const formatDateForLocal = (date: Date) => {
  return date.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });
};

export const formatToShortDate = (time: Date): string => {
  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, '0');
  const day = String(time.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
