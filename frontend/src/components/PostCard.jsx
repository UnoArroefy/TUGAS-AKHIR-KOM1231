import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
import { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import { useAuth } from "@/components/AuthProvider";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useForm } from "react-hook-form";

export const PostCard = ({ data }) => {

  const [user] = useAuth();
  const userData = jwtDecode(user.accessToken);
  const [Edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const [offer, setOffer] = useState([]);
  const [jadwal, setJadwal] = useState([]);
  const titleRef = useRef(null);

  const { handleSubmit, formState: { isSubmitting } } = useForm();

  const deletePost = async () => {
    try {
      const response = await api.delete(`/post/${data.id}`, {
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
    }
  }

  const fetchOffer = async () => {
    try {
        const response = await api.get(`/offer/post/${data.id}`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        });
        setOffer(response.data);
    } catch (error) {
        console.log(error.response.data.message)
    }  
  };

  const fetchJadwal = async () => {
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

  const createOffer = async () => {

    const postData = jadwal.filter(item => data.jadwal.map(item => item.jadwal.mataKuliah.id).includes(item.jadwal.mataKuliah.id)).map(item => item.id);
    if (postData.length === 0) {
        toast.error("Error occurred", { description: "You doesn't have jadwal for this matkul" });
        return;
    }

    try {
        const response = await api.post("/offer", {
            postId: data.id,
            mahasiswaId: userData.id,
            jadwalId: postData
        }, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        });
        toast.success(response.data.message);
        fetchOffer();
    } catch (error) {
        console.log(error);
        toast.error("Error occured", {
            description: error.response.data.message,
        });
    }
  }

  useEffect(() => {
      fetchOffer();
      fetchJadwal();

      const adjustFontSize = () => {
        const titleElement = titleRef.current;
        if (titleElement) {
          titleElement.style.fontSize = `18px`;
          let fontSize = 18;
          while (titleElement.scrollHeight > titleElement.clientHeight && fontSize > 10) {
            fontSize -= 1;
            titleElement.style.fontSize = `${fontSize}px`;
          }
        }
      };
  
      adjustFontSize();
      window.addEventListener('resize', adjustFontSize);
      return () => window.removeEventListener('resize', adjustFontSize);
  }, [data.title]);

  return (
    <Dialog onOpenChange={
      () => {
        if (Edit){
          navigate(0);
        }
        setEdit(false);
      }
    }>
      <DialogTrigger >
            <div className="block w-full outline-0 focus:ring-2 hover:ring-2 ring-primary transition duration-300 rounded-lg">
                <Card className="w-full rounded-lg border-2 shadow-md hover:shadow-lg">
                    <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <p ref={titleRef} className="font-semibold text-lg max-h-10 overflow-hidden">{data.title}</p>
                    </div>
                    <Separator className="my-2" />
                    <p className="text-sm text-primary/80 mb-2 text-left">{data.jadwal[0].mahasiswa.nama}</p>
                    <div className="flex flex-wrap gap-1">
                        {data.jadwal.map((item, index) => (
                        <Badge variant="secondary" key={index} className="text-xs px-2 py-0.5 text-gray-400">
                            {item.jadwal.mataKuliah.kode}
                        </Badge>
                        ))}
                    </div>
                    </CardContent>
                </Card>
            </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Tabs defaultValue="Informasi" className="sm:max:w-[400px] mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="Informasi">Informasi</TabsTrigger>
            <TabsTrigger value="penawaran">Penawaran</TabsTrigger>
          </TabsList>
          <TabsContent value="Informasi">
            <DialogHeader className="mt-4">
              <DialogTitle>Informasi Post</DialogTitle>
              <DialogDescription>{data.title}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <Table>
                <TableCaption>Informasi jadwal yang ingin ditukarkan</TableCaption>
                <ScrollArea className="h-64">
                <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                    <TableHead>Matkul</TableHead>
                    <TableHead>Ruangan</TableHead>
                    <TableHead>Hari</TableHead>
                    <TableHead>Jam</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.jadwal.map((item) => (
                    <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.jadwal.mataKuliah.nama}</TableCell>
                    <TableCell>{item.jadwal.ruangan}</TableCell>
                    <TableCell>{item.jadwal.hari}</TableCell>
                    <TableCell >{item.jadwal.jam}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
                <ScrollBar className="z-20" />
                </ScrollArea>
            </Table>        
            </div>
            <DialogFooter>
                {
                    userData.id !== data.authorId ? (
                        <form onSubmit={handleSubmit(createOffer)}>
                        <Button type="submit">
                        {isSubmitting && (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        )}
                        {isSubmitting ? "Menawar..." : "Tawar"}
                        </Button>
                    </form>
                    ) : null
                }
              {userData.role === "Admin" || userData.id === data.authorId ? (
                  <Button variant="destructive" onClick={(event) => { event.preventDefault(); deletePost(); }}>
                    Delete
                  </Button> 
              ) : null
            }
              <DialogClose>
                <Button type="button" variant="secondary" className="w-full">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </TabsContent>
          <TabsContent value="penawaran" >
            <DialogHeader className="mt-4">
              <DialogTitle>Penawaran</DialogTitle>
              <DialogDescription>List penawaran pertukaran</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
            {
                <Table>
                    <TableCaption>Informasi jadwal yang ingin ditukarkan</TableCaption>
                    <ScrollArea className="h-64">
                    <TableHeader className="sticky top-0 bg-background z-10">
                        <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Nim</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {offer.map((item) => (
                        <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.mahasiswa.nama}</TableCell>
                        <TableCell>{item.mahasiswa.nim}</TableCell>
                        <TableCell >
                            <Button onClick={()=>navigate(`/offer/${item.id}`)} className="w-full" disabled={data.authorId !== userData.id}>
                                        lihat
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <ScrollBar className="z-20" />
                    </ScrollArea>
                </Table>  
            }
            </div>
            <DialogFooter>
                {
                userData.id !== data.authorId ? (
                    <form onSubmit={handleSubmit(createOffer)}>
                        <Button type="submit">
                            Tawar
                        </Button>
                    </form>
                    ) : null
                }
                {userData.role === "Admin" || userData.id === data.authorId ? (
                    <Button variant="destructive" onClick={(event) => { event.preventDefault(); deletePost(); }}>
                        Delete
                    </Button> 
                ) : null
                }
                <DialogClose>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
