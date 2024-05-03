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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "@/components/AuthProvider";
import { jwtDecode } from "jwt-decode";

const MatkulCard = ({ data }) => {

    const [user] = useAuth();
    const [jadwal, setJadwal] = useState([]);
    const userData = jwtDecode(user.accessToken);

    const fetchJadwal = async () => {
      console.log(data.id);
      try {
          const response = await api.get(`/jadwal-matkul/matkul/${data.id}`, {
              headers: {
                  Authorization: `Bearer ${user.accessToken}`
              }
          });
          setJadwal(response.data);
          console.log(response.data)
      } catch (error) {
          console.log(error.response.data.message)
      }
  };

  useEffect(() => {
      fetchJadwal();
  }, [data.id]);

  return (
    <Dialog >
      <DialogTrigger >
        <div className="block w-full outline-0 focus:ring-2 hover:ring-2 ring-primary transition duration-300 rounded-lg">
          <Card className="w-full rounded-lg border-2 shadow-md hover:shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-lg">{data.nama}</p>
              </div>
              <Separator className="my-2" />
              <p className="text-sm text-primary/80 mb-2 text-left">{data.kode}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">SKS: {data.sks}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Tabs defaultValue="Informasi" className="sm:max:w-[400px] mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="Informasi">Informasi</TabsTrigger>
            <TabsTrigger value="Jadwal">Jadwal</TabsTrigger>
          </TabsList>
          <TabsContent value="Informasi">
            <DialogHeader className="mt-4">
              <DialogTitle>Informasi Matkul</DialogTitle>
              <DialogDescription>Informasi mengenai mata kuliah</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nama
                </Label>
                <Input
                  id="name"
                  defaultValue={data.nama}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="kode" className="text-right">
                  Kode
                </Label>
                <Input
                  id="kode"
                  defaultValue={data.kode}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sks" className="text-right">
                  SKS
                </Label>
                <Input
                  id="sks"
                  defaultValue={data.sks}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {userData.role === "Admin" && (
                <>
                  <Button variant="default" type="submit">Save changes</Button>
                  <Button variant="destructive" >
                    Delete
                  </Button>
                </>
              )}
              <DialogClose>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </TabsContent>
          <TabsContent value="Jadwal" >
            <DialogHeader className="mt-4">
              <DialogTitle>Jadwal Matkul</DialogTitle>
              <DialogDescription>Jadwal perkuliahan mata kuliah</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {jadwal.length === 0 ? (
                <p className="text-red-400">Belum ada jadwal untuk mata kuliah ini</p>
              ) : (
                jadwal.map((item, index) => (
                  <div key={index} className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="hari" className="text-right">
                      Hari
                    </Label>
                    <Input
                      id="hari"
                      defaultValue={item.hari}
                      className="col-span-3"
                    />
                    <Label htmlFor="jam" className="text-right">
                      Jam
                    </Label>
                    <Input
                      id="jam"
                      defaultValue={item.jam}
                      className="col-span-3"
                    />
                    <Label htmlFor="ruangan" className="text-right">
                      Ruangan
                    </Label>
                    <Input
                      id="ruangan"
                      defaultValue={item.ruangan}
                      className="col-span-3"
                    />
                  </div>
                ))
              )}
            </div>
            <DialogFooter>
                {
                  userData.role === "Admin" && (
                      <Button variant="default">Add new</Button>
                  )
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

export default MatkulCard;
