import { BLOCKS } from "@contentful/rich-text-types";
import { createClient } from "contentful";

const cmsConfig = {
  environment: {
    production: "master",
    staging: "staging",
  },
  contentType: {
    blog: {
      hk: "hongKong",
      au: "australia",
    },
    solutionServices: {
      hk: "solutionServices",
      au: "solutionServicesAustralia",
    },
    basicPage: {
      hk: "basicPageHK",
    },
  },
};

export const getCmsContentType = async (name) => {
  return cmsConfig.contentType?.[name]?.[process.env.NEXT_PUBLIC_REGION];
};

export const getCmsEnvironment = () =>
  cmsConfig.environment?.[process.env.APP_ENV];

export const getCmsRenderOptions = () => {
  return {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (
        node // render image
      ) => (
        <img
          src={"https:" + node.data?.target?.fields?.file?.url}
          alt={"https:" + node.data?.target?.fields?.title}
        />
      ),
    },
  };
};

const cmsApi = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: getCmsEnvironment(),
});

export default cmsApi;
