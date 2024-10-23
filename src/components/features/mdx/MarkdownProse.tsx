import Markdown from "react-markdown";

type MarkdownProseProps = {
  markdown: string;
};

export const MarkdownProse = (props: MarkdownProseProps) => {
  console.log(props.markdown);
  return (
    <Markdown className="prose dark:prose-invert lg:prose-lg">
      {props.markdown}
    </Markdown>
  );
};
