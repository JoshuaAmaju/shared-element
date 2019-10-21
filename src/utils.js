export function toPx(value) {
  return value + "px";
}

export function bounds(element) {
  return element.getBoundingClientRect();
}

export const lerp = (x, y, a) => x * (1 - a) + y * a;
export const invlerp = (a, b, v) => clamp((v - a) / (b - a));
export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

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
