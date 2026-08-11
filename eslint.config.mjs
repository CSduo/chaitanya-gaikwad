import coreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/** eslint-config-next 16 ships native flat config, so no compat layer is needed. */
const eslintConfig = [
  ...(Array.isArray(coreWebVitals) ? coreWebVitals : [coreWebVitals]),
  ...(Array.isArray(nextTypescript) ? nextTypescript : [nextTypescript]),
  {
    ignores: [".next/**", "node_modules/**", "audit/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
