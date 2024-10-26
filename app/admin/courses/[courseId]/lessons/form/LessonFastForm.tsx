"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { LessonFormSchema } from "./lesson.schema";
import { lessonActionCreate, lessonActionEdit } from "./lesson.action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, RotateCcw } from "lucide-react";

export type LessonFormProps = {
  defaultValues?: LessonFormSchema & { id: string };
  callbackValidate?: (values: LessonFormSchema) => void;
  callbackCancel?: () => void;
  courseId: string;
};

export const LessonFastForm = ({
  defaultValues,
  courseId,
  callbackCancel,
  callbackValidate,
}: LessonFormProps) => {
  const form = useZodForm({
    schema: LessonFormSchema,
    defaultValues: defaultValues,
  });
  return (
    <Form
      className="flex w-full items-center justify-between"
      form={form}
      onSubmit={async (values) => {
        if (defaultValues?.id) {
          // update lesson
          console.log("values", values);
          const result = await lessonActionEdit({
            lessonId: defaultValues.id,
            data: values,
          });

          if (!result) {
            toast.error("Something went wrong");
          }

          if (result && result.data) {
            toast.success(result.data.message);

            if (callbackValidate) callbackValidate(result.data.lesson);
          }

          if (result && result.serverError) {
            toast.error(result.serverError.serverError);
          }

          return;
        } else {
          // create lesson
          const result = await lessonActionCreate({
            courseId: courseId,
            ...values,
          });
          if (!result) {
            toast.error("Something went wrong");
          }
          if (result && result.data) {
            toast.success(result.data.message);
            if (callbackValidate) callbackValidate(result.data.lesson);
          }
        }
      }}
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex items-center gap-6">
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[90px]">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="HIDDEN">Hidden</SelectItem>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                      <SelectItem value="PUBLIC">Public</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button size="sm" type="submit" variant="secondary">
            <Check size={16} />
          </Button>
          {callbackCancel && (
            <Button onClick={callbackCancel} size="sm" variant="ghost">
              <RotateCcw size={16} />
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
};
