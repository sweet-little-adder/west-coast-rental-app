import { useTranslation } from "@/lib/i18n/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Container } from "app/components/layout/Container";
import Title from "app/components/Title";

import cmsApi, { getCmsContentType } from "../../lib/cms-api";

// disable static cache
export const revalidate = 0;

const getBlogPosts = async (t) => {
  try {
    const posts = await cmsApi.getEntries({
      content_type: await getCmsContentType("blog"),
      locale: t("blog.locale"),
    });

    return posts.items;
  } catch (err) {
    console.error(err);
    return [];
  }
};
export default async function Blog() {
  const { t } = await useTranslation();
  const posts = await getBlogPosts(t);

  return (
    <Container className="flex-col justify-center">
      {/* <div className="mb-24 text-center text-4xl font-bold text-black opacity-90">
        {t("navbar.corporate_news")}
      </div> */}
      <Title title="corporate_news" />

      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <>
            <div
              key={post.sys.id}
              className="overflow-clip rounded-xl bg-white p-6 drop-shadow-md"
            >
              {" "}
              <div className="relative mb-4 h-[300px] w-full">
                <Image
                  src={`https:${post.fields.photo[0].fields.file.url}`}
                  alt=""
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
              <Link href={`/blog/post/${post.fields.slug}`}>
                <div className="text-xl font-semibold text-black">
                  {post.fields.title}
                </div>
                <div className="mb-4 text-base text-[#808080]">
                  {new Date(post.fields.date).toISOString().split("T")[0]}
                </div>

                <div className="text-sm text-[#9e9e9e]">
                  {post.fields.brief}
                </div>
              </Link>
            </div>
          </>
        ))}
      </div>
    </Container>
  );
}
