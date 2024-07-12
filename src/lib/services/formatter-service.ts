export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate.replace(",", "");
}
