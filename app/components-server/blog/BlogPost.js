import Image from "next/image";
import React from "react";

import { Container } from "app/components/layout/Container";

import cmsApi, { getCmsContentType } from "../../../lib/cms-api";
import { useTranslation } from "../../../lib/i18n/server";

// disable static cache
export const revalidate = 0;

const getBlogPost = async (slug, t) => {
  try {
    const posts = await cmsApi.getEntries({
      include: 1,
      locale: `${t("blog.locale")}`,
      content_type: await getCmsContentType("blog"),
      "fields.slug": slug,
      limit: 1,
    });
    return posts.items[0];
  } catch (err) {
    console.error(err);
  }
};

export default async function BlogPost({ params }) {
  const { t } = await useTranslation();
  const post = await getBlogPost(params.slug, t);

  return (
    <Container className="flex-col justify-start space-y-5 text-lg text-black">
      <div className="text-left text-5xl font-semibold">
        {post?.fields?.title}
        <br />
      </div>

      <div className="text-2xl text-[#808080]">
        {post?.fields?.date.split("T")[0]}
      </div>
      <div>{post?.fields?.richText.content[0].content[0].value}</div>
      {post && (
        <Image
          src={`https:${post?.fields?.photo[0]?.fields.file.url}`}
          alt=""
          width={1551}
          height={500}
          className="m-9 mx-auto w-full rounded-xl"
        />
      )}
    </Container>
  );
}
