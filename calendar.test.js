const test = require('node:test');
const assert = require('node:assert/strict');
const { addMonths, dateKey, daysBetween, overlapDays } = require('./calendar.js');

test('month-end dates clamp to the last day of a shorter month', () => {
  assert.equal(dateKey(addMonths(new Date(2026, 0, 31), 1)), '2026-02-28');
  assert.equal(dateKey(addMonths(new Date(2024, 0, 31), 1)), '2024-02-29');
  assert.equal(dateKey(addMonths(new Date(2026, 0, 31), 2)), '2026-03-31');
});

test('displayed date matches the local calendar date', () => {
  assert.equal(dateKey(new Date(2026, 9, 21)), '2026-10-21');
});

test('interest day count handles a month-end boundary', () => {
  const start = new Date(2026, 0, 31);
  const end = addMonths(start, 1);
  assert.equal(daysBetween(start, end), 28);
});

test('investment interest stops accruing at maturity', () => {
  const start = new Date(2026, 0, 31);
  const maturity = addMonths(start, 1);
  assert.equal(overlapDays(start, maturity, start, maturity), 28);
  assert.equal(overlapDays(maturity, addMonths(start, 2), start, maturity), 0);
});
