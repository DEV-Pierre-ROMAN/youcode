import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXRemoteProps } from "next-mdx-remote";

export default function MDXRender({
  source,
  components,
}: {
  source: string;
  components?: MDXRemoteProps["components"];
}) {
  return (
    <div className="wrapper">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
