"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteUser } from "@/server/server-actions";
import { IconLoader2, IconTrash, IconTrashFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function PortfolioDangerZone() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [opened, setOpened] = useState(false);

  const onAction = () => {
    startTransition(async () => {
      await deleteUser();
      router.push("/");
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Danger Zone</CardTitle>
        <CardDescription>Here be dragons</CardDescription>
      </CardHeader>
      <CardFooter>
        <AlertDialog open={opened} onOpenChange={setOpened}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <IconTrashFilled className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete your account?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. All of your data will be deleted
                immediately
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
              <Button
                variant="destructive"
                disabled={pending}
                onClick={onAction}
              >
                {pending ? (
                  <IconLoader2 className="animate-spin w-4 h-4 mr-2" />
                ) : (
                  <IconTrash className="w-4 h-4 mr-2" />
                )}
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
