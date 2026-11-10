import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Page copy uses plain apostrophes and quotes in JSX text.
      "react/no-unescaped-entities": "off",
      // Two existing effects (Navbar, ThemeToggle) set state on mount or route change.
      // Kept as a warning until they are rewritten.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
