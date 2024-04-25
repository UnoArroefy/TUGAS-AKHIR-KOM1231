"use client"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api/axios"
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";

const schema = z.object({
  email: z.string()
          .email()
          .refine(value => /@apps.ipb.ac.id$/.test(value), { 
            message: "Please Use IPB Email Address" 
          }),
  password: z.string().min(8),
});

export function FormLogin() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      toast.success("Login success");
      console.log(response.data.message);
    } catch (error) {
      toast.error("Error occured", {
        description: error.response.data.message,
      });
    }
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">Enter your email below to login to your account</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input {...register("email")} id="email" placeholder="user@apps.ipb.ac.id" required type="email"/>
              {
                errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>
              }
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input {...register("password")} id="password" placeholder="Password" required type="password" />
              {
                errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>
              }
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              {isSubmitting ? "Loading..." : "Login"}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don't have an account? &ensp; 
          <Link to="/register" className="underline">
            Register
          </Link>
        </div>
        <Toaster
          toastOptions={{
            unstyled: false,
            classNames: {
              error: 'bg-red-400',
              success: 'text-green-400',
              warning: 'text-yellow-400',
              info: 'bg-blue-400',
            },
          }}
        />
      </div>
    </div>
  );
}