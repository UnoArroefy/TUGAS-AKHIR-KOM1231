import { Layout } from "@/components/ui/layout"
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "@/components/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const OfferPage = () => {
    const [user] = useAuth();
    const params = useParams();
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await api.get(`/offer/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            setData(response.data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    const acceptOffer = async () => {
        try {
            const response = await api.patch(`/offer/${params.id}`, {}, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            toast.success(response.data.message);
            setTimeout(() => {
                navigate("/post");
            }, 500);
        } catch (error) {
            toast.error("Error occured", {
                description: error.response.data.message,
            });
            console.log(error.response.data.message)
        }
    }

    const declineOffer = async () => {
        try {
            const response = await api.delete(`/offer/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            toast.success(response.data.message);
            setTimeout(() => {
                navigate("/post");
            }, 500);
        } catch (error) {
            toast.error("Error occured", {
                description: error.response.data.message,
            });
        }
    }
    
    useEffect(() => {
        document.title = "Offer";
        if (user.accessToken) {
            fetchData();
        }
    }, [user]);

    return (
        <Layout>
            <div className="max-w-4xl mx-auto w-full">
            <div className="mt-4 p-4">
                <div className="flex items-center space-x-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-center mb-4">
                            {
                                data?.mahasiswa ? data.mahasiswa.nama : "Offer Page"
                            }
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            {
                                data?.mahasiswa ? data.mahasiswa.nim : "G64XXXXXXXX"
                            }
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4 border rounded p-4">
                <Table>
                    <TableCaption>Informasi jadwal penukar.</TableCaption>
                    <ScrollArea className="h-64"> 
                    <TableHeader className="sticky top-0 bg-background z-10">
                        <TableRow>
                        <TableHead >Matkul</TableHead>
                        <TableHead >Ruangan</TableHead>
                        <TableHead>Hari</TableHead>
                        <TableHead>Jam</TableHead>
                        </TableRow>
                    </TableHeader>
                        <TableBody>
                        {
                        data?.jadwal ? data.jadwal.map((item) => (
                            <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.jadwal.mataKuliah.nama}</TableCell>
                            <TableCell>{item.jadwal.ruangan}</TableCell>
                            <TableCell>{item.jadwal.hari}</TableCell>
                            <TableCell >{item.jadwal.jam}</TableCell>
                            </TableRow>
                        )) : null
                    }
                        </TableBody>
                        <ScrollBar className="z-20" />
                    </ScrollArea>
                </Table> 
            </div>
                <Button 
                    className="w-full mt-10 hover:bg-green-500"
                    onClick={acceptOffer}    
                >
                    Accept Offer
                </Button>
                <Button 
                    className="w-full mt-2"
                    onClick={declineOffer}
                    variant="destructive"    
                >
                    Decline Offer
                </Button>
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
    );
};