// rollup.config.js
import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: {
    popup: "src/popup/index.tsx",
    background: "src/background/index.ts",
    content: "src/content/index.ts",
  },
  output: {
    dir: "ext",
    format: "es",
  },
  plugins: [typescript(), resolve(), commonjs()],
  watch: {
    clearScreen: true,
  },
};
