"use client";

import { z } from "zod";
import { Plus } from "lucide-react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { RoleSchema } from "@/types/role";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RoleForm() {
  const form = useForm<z.infer<typeof RoleSchema>>({
    resolver: zodResolver(RoleSchema),
  });

  async function onSubmit(values: z.infer<typeof RoleSchema>) {
    console.log("masukkk");
    // const res = await signIn(values);
    // if (!res.success) {
    //   toast({
    //     variant: "destructive",
    //     description: res.message,
    //   });
    // } else if (res.success) {
    //   toast({
    //     variant: "default",
    //     description: res.message,
    //   });

    //   router.push("/dashboard");
    // }
  }

  return (
    <Dialog
      onOpenChange={() => {
        form.clearErrors("roleName");
        form.setValue("roleName", "");
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="h-8 px-2 lg:px-3 ml-2">
          <Plus className="mr-2 h-4 w-4" />
          Add Role
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add Role</DialogTitle>
            </DialogHeader>

            <FormField
              control={form.control}
              name="roleName"
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
