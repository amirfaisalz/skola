import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function DeleteDialog({
  open,
  setOpen,
  title,
  handleDelete,
  loading,
  resetId,
}: {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (val: boolean) => void;
  title: string;
  handleDelete: () => void;
  loading: boolean;
  resetId: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        showXButton={false}
      >
        <DialogHeader>
          <DialogTitle>Delete {title ?? "Data"}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this {title.toLowerCase() ?? "Data"}{" "}
            ? This action can not be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => {
              setOpen(false);
              resetId();
            }}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} disabled={loading}>
            {loading ? "Working..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
