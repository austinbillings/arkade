export function styleDate (date, format = 'compact', locale = undefined) {
  const option = s => format.split('-').map(t => t.toLowerCase()).includes(s);

  const options = {
    // Formatting =======================================================================
    compact: option('compact'),
    // compact: use numbers & slashes (e.g., 3/21/19) instead of words & spaces
    precise: option('precise'),
    // precise-compact: use leading-zeros and full year numbers (e.g., 03/08/1995) instead of shorter values (e.g. 2/1/99)
    full: option('full'),
    // full: spell out day- and month-names (e.g., Friday and August) over short versions (e.g., Fri and Aug)

    // Include / exclude =======================================================================
    weekdays: option('weekdays'),
    // weekdays: include day-of-week (e.g., Wed Mar 21 2020)
    years: option('years'),
    // years: include year (e.g., May 23 2020) instead of not (e.g., May 23)
    commas: option('commas')
    // includes commas (e.g., Saturday, June 20, 2020)
  };

  const weekdayOptions = options.weekdays ? { weekday: options.full ? 'long' : 'short' } : {};
  const yearOptions = !options.years ? {} : { year: options.compact && !options.precise ? '2-digit' : 'numeric' };
  const monthOptions = { month: options.full ? 'long' : options.compact ? options.precise ? '2-digit' : 'numeric' : 'short' };
  const dayOptions = { day: options.precise ? '2-digit' : 'numeric' };

  const localeOptions = { ...weekdayOptions, ...yearOptions, ...monthOptions, ...dayOptions };
  const formattedDate = (new Date(date)).toLocaleDateString(locale, localeOptions);

  return options.commas ? formattedDate : formattedDate.split(',').join('');
}
