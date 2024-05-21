import { Layout } from "@/components/ui/layout"
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "@/components/AuthProvider";
import { DataTable } from "../components/JadwalTable";

export const JadwalPage = () => {
    const [user] = useAuth();
    const params = useParams();
    const [jadwal, setJadwal] = useState([]);

    const fetchJadwal = async () => {
        try {
            const response = await api.get(`/jadwal-matkul/matkul/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            setJadwal(response.data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
    
    useEffect(() => {
        document.title = "Edit Jadwal";
        if (user.accessToken) {
            fetchJadwal();
        }
    }, [user]);

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-center mb-4">
                {jadwal.length !== 0 ? jadwal[0].mataKuliah.nama : "Jadwal Page"}
            </h1>

            <div className="mt-4 mx-auto w-full max-w-4xl border rounded p-4">
                <DataTable data={jadwal}/>
            </div>
        </Layout>
    );
};