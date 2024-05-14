import { Button } from '@/components/ui/button'
import { Layout } from '@/components/ui/layout'
import api from "../api/axios"
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { FormPost } from '@/components/FormPost'

export const PostPage = () => {

    const [user] = useAuth();
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await api.get("/post", {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
            toast.error("Error occured", {
                description: error.response?.data?.message ? error.response.data.message : "Something went wrong",
            });
        }
    };

    useEffect(() => {
        document.title = "Post"
        if (user.accessToken) {
            fetchData();
        }
    },[user.accessToken]); 

    return (
        <Layout >
            {
                data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data.map((item, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                                <h1 className="text-lg font-semibold">{item.title}</h1>
                                <p className="text-sm text-gray-500">{item.content}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <h1 className="text-lg font-semibold">No Post</h1>
                    </div>
                )
            }
            <FormPost>
                <div className="flex justify-center px-20">
                    <Button> Add Post </Button>
                </div>
            </FormPost>
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