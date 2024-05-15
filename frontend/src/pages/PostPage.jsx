import { Button } from '@/components/ui/button'
import { Layout } from '@/components/ui/layout'
import api from "../api/axios"
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { Toaster } from "@/components/ui/sonner";
import { FormPost } from '@/components/FormPost';
import { PostCard } from '@/components/PostCard';

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
        }
    };

    useEffect(() => {
        document.title = "Post"
        if (user.accessToken) {
            fetchData();
        }
    },[user.accessToken]); 

    console.log(data);

    return (
        <Layout >
            {
                data.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data.map((item, index) => (
                            <PostCard key={index} data={item}/>
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
            {/* <ComboboxDemo /> */}
        </Layout>
    )
}