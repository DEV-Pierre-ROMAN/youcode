import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXRemoteProps } from "next-mdx-remote";
import { Typography } from "@/components/ui/Typography";

const basicComponents = {
  h1: (props) => (
    <Typography {...props} variant="h1">
      {props.children}
    </Typography>
  ),
  h2: (props) => (
    <Typography {...props} variant="h2">
      {props.children}
    </Typography>
  ),
  h3: (props) => (
    <Typography {...props} variant="h3">
      {props.children}
    </Typography>
  ),
  p: (props) => (
    <Typography {...props} variant="p">
      {props.children}
    </Typography>
  ),
};

export default async function MDXRender({
  source,
  components,
}: {
  source: string;
  components: MDXRemoteProps["components"];
}) {
  return (
    <div className="wrapper">
      <MDXRemote
        source={source}
        components={{ basicComponents, ...(components || {}) }}
      />
    </div>
  );
}
