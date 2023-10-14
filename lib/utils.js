import resolveConfig from "tailwindcss/resolveConfig";

import twConfig from "../tailwind.config";

export const tailwindConfig = resolveConfig(twConfig);
