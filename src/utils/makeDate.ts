export default function makeDate(date: string | undefined): Date {
  if (!date) return new Date();

  const parts = date.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Months in JavaScript are zero-indexed, so we subtract 1
  const year = parseInt(parts[2], 10);

  const myDate = new Date(year, month, day);
  return myDate;
}
