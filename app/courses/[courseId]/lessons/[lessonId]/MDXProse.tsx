"use client";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrism from "rehype-prism-plus";

export type MDXProseProps = {
  markdown: string;
};

export const MDXProse = async (props: MDXProseProps) => {
  return (
    <div className="prose dark:prose-invert xl:prose-xl">
      <MDXRemote
        source={props.markdown}
        options={{
          mdxOptions: {
            rehypePlugins: [rehypePrism],
          },
        }}
      />
    </div>
  );
};
