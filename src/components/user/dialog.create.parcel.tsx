import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm, type FieldValues } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { createParcelFormSchema } from "@/zod";
import { useCreateParcelMutation } from "@/redux/api/parcel.api/parcelApi";
import { toast } from "sonner";
import { useState } from "react";

export function DialogCreateParcel() {
  const form = useForm({
    defaultValues: {
      firstName: "",
      phoneNumber: "",
      email: "",
      street: "",
      city: "",
      zipCode: "",
      description: "",
      weightKg: 0,
      isFragile: false,
    },
    resolver: zodResolver(createParcelFormSchema),
  });

  const [createParcel, { isLoading }] = useCreateParcelMutation();

  const [open, setOpen] = useState(false);

  const submitHandler = async (data: FieldValues) => {
    const loadingToastId = toast.loading("Creating parcel...");
    const parcelData = {
      receiver: {
        firstName: data.firstName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        address: {
          street: data.street,
          city: data.city,
          zipCode: data.zipCode,
          country: "Bangladesh",
        },
      },
      packageDetails: {
        weightKg: data.weightKg,
        description: data.description,
        fragile: data.isFragile,
      },
    };

    try {
      const res = await createParcel(parcelData).unwrap();
      console.log(res);
      if (res.success) {
        toast.success("Parcel created successfully", { id: loadingToastId });
        setOpen(false);
        form.reset();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create parcel", { id: loadingToastId });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Parcel</Button>
      </DialogTrigger>

      <DialogContent className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <DialogHeader>
              <DialogTitle>Create Parcel</DialogTitle>
              <DialogDescription>
                Enter parcel details here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-5 mt-5">
              <div className="*:not-first:mt-2">
                <legend className="text-foreground text-sm font-medium">
                  Receiver Details
                </legend>
                <div className="rounded-md shadow-xs">
                  <div className="relative focus-within:z-10">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="First Name"
                              className="peer rounded-b-none pe-9 shadow-none [direction:inherit]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50"></div>
                  </div>
                  <div className="-mt-px flex">
                    <div className="min-w-0 flex-1 focus-within:z-10">
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Phone Number"
                                className="rounded-e-none rounded-t-none shadow-none [direction:inherit]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="-ms-px min-w-0 flex-1 focus-within:z-10">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Email"
                                className="rounded-s-none rounded-t-none shadow-none [direction:inherit]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* address */}
              <div className="*:not-first:mt-2">
                <legend className="text-foreground text-sm font-medium">
                  Receiver Address
                </legend>
                <div className="rounded-md shadow-xs">
                  <div className="relative focus-within:z-10">
                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Street"
                              className="peer rounded-b-none pe-9 shadow-none [direction:inherit]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50"></div>
                  </div>
                  <div className="-mt-px flex">
                    <div className="min-w-0 flex-1 focus-within:z-10">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="City"
                                className="rounded-e-none rounded-t-none shadow-none [direction:inherit]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="-ms-px min-w-0 flex-1 focus-within:z-10">
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Zip Code"
                                className="rounded-s-none rounded-t-none shadow-none [direction:inherit]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* package details */}
              <div className="*:not-first:mt-2">
                <legend className="text-foreground text-sm font-medium">
                  Package Details
                </legend>
                <div className="rounded-md shadow-xs">
                  <div className="relative focus-within:z-10">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Description"
                              className="peer rounded-b-none pe-9 shadow-none [direction:inherit]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50"></div>
                  </div>
                  <div className="-mt-px flex">
                    <div className="min-w-0 flex-1 focus-within:z-10">
                      <FormField
                        control={form.control}
                        name="weightKg"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                value={field.value || ""}
                                placeholder="Weight (kg)"
                                className="rounded-t-none shadow-none [direction:inherit]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* check if fragile  */}
              <FormField
                control={form.control}
                name="isFragile"
                render={({ field }) => {
                  return (
                    <div className="flex items-center space-x-3 space-y-0 mb-5">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FormLabel className="">This item is fragile</FormLabel>
                    </div>
                  );
                }}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button disabled={isLoading} type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
