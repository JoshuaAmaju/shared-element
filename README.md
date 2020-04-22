# Shared Element

Create smooth transition between individual DOM elements.
[Demo](https://joshuaamaju.github.io/shared-element/index.html)

## Installation

```html
<script src="https://unpkg.com/shared-element@1.0.0/dist/shared-element.umd.js"></script>
```

### OR

```bash
yarn add shared-element

or

npm install shared-element
```

## Usage

```javascript
let transition = new SharedElement({ from, to });
transition.init(object);
transition.reverse();
```

## Config

### Methods

- play
- reverse
- [css](#css)
- [init](#init)
- [points](#points)

#### Init

---

Properties - type: Object

| Key           | Default        | Type      |
| ------------- | -------------- | --------- |
| `duration`    | 300            | `number`  |
| `easing`      | easeInOutQuint | `string`  |
| `withOverlay` | true           | `boolean` |
| `delay`       | 0              | `number`  |

#### CSS

---

format: {property: [from, to]}

example

```javascript
transition.css({
  borderRadius: ["2em", 0],
  background: ["red", "blue"]
});
```

#### Points

---

example

```javascript
transition.points({
  from: {
    top: 100,
    left: 400
  },
  to: {
    top: 10,
    left: 0
  }
});
```
