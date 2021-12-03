import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

const plugins = [
  svelte({
    preprocess: sveltePreprocess({ sourceMap: !production }),
    compilerOptions: {
      dev: !production,
    },
  }),
  resolve({
    browser: true,
    dedupe: ["svelte"],
  }),
  commonjs(),
  typescript({
    sourceMap: !production,
    inlineSources: !production,
  }),
  !production && serve(),
  !production && livereload("public"),
  production && terser(),
];

export default [
  {
    input: "src/events.ts",
    output: {
      sourcemap: true,
      format: "iife",
      name: "events",
      file: "public/build/events.js",
    },
    plugins: [css({ output: "events.css" }), ...plugins],
    watch: {
      clearScreen: false,
    },
  },
  {
    input: "src/jobOpenings.ts",
    output: {
      sourcemap: true,
      format: "iife",
      name: "jobOpenings",
      file: "public/build/jobOpenings.js",
    },
    plugins: [css({ output: "jobOpenings.css" }), ...plugins],
    watch: {
      clearScreen: false,
    },
  },
  {
    input: "src/pressReleases.ts",
    output: {
      sourcemap: true,
      format: "iife",
      name: "pressReleases",
      file: "public/build/pressReleases.js",
    },
    plugins: [css({ output: "pressReleases.css" }), ...plugins],
    watch: {
      clearScreen: false,
    },
  },
  {
    input: "src/resources.ts",
    output: {
      sourcemap: true,
      format: "iife",
      name: "resources",
      file: "public/build/resources.js",
    },
    plugins: [css({ output: "resources.css" }), ...plugins],
    watch: {
      clearScreen: false,
    },
  },
];
