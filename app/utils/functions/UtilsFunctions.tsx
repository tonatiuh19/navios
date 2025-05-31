export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  // Convert the date to the local time zone
  const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  return localDate.toLocaleDateString("es-MX", options);
};

export const parsePrice = (price: string | number): string => {
  const num = typeof price === "number" ? price : parseFloat(price);
  if (isNaN(num)) return "$0";
  return num.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
};
