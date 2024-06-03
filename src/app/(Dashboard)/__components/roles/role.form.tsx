"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
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
import { RoleSchema } from "@/types/role";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createRole } from "@/actions/role.action";

export default function RoleForm({
  open,
  setOpen,
  formType,
  resetId,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  formType: string;
  resetId?: () => void;
}) {
  const form = useForm<z.infer<typeof RoleSchema>>({
    resolver: zodResolver(RoleSchema),
  });

  async function onSubmit(values: z.infer<typeof RoleSchema>) {
    const res = await createRole(values);
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
              <DialogTitle>{formType} Role</DialogTitle>
            </DialogHeader>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormControl>
                    <Input placeholder="Insert Role Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
