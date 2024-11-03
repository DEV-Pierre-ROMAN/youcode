"use client";
import { useDebounceFn } from "@/hooks/useDebounceFn";
import { lessonContentActionEdit } from "../../form/lesson.action";
import InitializedMDXEditor from "./InitializedMDXEditor";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge, BadgeProps } from "@/components/ui/badge";

export type MdxEditorProps = {
  lessonId: string;
  markdown: string;
};

export const MdxEditor = (props: MdxEditorProps) => {
  type SyncStateType = "sync" | "not-sync" | "syncing";

  const [syncState, setSyncState] = useState<SyncStateType>("sync");

  const getBadgeVariant = (syncState: SyncStateType): BadgeProps["variant"] => {
    switch (syncState) {
      case "sync":
        return "secondary";
      case "syncing":
        return "default";
      case "not-sync":
        return "destructive";
    }
  };

  const onChange = useDebounceFn(async (value: string) => {
    const res = await lessonContentActionEdit({
      lessonId: props.lessonId,
      content: value,
    });

    if (res?.serverError) {
      toast.error(res.serverError.serverError);
      setSyncState("not-sync");
      return;
    }

    setSyncState("sync");
  });

  useEffect(() => {
    if (syncState === "sync") return;

    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue =
        "Are you sure you want to leave ? All unsaved changes will be lost.";
    };

    window.addEventListener("beforeunload", beforeUnloadHandler);
  }, [syncState]);

  return (
    <div className="relative">
      <div className="absolute bottom-2 right-2">
        <Badge variant={getBadgeVariant(syncState)}>{syncState}</Badge>
      </div>
      <InitializedMDXEditor
        editorRef={null}
        onChange={(value: string) => {
          setSyncState("not-sync");
          onChange(value);
        }}
        markdown={props.markdown}
      />
    </div>
  );
};
