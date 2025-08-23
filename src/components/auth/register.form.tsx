import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { useForm, type FieldValues } from "react-hook-form";
import logo from "../../assets/logo.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { registerFormSchema } from "@/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/redux/api/auth.api/auth.api";
import { toast } from "sonner";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const loginForm = useForm({
    resolver: zodResolver(registerFormSchema),
  });
  const onSubmit = async (data: FieldValues) => {
    const loadingToast = toast.loading("Registering...");
    const address = {
      street: data.street,
      city: data.city,
      zipCode: data.zipCode,
      country: "Bangladesh",
    };
    try {
      const res = await register({ ...data, address }).unwrap();
      console.log(res);

      if (res.success) {
        toast.success("Registration successful", {
          id: loadingToast,
        });
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Try a Different Email", { id: loadingToast });
    }
  };
  return (
    <div
      className={cn("flex flex-col gap-6 w-[500px] mx-auto", className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <Link to={"/"}>
            <img src={logo} className="h-20 w-20 mx-auto my-5" />
          </Link>

          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your credentials below to register your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={loginForm.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex items-start justify-between gap-3">
                <div className="grid gap-3 flex-1">
                  <Label htmlFor="email">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    required
                    autoFocus
                    {...loginForm.register("firstName")}
                  />
                  {loginForm.formState.errors.firstName && (
                    <p className="text-red-500">
                      {loginForm.formState.errors.firstName.message?.toString()}
                    </p>
                  )}
                </div>
                <div className="gap-3 flex-1 flex flex-col">
                  <Label htmlFor="email">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    required
                    autoFocus
                    {...loginForm.register("lastName")}
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  autoFocus
                  {...loginForm.register("email")}
                />
                {loginForm.formState.errors.email && (
                  <p className="text-red-500">
                    {loginForm.formState.errors.email.message?.toString()}
                  </p>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  {...loginForm.register("password")}
                />
                {loginForm.formState.errors.password && (
                  <p className="text-red-500">
                    {loginForm.formState.errors.password.message?.toString()}
                  </p>
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="text"
                  required
                  {...loginForm.register("phoneNumber")}
                />
                {loginForm.formState.errors.phoneNumber && (
                  <p className="text-red-500">
                    {loginForm.formState.errors.phoneNumber.message?.toString()}
                  </p>
                )}
              </div>
              <div className="flex items-start justify-between gap-3">
                <div className="grid gap-3 flex-1">
                  <Label htmlFor="email">Street</Label>
                  <Input
                    id="street"
                    type="text"
                    placeholder="123 Main St"
                    required
                    autoFocus
                    {...loginForm.register("street")}
                  />
                  {loginForm.formState.errors.street && (
                    <p className="text-red-500">
                      {loginForm.formState.errors.street.message?.toString()}
                    </p>
                  )}
                </div>
                <div className="grid gap-3 flex-1">
                  <Label htmlFor="email">ZipCode</Label>
                  <Input
                    id="zipCode"
                    type="text"
                    placeholder="1216"
                    required
                    autoFocus
                    {...loginForm.register("zipCode")}
                  />
                  {loginForm.formState.errors.zipCode && (
                    <p className="text-red-500">
                      {loginForm.formState.errors.zipCode.message?.toString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">City</Label>
                <Select
                  onValueChange={(value) => loginForm.setValue("city", value)}
                  {...loginForm.register("city")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dhaka">Dhaka</SelectItem>
                    <SelectItem value="Khulna">Khulna</SelectItem>
                    <SelectItem value="Chittagong">Chittagong</SelectItem>
                    <SelectItem value="Sylhet">Sylhet</SelectItem>
                  </SelectContent>
                </Select>
                {loginForm.formState.errors.city && (
                  <p className="text-red-500">
                    {loginForm.formState.errors.city.message?.toString()}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Button disabled={isLoading} type="submit" className="w-full">
                  Register
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Log In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
