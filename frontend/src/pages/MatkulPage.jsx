import { Button } from '@/components/ui/button'
import { Layout } from '@/components/ui/layout'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import MatkulCard from '@/components/MatkulCard'
import api from "../api/axios"

export const MatkulPage = () => {

    const [user] = useAuth();
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await api.get("/matkul", {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            setData(response.data);
        } catch (error) {
           toast.error("Error occured", {
                description: error.response?.data?.message ? error.response.data.message : "Something went wrong",
            });
        }
    };

    useEffect(() => {
        document.title = "Mata Kuliah"
        if (user.accessToken) {
            fetchData();
        }
    },[user]);

    return (
        <Layout >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((item, index) => (
                <MatkulCard key={index} data={item}/>
            ))}
            </div>
            <div className="flex justify-center px-20">
                <Button> Add Mata Kuliah </Button>
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