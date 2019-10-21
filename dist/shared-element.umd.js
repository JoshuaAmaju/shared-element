(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.SharedElement = {}));
}(this, function (exports) { 'use strict';

  function toPx(value) {
    return value + "px";
  }

  function bounds(element) {
    return element.getBoundingClientRect();
  }

  function SharedElement({ to, from }) {
    var _to = to;
    var delay = 0;
    var _from = from;
    var duration = 300;
    var animation = {};
    var anim = undefined;
    var clone = undefined;
    var events = undefined;

    var points = undefined;

    var withOverlay = false;
    var parent = _to.parentNode;
    var easing = "cubic-bezier(0.65, 0.05, 0.36, 1)";

    return {
      on: function(_events) {
        events = _events;
        return this;
      },
      points: function(_points) {
        points = _points;
        return this;
      },
      init: function(settings) {
        settings = settings || {};

        var pointsTo = points && points.to;
        var pointsFrom = points && points.from;

        var rectTo = pointsTo || bounds(_to);
        var rectFrom = pointsFrom || bounds(_from);

        var styleTo = getComputedStyle(_to);
        var styleFrom = getComputedStyle(_from);

        var zIndexTo = styleTo.zIndex === "auto" ? 1 : styleTo.zIndex;
        var zIndexFrom = styleFrom.zIndex === "auto" ? 1 : styleFrom.zIndex;

        var _delay = settings.delay;
        var css = settings.css || {};
        var _easing = settings.easing;
        var _duration = settings.duration;
        var _withOverlay = settings.withOverlay;

        if (_delay) delay = _delay;
        if (_easing) easing = _easing;
        if (_duration) duration = _duration;
        if (_withOverlay) withOverlay = _withOverlay;

        animation.to = {
          top: 0,
          left: 0,
          ...css.to,
          margin: 0,
          position: "fixed",
          "z-index": zIndexTo,
          width: toPx(rectTo.width),
          height: toPx(rectTo.height),
          "backface-visibility": "hidden",
          transform: `translate3d(${toPx(rectTo.left)}, ${toPx(rectTo.top)}, 0)`
        };

        animation.from = {
          top: 0,
          left: 0,
          margin: 0,
          ...css.from,
          position: "fixed",
          "z-index": zIndexFrom,
          width: toPx(rectFrom.width),
          height: toPx(rectFrom.height),
          "backface-visibility": "hidden",
          transform: `translate3d(${toPx(rectFrom.left)}, ${toPx(
          rectFrom.top
        )}, 0)`
        };

        if (withOverlay) {
          var overlay = document.createElement("div");
          Object.assign(overlay.style, {
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            position: "fixed",
            "pointer-events": "none"
          });

          parent = overlay;
          document.body.appendChild(overlay);
        }

        clone = _to.cloneNode(true);
        Object.assign(clone.style, animation.from);
        parent.appendChild(clone);

        anim = clone.animate([animation.from, animation.to], {
          delay: delay,
          easing: easing,
          duration: duration
        });

        anim.pause();

        return this;
      },
      play: function() {
        var afterPlay = events["afterplay"];
        var beforePlay = events["beforeplay"];

        if (beforePlay && typeof beforePlay === "function") {
          beforePlay.call(null, clone);
        }

        this.fadeIn(clone);
        anim.play();

        var playEnd = function() {
          clone.remove();
          if (withOverlay) parent.remove();
          if (afterPlay && typeof afterPlay === "function") {
            afterPlay.call(null, clone);
          }
        };

        anim.onfinish = playEnd;
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

  exports.SharedElement = SharedElement;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
