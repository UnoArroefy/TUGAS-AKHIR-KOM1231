import { Button } from '@/components/ui/button'
import { useState, useEffect } from "react";
import { useAuth } from '@/components/AuthProvider';
import { jwtDecode } from 'jwt-decode';
import { Layout } from '@/components/ui/layout';
import api from "../api/axios";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export const HomePage = () => {
    
    const [user] = useAuth();
    const [jadwal, setJadwal] = useState([]);
    const [posts, setPosts] = useState([]);
    const [offers, setOffers] = useState([]);
    const [count, setCount] = useState(0);
    
    const fetchJadwal = async () => {
        const userData = jwtDecode(user.accessToken);
        try {
            const response = await api.get(`/jadwal-mahasiswa/user/${userData.id}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            setJadwal(response.data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    const fetchPost = async () => {
        const userData = jwtDecode(user.accessToken);
        try {
            const response = await api.get(`/post/user/${userData.id}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            setPosts(response.data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    const countOffer = async (postId) => {
        try {
            const response = await api.get(`/offer/post/${postId}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            return response.data.length;
        } catch (error) {
            console.log(error.response.data.message);
            return 0;
        }
    }

    const fetchOffer = async () => {
        const userData = jwtDecode(user.accessToken);
        try {
            const response = await api.get(`/offer/user/${userData.id}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            setOffers(response.data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    
    useEffect(() => {
        document.title = "KRSans"
        if (user.accessToken) {
            fetchJadwal();
            fetchOffer();
            fetchPost();
        }
    }, [user]);

    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

    return (
        <Layout>
            <div className='container'>
                <h1 className="text-2xl font-semibold mb-4">Jadwal Mata Kuliah</h1>
                <Table className="w-full table-fixed">
                    <TableHeader className="sticky top-0 bg-background z-10">
                        <TableRow>
                            {days.map((day) => (
                                <TableHead key={day} className="w-1/7">{day}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            {days.map((day) => {
                                const dayJadwal = jadwal.filter(j => j.jadwal.hari === day);
                                return (
                                    <TableCell key={day} className="align-top">
                                        {dayJadwal.length > 0 ? (
                                            dayJadwal.map((item, index) => (
                                                <Card key={index} className="w-full rounded-lg border-2 shadow-md hover:shadow-lg mb-4">
                                                    <CardContent className="p-4">
                                                        <div className="flex items-center justify-between">
                                                            <p className="font-semibold text-lg">{item.jadwal.mataKuliah.nama}</p>
                                                        </div>
                                                        <Separator className="my-2" />
                                                        <p className="text-sm text-primary/80 mb-2 text-left">{item.jadwal.ruangan}</p>
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-sm text-gray-600">Pukul : {item.jadwal.jam}</p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))
                                        ) : (
                                            <p className="text-gray-400 italic">No schedule</p>
                                        )}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableBody>
                </Table>
                <Separator className="my-8" />
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold mb-4">Judul Postingan User</h1>
                        <Table className="w-full">
                            <TableHeader className="sticky top-0 bg-background z-10">
                                <TableRow>
                                    <TableHead>Judul post</TableHead>
                                    <TableHead>Mata kuliah</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.title}</TableCell>
                                        <TableCell>
                                        <div  className='flex flex-wrap gap-2'>
                                            {item.jadwal.map(j => (
                                            <div key={j.id}>
                                                <Badge>{j.jadwal.mataKuliah.nama}</Badge>
                                            </div>
                                        ))}
                                        </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold mb-4">Penawaran</h1>
                        <Table className="w-full">
                            <TableHeader className="sticky top-0 bg-background z-10">
                                <TableRow>
                                    <TableHead>Judul post</TableHead>
                                    <TableHead>Mata kuliah</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {offers.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.post.title}</TableCell>
                                        <TableCell>
                                            <div  className='flex flex-wrap gap-2'>
                                            {item.jadwal.map(j => (
                                            <div key={j.id}>
                                                <Badge>{j.jadwal.mataKuliah.nama}</Badge>
                                            </div>
                                        ))}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
