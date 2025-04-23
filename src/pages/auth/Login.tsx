import { Button } from "@/components/ui/button";
import {  Card, CardContent,  CardFooter, CardHeader,} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema } from "@/validations/auth/login";
import { HandPlatter as Plate } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FC } from "react"
import { z } from "zod"
import GoogleAuth from "./GoogleAuth";
import { useNavigate } from "react-router-dom";

type FormData = z.infer<typeof loginSchema>

const Login: FC = () => {
  const { loginMutation } = useAuth();

  const { mutateAsync ,isPending } = loginMutation;

  const { register,handleSubmit,formState: { errors },} = useForm<FormData>({ resolver: zodResolver(loginSchema) });

  const navigate = useNavigate()

  const handleUserLogin = async (data: FormData) => {
    console.log(data, "data after proper validation");

    try {
      const res = await mutateAsync(data);
      console.log(res);
      if(res?.success){
        toast("please check you email")
      }else{
        toast.error(res?.message || "Login failed. please try again later")
      }
    } catch (err) {
      console.log(err,"error")
      if (err.response?.data?.error === "blocked") {
        toast.error("Your account has been blocked.")
        // Optional: redirect to a blocked screen
        navigate("/blocked")
        return
      }
    
      // Other errors
      toast.error("Login failed")
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b flex flex-col items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-neutral-200/50 bg-[size:20px_20px] pointer-events-none" />

      <div className="relative w-full max-w-sm mx-auto">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-emerald-600 rounded-2xl p-3 mb-4">
            {/* <Plate className="h-8 w-8 text-emerald-600" /> */}
            <Plate className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Welcome Back to ShareBite
          </h1>
          <p className="text-neutral-500 mt-2">Sign in to continue sharing</p>
        </div>

        {/* Login Card */}
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <div className="text-sm text-neutral-500">
              Enter your email to receive a magic link
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(handleUserLogin)}>
              <div className="space-y-2">
                <Input
                  // type="email"
                  {...register("email")}
                  placeholder="name@example.com"
                  className="w-full"
                />
                 <div className="min-h-[10px]">
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <Button type="submit" disabled={isPending} className="w-full bg-emerald-600">
                  Send Magic Link
                </Button>
              </div>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-neutral-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-neutral-500">
                  Or continue with
                </span>
              </div>
            </div>

 
             <GoogleAuth/>
      
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default Login;
