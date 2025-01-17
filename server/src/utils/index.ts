export function updateFormatOfEventDate(eventData: string): string {
  const splitDate = eventData.split(" ");
  const datePart = splitDate.slice(-1)[0];

  // Получаем текущий год и месяц
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // Месяцы начинаются с 0, поэтому добавляем 1

  // Регулярное выражение для формата DD/MM/YYYY
  const slashDateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

  // Регулярное выражение для формата DD.MM (без года)
  const dotDateRegexWithoutYear = /^\d{2}\.\d{2}$/;

  // Регулярное выражение для формата DD.MM.YYYY
  const dotDateRegex = /^\d{2}\.\d{2}\.\d{4}$/;

  // Преобразование для формата DD/MM/YYYY
  if (slashDateRegex.test(datePart)) {
    const [day, month, year] = datePart.split("/");
    return `${year}-${month}-${day}`; // Преобразуем в формат YYYY-MM-DD
  } 
  // Преобразование для формата DD.MM.YYYY
  else if (dotDateRegex.test(datePart)) {
    const [day, month, year] = datePart.split(".");
    return `${year}-${month}-${day}`; // Преобразуем в формат YYYY-MM-DD
  } 
  // Преобразование для формата DD.MM (без года)
  else if (dotDateRegexWithoutYear.test(datePart)) {
    const [day, month] = datePart.split(".");
    const eventMonth = parseInt(month, 10); // Преобразуем месяц в число для сравнения

    // Определяем, какой год использовать: текущий или следующий
    const yearToUse = eventMonth < currentMonth ? currentYear + 1 : currentYear;

    return `${yearToUse}-${month}-${day}`; // Возвращаем в формате YYYY-MM-DD
  } else {
    return "";
  }
}


export const filterByEventPage = (items: any[], event_page: string) => {
  return items.filter(item => {
    const isMatch = item.inputParameters.originUrl === event_page;
    return isMatch;
  });
};