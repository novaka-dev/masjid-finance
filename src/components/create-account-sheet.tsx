"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { DrawerClose } from "./ui/drawer";
import { Button } from "./ui/button";

import { accountSchema, AccountFormValues } from "@/app/lib/schema";
import useFetch from "@/hooks/use-fetch";
import { createAccount } from "@/actions/dashboard";

const CreateAccountSheet = ({ children }: { children: React.ReactNode }) => {
  // * State untuk mengontrol modal terbuka atau tertutup
  const [open, setOpen] = useState(false);

  // * React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      isDefault: false,
    },
  });

  // * Hook untuk fetch API
  const {
    data: newAccount,
    loading: createAccountLoading,
    error,
    fn: createAccountFunction,
  } = useFetch(createAccount);

  // * Efek untuk menangani sukses pembuatan akun
  useEffect(() => {
    if (newAccount && !createAccountLoading) {
      toast.success("Account created successfully");
      reset();
      setOpen(false);
    }
  }, [newAccount, createAccountLoading, reset]);

  // * Efek untuk menangani error
  useEffect(() => {
    if (typeof error === "object" && error !== null && "message" in error) {
      toast.error((error as Error).message);
    } else if (error) {
      toast.error("Failed to create account");
    }
  }, [error]);

  // * Fungsi submit form
  const onSubmit = async (data: AccountFormValues) => {
    await createAccountFunction(data);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Account</SheetTitle>
        </SheetHeader>

        <div className="pb-4 pt-4">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Input Account Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Account Name
              </label>
              <Input id="name" placeholder="..." {...register("name")} />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Select Account Type */}
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">
                Account Type
              </label>
              <Select
                onValueChange={(value: "CURRENT" | "SAVINGS") =>
                  setValue("type", value)
                }
                defaultValue={watch("type")}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CURRENT">CURRENT</SelectItem>
                  <SelectItem value="SAVINGS">SAVINGS</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-red-500">{errors.type.message}</p>
              )}
            </div>

            {/* Input Initial Balance */}
            {/* <div className="space-y-2">
              <label htmlFor="balance" className="text-sm font-medium">
                Initial Balance
              </label>
              <Input
                id="balance"
                type="number"
                step={0.01}
                placeholder="0.00"
                {...register("balance")}
              />
              {errors.balance && (
                <p className="text-red-500">{errors.balance.message}</p>
              )}
            </div> */}

            {/* Switch Set as Default */}
            <div className="space-y-2 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <label
                htmlFor="isDefault"
                className="text-sm font-medium cursor-pointer"
              >
                Set as default

              </label>

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Jadikan akun ini sebagai akun utama
                </p>
                <Switch
                  id="isDefault"
                  onCheckedChange={(checked) => setValue("isDefault", checked)}
                  checked={watch("isDefault")}
                />
              </div>
            </div>

            {/* Tombol Close dan Submit */}
            <div className="flex gap-4 pt-4">
              <DrawerClose asChild>
                <Button type="button" variant="outline" className="flex-1">
                  Close
                </Button>
              </DrawerClose>
              <Button
                type="submit"
                className="flex-1"
                disabled={createAccountLoading}
              >
                {createAccountLoading ? (
                  <>
                    <Loader2 className="mr-2 animate-spin h-4 w-4" />
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateAccountSheet;
