import cmsApi, { getCmsContentType, getCmsRenderOptions } from "@/lib/cms-api";
import { useTranslation } from "@/lib/i18n/server";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const getBody = async (t, slug) => {
  try {
    const res = await cmsApi.getEntries({
      content_type: await getCmsContentType("basicPage"),
      locale: t("blog.locale"),
      "fields.slug": slug,
    });

    if (res.items.length === 0) {
      return "";
    }

    return documentToReactComponents(
      res.items[0].fields.body,
      getCmsRenderOptions()
    );
  } catch (err) {
    console.error(err);
    return "";
  }
};

export default async function BasicPage({ slug }) {
  const { t } = await useTranslation();
  const body = getBody(t, slug);

  return <>{body}</>;
}
