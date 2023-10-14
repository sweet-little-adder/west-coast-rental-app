module.exports = {
  input: ["./app/**/**/*.{js,jsx}", "./app/**/*.{js,jsx}"], // Define the input source files to scan
  output: "./lib/i18n", // Define the output directory for the translation files
  options: {
    debug: true, // Enable debug logs
    func: {
      list: ["t"], // List of translation function names to look for (e.g., 't' for i18next)
      extensions: [".js", ".jsx"], // File extensions to consider
    },
    lngs: ["en", "zh"], // List of supported languages
    defaultLng: "en", // Default language
    ns: ["translation"], // Namespaces for translations
    defaultNs: "translation", // Default namespace
    defaultValue: "", // Default value for missing translations
    resource: {
      // Define the resource file format and naming conventions
      loadPath: "{{lng}}/{{ns}}.json",
      savePath: "{{lng}}/{{ns}}.json",
      jsonIndent: 2,
      lineEnding: "\n",
    },
    nsSeparator: false, // Namespace separator (e.g., 'common:header' instead of 'common.header')
    keySeparator: false, // Key separator (e.g., 'common.header.title' instead of 'common.header:title')
    interpolation: {
      prefix: "{{",
      suffix: "}}",
    },
  },
};
