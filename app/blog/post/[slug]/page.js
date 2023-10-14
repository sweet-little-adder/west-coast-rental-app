import React, { Suspense } from "react";

import Loading from "../../../components/Loading.js";
import BlogPost from "../../../components-server/blog/BlogPost.js";

export default function Post({ params }) {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <BlogPost params={params} />
      </Suspense>
    </div>
  );
}
