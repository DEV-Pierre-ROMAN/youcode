"use client";
// InitializedMDXEditor.tsx
import type { ForwardedRef } from "react";
import {
  codeBlockPlugin,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  codeMirrorPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  ShowSandpackInfo,
  InsertCodeBlock,
  BlockTypeSelect,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

import styles from "./mdx-editor-theme.module.css";

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      className={styles.theme}
      contentEditableClassName="prose !text-foreground dark:prose-invert"
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: "JavaScript", css: "CSS" },
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: (editor) => editor?.editorType === "codeblock",
                  contents: () => <ChangeCodeMirrorLanguage />,
                },
                {
                  when: (editor) => editor?.editorType === "sandpack",
                  contents: () => <ShowSandpackInfo />,
                },
                {
                  fallback: () => (
                    <>
                      <UndoRedo />
                      <div className="text-black">
                        <BlockTypeSelect />
                      </div>
                      <BoldItalicUnderlineToggles />
                      <InsertCodeBlock />
                    </>
                  ),
                },
              ]}
            />
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
