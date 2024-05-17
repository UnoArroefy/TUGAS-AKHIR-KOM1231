import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from './ui/button';
import api from '../api/axios';
import { toast } from 'sonner';
import { useAuth } from '@/components/AuthProvider';
import { jwtDecode } from 'jwt-decode';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

export function TableJ({ data }) {
  const [user] = useAuth();
  const userData = jwtDecode(user.accessToken);
  const [userJadwal, setUserJadwal] = useState([]);
  const [id, setId] = useState("");
  const { handleSubmit, formState: { isSubmitting } } = useForm();

  const addJadwal = async () => {
    console.log(id);
    if (id === "") return toast.error("Please select a jadwal first");
    try {
      const response = await api.post("/jadwal-mahasiswa", {
        jadwalId: id,
        mahasiswaId: userData.id,
      }, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      });
      toast.warning("Contact admin if this was a mistake");
      console.log(response.data.message);
      setTimeout(() => {
        toast.success("Jadwal added successfully");
      }, 500);
    } catch (error) {
      toast.error("Error occured", {
        description: error.response.data.message,
      });
    }
  };

  const fetchJadwal = async () => {
    try {
      const response = await api.get(`/jadwal-mahasiswa/user/${userData.id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      });
      setUserJadwal(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  useEffect(() => {
    if (user.accessToken) {
      fetchJadwal();
    }
  }, [user]);

  return (
    <Table>
      <TableCaption>A list of your recent jadwal.</TableCaption>
      <ScrollArea className="h-64"> 
      <TableHeader className="sticky top-0 bg-background z-10">
        <TableRow>
          <TableHead>Ruangan</TableHead>
          <TableHead>Hari</TableHead>
          <TableHead>Jam</TableHead>
          <TableHead className="text-center">Pilih Jadwal</TableHead>
        </TableRow>
      </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
              <TableCell className="font-medium">{item.ruangan}</TableCell>
              <TableCell>{item.hari}</TableCell>
              <TableCell >{item.jam}</TableCell>
              <TableCell>
                <form onSubmit={handleSubmit(addJadwal)} >
                  <Button onClick={() => setId(item.id)} className="w-full" type="submit" disabled={userJadwal.map((each) => each.jadwalId).includes(item.id)}>
                    {isSubmitting && (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {
                      isSubmitting ? "Loading..." : userJadwal.map(each => each.jadwalId).includes(item.id) ? "Dipilih" : "Pilih"
                    }
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
          <ScrollBar className="z-20" />
    </ScrollArea>
    </Table> 
  );
}
