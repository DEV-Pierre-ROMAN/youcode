"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { CourseFormSchema } from "./course.schema";
import { courseActionCreate, courseActionEdit } from "./course.action";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type CourseFormProps = {
  defaultValues?: CourseFormSchema & { id: string };
};

export const CourseForm = (props: CourseFormProps) => {
  const form = useZodForm({
    schema: CourseFormSchema,
    defaultValues: props.defaultValues,
  });
  const router = useRouter();
  return (
    <Form
      form={form}
      onSubmit={async (values) => {
        if (props.defaultValues?.id) {
          // update course
          const result = await courseActionEdit({
            courseId: props.defaultValues.id,
            data: values,
          });

          if (!result) {
            toast.error("Something went wrong");
          }

          if (result && result.data) {
            toast.success(result.data.message);

            router.push(`/admin/courses/${props.defaultValues.id}`);
            router.refresh();
          }

          if (result && result.serverError) {
            toast.error(result.serverError.serverError);
          }

          return;
        } else {
          // create course
          const result = await courseActionCreate({
            ...values,
          });

          if (!result) {
            toast.error("Something went wrong");
          }

          if (result && result.data) {
            toast.success(result.data.message);

            router.push(`/admin/courses/${result.data.course.id}`);
            router.refresh();
          }
        }
      }}
    >
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input
                placeholder="url of the image"
                {...field}
                value={field.value == null ? "" : field.value}
              />
            </FormControl>
            <FormDescription>
              This is the url of the image of the course
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="presentation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Textarea placeholder="# Title" {...field} />
            </FormControl>
            <FormDescription>This field support markdown</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Save</Button>
    </Form>
  );
};
