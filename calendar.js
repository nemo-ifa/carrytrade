(function (root) {
  function addMonths(date, months) {
    const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
    const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
    target.setDate(Math.min(date.getDate(), lastDay));
    return target;
  }

  function dateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function daysBetween(start, end) {
    return Math.max(0, Math.round((end - start) / 86400000));
  }

  function overlapDays(firstStart, firstEnd, secondStart, secondEnd) {
    const start = new Date(Math.max(firstStart, secondStart));
    const end = new Date(Math.min(firstEnd, secondEnd));
    return daysBetween(start, end);
  }

  const calendar = { addMonths, dateKey, daysBetween, overlapDays };
  root.CarrytradeCalendar = calendar;
  if (typeof module !== 'undefined' && module.exports) module.exports = calendar;
})(globalThis);
