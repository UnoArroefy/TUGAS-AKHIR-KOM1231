"use client"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import api from "../api/axios"
import { useEffect } from "react";
import { useAuth } from "./AuthProvider";

const schema = z.object({
    nama: z.string()
            .min(1, {
                message: "Nama is required"
            }),
    nim: z.string()
            .trim()
            .length(11, {
                message: "NIM must be 11 characters long"
            })
            .regex(/^[A-Z]\d{10}$/, { 
              message: "Invalid NIM format" 
            }),
    email: z.string()
            .email()
            .refine(value => /@apps.ipb.ac.id$/.test(value), { 
              message: "Please Use IPB Email Address" 
            }),
    password: z.string().min(8),
});

export function FormRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [user] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("accessToken") || user.accessToken) {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/mahasiswa", data);
      toast.success("Account created successfully");
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
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="text-balance text-muted-foreground">Create your account for KRSans</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="nama">Nama</Label>
              <Input {...register("nama")} id="nama" placeholder="Naruto Uzumaki" required type="text" autoFocus/>
              {
                errors.nama && <p className="text-red-500 text-xs">{errors.nama.message}</p>
              }
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nim">NIM</Label>
              <Input {...register("nim")} id="nim" placeholder="G64XXXXXXXX" required type="text"/>
              {
                errors.nim && <p className="text-red-500 text-xs">{errors.nim.message}</p>
              }
            </div>
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
              {isSubmitting && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isSubmitting ? "Loading..." : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have account? &ensp; 
          <Link to="/login" className="underline">
            Login
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
