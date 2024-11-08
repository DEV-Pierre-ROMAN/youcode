"use client";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import Loader from "@/components/ui/Loader";
import { CoursePlaceHolder } from "../../../courses/[courseId]/CoursePlaceHolder";
import { useRouter } from "next/navigation";

const LoadingModal = () => {
  const router = useRouter();

  return (
    <Dialog
      open={true}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className="max-h-screen max-w-3xl overflow-auto">
        <DialogHeader className="flex flex-row gap-4">
          <Loader /> Loading ...
        </DialogHeader>
        <CoursePlaceHolder />
      </DialogContent>
    </Dialog>
  );
};

export default LoadingModal;
