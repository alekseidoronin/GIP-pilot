export function formatDate(dateValue: string | null | undefined) {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;
  return date.toLocaleDateString("ru-RU");
}
