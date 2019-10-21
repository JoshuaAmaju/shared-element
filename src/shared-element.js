import {
  toPx,
  lerp,
  invlerp,
  bounds,
  createOverlay,
  setTranslate
} from "./utils";

function SharedElement({ to, from }) {
  var anim;
  var clone;
  var points;
  var css = {};
  var _to = to;
  var delay = 0;
  var _settings;
  var _from = from;
  var duration = 300;
  var animation = {};
  var hasPlayed = false;
  var withOverlay = false;
  var parent = _to.parentNode;
  var easing = "cubic-bezier(0.65, 0.05, 0.36, 1)";

  return {
    css: function(_css) {
      css = _css;
      return this;
    },
    points: function(_points) {
      points = _points;
      return this;
    },
    init: function(settings) {
      _settings = settings || {};

      var pointsTo = points && points.to;
      var pointsFrom = points && points.from;

      var rectTo = pointsTo || bounds(_to);
      var rectFrom = pointsFrom || bounds(_from);

      var _delay = _settings.delay;
      var _easing = _settings.easing;
      var _duration = _settings.duration;
      var _withOverlay = _settings.withOverlay;

      if (_delay) delay = _delay;
      if (_easing) easing = _easing;
      if (_duration) duration = _duration;
      if (_withOverlay) withOverlay = _withOverlay;

      animation.to = {
        top: 0,
        left: 0,
        margin: 0,
        position: "fixed",
        width: toPx(rectTo.width),
        height: toPx(rectTo.height),
        backfaceVisibility: "hidden",
        transform: setTranslate(toPx(rectTo.left), toPx(rectTo.top), 0)
      };

      animation.from = {
        top: 0,
        left: 0,
        margin: 0,
        position: "fixed",
        width: toPx(rectFrom.width),
        backfaceVisibility: "hidden",
        height: toPx(rectFrom.height),
        transform: setTranslate(toPx(rectFrom.left), toPx(rectFrom.top), 0)
      };

      if (!hasPlayed) {
        let cssProps = {};

        for (const key in css) {
          let toProp = css[key][1];
          let fromProp = css[key][0];

          if (!toProp && !fromProp) continue;
          if (!toProp || !fromProp) {
            throw new Error("Partial keyframes are not allowed.");
          }

          cssProps.to = Object.assign({}, cssProps.to, { [key]: toProp });
          cssProps.from = Object.assign({}, cssProps.from, { [key]: fromProp });
        }

        css = Object.assign({}, cssProps);
      }

      var toCss = css && css.to;
      var fromCss = css && css.from;

      if (toCss) animation.to = Object.assign({}, animation.to, toCss);
      if (fromCss) animation.from = Object.assign({}, animation.from, fromCss);

      if (withOverlay) {
        var overlay = createOverlay();
        parent = overlay;
        document.body.appendChild(overlay);
      }

      clone = _to.cloneNode(true);
      Object.assign(clone.style, animation.from);
      parent.appendChild(clone);

      anim = clone.animate([animation.from, animation.to], {
        fill: "both",
        delay: delay,
        easing: easing,
        duration: duration
      });

      anim.pause();
      this.fadeIn(clone);

      return this;
    },
    play: function(callback) {
      anim.play();
      anim.onfinish = function() {
        clone.remove();
        hasPlayed = true;
        if (withOverlay) parent.remove();
        if (callback && typeof callback === "function") callback();
      };

      return this;
    },
    reverse: function(callback, direction) {
      let toCss = css && css.to;
      let fromCss = css && css.from;

      if (toCss) css.from = toCss;
      if (fromCss) css.to = fromCss;

      switch (direction) {
        case "backward":
          // swap bounding rect of from and to with each other
          points = {
            to: bounds(_from),
            from: bounds(_to)
          };
          break;
        case "forward":
        default:
          // swap from and to with each other.
          [_to, _from] = [_from, _to];
          break;
      }

      parent = _to.parentNode;
      this.init(_settings).play(callback);
    },
    removeProp: function(element, prop) {
      element.style.removeProperty(prop);
    },
    fadeIn: function(element) {
      Object.assign(element.style, {
        opacity: 1,
        visibility: "visible"
      });
    },

    fadeOut: function(element) {
      Object.assign(element.style, {
        opacity: 0,
        visibility: "hidden"
      });
    }
  };
}

SharedElement.center = function(settings) {
  var winWidth = win.innerWidth;
  var element = settings.element;
  var winHeight = win.innerHeight;
  var vertical = settings.vertical;
  var horizontal = settings.horizontal;
  var rect = bounds(element);

  if (horizontal) {
    element.style.left = (winWidth - rect.width) / 2 + "px";
  }

  if (vertical) {
    element.style.top = (winHeight - rect.height) / 2 + "px";
  }
};

export default SharedElement;
