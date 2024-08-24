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
import { TModule } from "@/lib/database/schema";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { PermissionSchema } from "@/types/permission";
import { createPermission, editPermission, getPermissionById } from "@/actions/permission.action";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PermissionForm({
  open,
  setOpen,
  formType,
  resetId,
  idToAction,
  myModules
}: {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (val: boolean) => void;
  formType: "Edit" | "Add";
  resetId?: () => void;
  idToAction?: string;
  myModules: GlobalReturnDatas<TModule[] | null>
}) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof PermissionSchema>>({
    resolver: zodResolver(PermissionSchema),
    defaultValues: {
      name: "",
      moduleId: ""
    },
  });

  async function onSubmit(values: z.infer<typeof PermissionSchema>) {
    let res;

    if (formType === "Add") {
      res = await createPermission(values);
    } else {
      res = await editPermission({ id: idToAction as string, name: values.name, moduleId: values.moduleId });
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
      form.reset()
      if (resetId) {
        resetId();
      }
    }
  }

  useEffect(() => {
    const getPermissionByIdFunc = async () => {
      setLoading(true);
      const permission = await getPermissionById(idToAction!);
      form.setValue("name", permission.data?.name as string);
      form.setValue('moduleId', permission.data?.moduleId as string)
      setLoading(false);
    };

    if (idToAction) {
      getPermissionByIdFunc();
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
          form.clearErrors("moduleId");
          form.setValue("moduleId", "");
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
              <DialogTitle>{formType} Permission</DialogTitle>
            </DialogHeader>

            {loading ? (
              <div className="flex justify-center items-center">
                <Spinner className="h-8 w-8 mt-6 mb-0" />
              </div>
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormControl>
                        <Input placeholder="Insert Permission Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="moduleId"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a module" />
                          </SelectTrigger>
                          <SelectContent>
                            {myModules.data?.map((m) => (
                              <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
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
