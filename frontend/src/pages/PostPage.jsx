import { Button } from '@/components/ui/button'
import { Layout } from '@/components/ui/layout'
import api from "../api/axios"
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

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
            console.log(response.data);
            setData(response.data);
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
            <div className="flex justify-center px-20">
            <Button> From Post </Button>
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