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
import { useLoginMutation } from "@/redux/api/auth.api/auth.api";
import logo from "../../assets/logo.svg";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [login] = useLoginMutation();

  const navigate = useNavigate();

  const loginForm = useForm();
  const onSubmit = async (data: FieldValues) => {
    try {
      const result = await login(data).unwrap();
      console.log("Login successful:", result);
      // Handle successful login (e.g., redirect, show message, etc.)
      if (result.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <Link to={"/"}>
            <img src={logo} className="h-20 w-20 mx-auto my-5" />
          </Link>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={loginForm.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  autoFocus
                  {...loginForm.register("email")}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...loginForm.register("password")}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
