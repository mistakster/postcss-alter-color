function replaceLastItem(arr, item) {
  return [arr[0], arr[1], arr[2], item];
}

module.exports = function setAlphaChannel(color, alpha) {
  return Object.assign({}, color, {
    rgba: replaceLastItem(color.rgba, alpha),
    hsla: replaceLastItem(color.hsla, alpha)
  });
};
