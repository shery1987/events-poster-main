
export const FORM_ERRORS_TEXT = {
    UNKNOWN_SERVER_ERROR: "Something went wrong. Please contact us at pickevent87@gmail.com",
  };
  
export const FORM_VALIDATION_PATTERNS = {
  COMMON_NOT_EMPTY_PATTERN: /^\s*[a-zA-Z0-9-]+\s*(?:\s+[a-zA-Z0-9-]+)*\s*$/,
  PASSWORD_PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{8,}$/,
  EMAIL_PATTERN: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE_PATTERN: /^(?:\+972[-\s]?|0)([2-9])[-\s]?\d{3}[-\s]?\d{4}$/,
  ENGINE_VOLUME_PATTERN: /^(?:\d|1\d|20)(\.\d\d?)?$/,
  PRICE_PATTERN: /^\d{1,6}$/,
  URL_PATTERN: /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-.,@?^=%&:/~+#]*)?$/i,
  TIME_PATTERN: /^([01]\d|2[0-3]):([0-5]\d)$/,
};

// Местные номера:
// 02-123-4567
// 03-987-6543
// 04-555-1234
// 050-765-4321
// 052 456 7890
// Международные номера (с кодом +972):
// +972 2 123 4567
// +972-3-987-6543
// +972 50 765 4321
// +972-52-456-7890