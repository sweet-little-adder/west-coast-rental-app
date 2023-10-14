export const regions = {
  hk: {
    origin: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

export const getRegionBaseUrl = (region) => regions[region]?.origin ?? "";

export const getCurrentRegion = () => {
  return process.env.NEXT_PUBLIC_REGION;
};

export const findRegionByOrigin = (origin) => {
  for (const code in regions) {
    if (regions[code].origin === origin) {
      return code;
    }
  }
};
