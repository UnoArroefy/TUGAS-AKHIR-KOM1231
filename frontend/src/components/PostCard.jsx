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
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "@/components/AuthProvider";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "./ui/badge";

export const PostCard = ({ data }) => {

  const [user] = useAuth();
  const userData = jwtDecode(user.accessToken);
  const [Edit, setEdit] = useState(false);
  const navigate = useNavigate();

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

//   useEffect(() => {
//       fetchJadwal();
//   }, []);

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
                <p className="font-semibold text-lg">{data.title}</p>
              </div>
              <Separator className="my-2" />
              <p className="text-sm text-primary/80 mb-2 text-left">{data.jadwal[0].mahasiswa.nama}</p>
              <div className="flex flex-wrap gap-1">
                {
                    data.jadwal.map((item, index) => (
                        <>
                        <Badge variant="secondary" key={index} className="text-xs px-2 py-0.5 text-gray-400">{item.jadwal.mataKuliah.kode}</Badge>
                        </>
                    ))
                }
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
              <DialogDescription>Informasi mengenai postingan penawaran</DialogDescription>
            </DialogHeader>
              {/* <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nama" className="text-right">
                    Nama
                  </Label>
                  <div className="col-span-3 flex flex-col">
                    <Input
                      id="nama"
                      className="mb-1"
                      disabled={userData.role === "Admin" ? false : true}
                      {...register("nama")}
                    />
                    {errors.nama && (
                      <p className="text-red-500 text-xs">{errors.nama.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="kode" className="text-right">
                    Kode
                  </Label>
                  <div className="col-span-3 flex flex-col">
                    <Input
                      id="kode"
                      className="mb-1"
                      disabled={userData.role === "Admin" ? false : true}
                      {...register("kode")}
                    />
                    {errors.kode && (
                      <p className="text-red-500 text-xs">{errors.kode.message}</p>
                    )}
                  </div>
                </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sks" className="text-right">
                  SKS
                </Label>
                <div className="col-span-3 flex flex-col">
                  <Input
                    id="sks"
                    className="mb-1"
                    disabled={userData.role === "Admin" ? false : true}
                    {...register("sks")}
                  />
                  {errors.sks && (
                    <p className="text-red-500 text-xs">{errors.sks.message}</p>
                  )}
                </div>
              </div>
            </div> */}
            <DialogFooter>
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
              {/* <TableJ data={jadwal} /> */}
            </div>
            <DialogFooter>
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
