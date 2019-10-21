export function toPx(value) {
  return value + "px";
}

export function bounds(element) {
  return element.getBoundingClientRect();
}

export function setTranslate(x, y, z) {
  return "translate3d(" + x + ", " + y + ", " + z + ")";
}

export function createOverlay() {
  var overlay = document.createElement("div");
  Object.assign(overlay.style, {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "fixed",
    "pointer-events": "none"
  });

  return overlay;
}
