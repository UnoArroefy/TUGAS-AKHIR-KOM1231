import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Layout } from '@/components/ui/layout'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { CardContent, CardFooter, Card } from "@/components/ui/card"
import { useAuth } from '@/components/AuthProvider'
import { jwtDecode } from 'jwt-decode'
import { toast } from "sonner"
import { Toaster } from '@/components/ui/sonner'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api/axios"
import { useNavigate } from 'react-router-dom'

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

export const ProfilePage = () => {

    const [user] = useAuth();
    const [Data, setData] = useState({});
    const [Edit, setEdit] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
    });

    const fetchData = async () => {
        const userData = jwtDecode(user.accessToken);
        try {
            const response = await api.get(`/mahasiswa/${userData.id}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            console.log(response.data);
            setData(response.data);
            reset({
                nama: response.data.nama,
                nim: response.data.nim,
                email: response.data.email,
                password: "",
            });
        } catch (error) {
            toast.error("Error occured", {
                description: error.response?.data?.message ? error.response.data.message : "Something went wrong",
            })
        }
    }

    const deleteAccount = async () => {
        const userData = jwtDecode(user.accessToken);
        try {
            const response = await api.delete(`/mahasiswa/${userData.id}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            console.log(response.data);
        } catch (error) {
            toast.error("Error occured", {
                description: error.response?.data?.message ? error.response.data.message : "Something went wrong",
            });
            setEdit(false);
        }
    }

    const updateAccout = async (data) => {
        const userData = jwtDecode(user.accessToken);
        try {
            const response = await api.put(`/mahasiswa/${userData.id}`, data, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            toast.success(response.data.message);
            setTimeout(() => {
                navigate(0);
            }, 500);
        } catch (error) {
            toast.error("Error occured", {
                description: error.response?.data?.message ? error.response.data.message : "Something went wrong",
            });
            setEdit(false);
        }
    }

    useEffect(() => {
        document.title = "Profile"
        if (user.accessToken) {
            fetchData();
        }
    }, [user]);

    return (
        <Layout>
            <div className="grid grid-cols-12 gap-4 px-4 mx-auto lg:gap-6 xl:gap-10">
                <div className="col-span-12">
                    <div className="flex items-center space-x-4">
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold">{Data.nama}</h1>
                            <p className="text-gray-500 dark:text-gray-400">Mahasiswa IPB University</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-12">
                    <Card >
                        <form onSubmit={handleSubmit(updateAccout)}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2 mt-4">
                                    <Label htmlFor="nama">Name</Label>
                                    <Input id="nama" disabled={!Edit} {...register("nama")} />
                                    {
                                        errors.nama && (
                                            <p className="text-red-500 text-xs">{errors.nama.message}</p>
                                        )
                                    }
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nim">NIM</Label>
                                    <Input id="nim" disabled={!Edit} {...register("nim")} />
                                    {
                                        errors.nim && (
                                            <p className="text-red-500 text-xs">{errors.nim.message}</p>
                                        )
                                    }
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" disabled={!Edit} {...register("email")} />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs">{errors.email.message}</p>
                                    )}
                                </div>
                                {Edit ? <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" placeholder="New Secret" disabled={!Edit} {...register("password")} type="password"/>
                                    {
                                        errors.password && (
                                            <p className="text-red-500 text-xs">{errors.password.message}</p>
                                        )
                                    }
                                </div>: null}
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                {
                                    !Edit ?
                                        <Button onClick={() => setEdit(!Edit)}>Edit</Button> :
                                        <div className="flex space-x-1">
                                            <Button type="submit">Save</Button>
                                            <Button variant="destructive" onClick={deleteAccount}>Delete</Button>
                                        </div>
                                }
                            </CardFooter>
                        </form>
                    </Card>
                </div>
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
        </Layout>
    )
}