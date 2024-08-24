"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Spinner from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ModuleSchema } from "@/types/module";
import { createModule, editModule, getModuleById } from "@/actions/module.action";

export default function ModuleForm({
  open,
  setOpen,
  formType,
  resetId,
  idToAction,
}: {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (val: boolean) => void;
  formType: "Edit" | "Add";
  resetId?: () => void;
  idToAction?: string;
}) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof ModuleSchema>>({
    resolver: zodResolver(ModuleSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ModuleSchema>) {
    let res;

    if (formType === "Add") {
      res = await createModule(values);
    } else {
      res = await editModule({ id: idToAction as string, name: values.name });
    }

    if (!res.success) {
      toast({
        variant: "destructive",
        description: res.message,
      });
    } else if (res.success) {
      toast({
        variant: "default",
        description: res.message,
      });

      setOpen(false);
      if (resetId) {
        resetId();
      }
    }
  }

  useEffect(() => {
    const getModuleByIdFunc = async () => {
      setLoading(true);
      const myModule = await getModuleById(idToAction!);
      form.setValue("name", myModule.data?.name as string);
      setLoading(false);
    };

    if (idToAction) {
      getModuleByIdFunc();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToAction]);

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        setOpen(state);
        if (!state) {
          form.clearErrors("name");
          form.setValue("name", "");
          if (resetId) {
            resetId();
          }
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{formType} Module</DialogTitle>
            </DialogHeader>

            {loading ? (
              <div className="flex justify-center items-center">
                <Spinner className="h-8 w-8 mt-6 mb-0" />
              </div>
            ) : (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormControl>
                      <Input placeholder="Insert Module Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter className="sm:justify-end mt-4">
              <Button
                type="submit"
                variant="secondary"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Working..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
