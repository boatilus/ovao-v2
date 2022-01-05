/**
 * Shortens a string based on either the max length, or by a provided separator.
 *
 * @param {string} str - The string to shorten.
 * @param {number} max_len - The maximum length of the string.
 * @param {separator} separator - An option separator (defaults to a space).
 * @returns
 */
export const shorten = (str: string, max_len: number, separator = ' ') => {
  if (str.length <= max_len) {
    return str
  }

  return str.substr(0, str.lastIndexOf(separator, max_len))
}
