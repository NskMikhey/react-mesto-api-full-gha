// eslint-disable-next-line no-useless-escape
const urlRegexpPattern = /^((?:https?\:)?(?:\/{2})?)?((?:[\w\d-_]{1,64})\.(?:[\w\d-_\.]{2,64}))(\:\d{2,6})?((?:\/|\?|#|&){1}(?:[\w\d\S]+)?)?$/;

module.exports = {
  urlRegexpPattern,
};
