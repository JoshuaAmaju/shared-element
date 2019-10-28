export function toPx(value) {
  return value + "px";
}

export function center(settings) {
  var element = settings.element;
  var vertical = settings.vertical;
  var winWidth = window.innerWidth;
  var winHeight = window.innerHeight;
  var horizontal = settings.horizontal;
  var rect = bounds(element);

  if (horizontal) {
    element.style.left = (winWidth - rect.width) / 2 + "px";
  }

  if (vertical) {
    element.style.top = (winHeight - rect.height) / 2 + "px";
  }
}

export function removeProp(element, prop) {
  element.style.removeProperty(prop);
}

export function fadeIn(element) {
  Object.assign(element.style, {
    opacity: 1,
    visibility: "visible"
  });
}

export function fadeOut(element) {
  Object.assign(element.style, {
    opacity: 0,
    visibility: "hidden"
  });
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
