const config = (lng = "en", baseUrl) => ({
  backend: {
    loadPath: `${baseUrl}/api/i18n?lng={{lng}}&ns={{ns}}`,
  },
  fallbackLng: "en",
  lng,
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

export default config;
