import pkg from "./package.json";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

export default [
  {
    input: "index.umd.js",
    output: {
      format: "umd",
      file: pkg.browser,
      name: "SharedElement"
    },
    plugins: [resolve(), commonjs()]
  },
  {
    input: "index.js",
    output: { name: "shared-element", file: pkg.module, format: "es" }
  }
];
