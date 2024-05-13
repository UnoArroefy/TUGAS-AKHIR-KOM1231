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
import { Link, useNavigate } from "react-router-dom";
import { TableJ } from "./TableJCard";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const schema = z.object({
  nama: z.string()
      .trim()
      .min(1)
      .max(100),
  kode: z.string()
      .trim()
      .regex(/^[A-Z]*\d*[A-Z]?$/, {
        message: 'Invalid kode mata kuliah'
      })
      .min(1)
      .max(7),
  sks: z.coerce.number()
      .min(1)
      .max(6),
  });

const MatkulCard = ({ data }) => {

  const [user] = useAuth();
  const [jadwal, setJadwal] = useState([]);
  const userData = jwtDecode(user.accessToken);
  const [Edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nama: data.nama,
      kode: data.kode,
      sks: data.sks,
    }
  });

  const fetchJadwal = async () => {
    try {
        const response = await api.get(`/jadwal-matkul/matkul/${data.id}`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        });
        setJadwal(response.data);
    } catch (error) {
        console.log(error.response.data.message)
    }
  };

  const deleteMatkul = async () => {
    try {
      const response = await api.delete(`/matkul/${data.id}`, {
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

  const updateMatkul = async (formData) => {
    try {
      const response = await api.put(`/matkul/${data.id}`, {
        nama: formData.nama,
        kode: formData.kode,
        sks: formData.sks
      }, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      });
      toast.success(response.data.message);
      setEdit(true);
    }
    catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
      fetchJadwal();
  }, []);

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
            <form onSubmit={handleSubmit((formData) => updateMatkul(formData))}>
              <div className="grid gap-4 py-4">
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
            </div>
            <DialogFooter>
              {userData.role === "Admin" && (
                <>
                  <Button variant="default" type="submit">
                    {isSubmitting && (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button variant="destructive" onClick={(event) => { event.preventDefault(); deleteMatkul(); }}>
                    Delete
                  </Button>
                </>
              )}
              <DialogClose>
                <Button type="button" variant="secondary" className="w-full">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
          </TabsContent>
          <TabsContent value="Jadwal" >
            <DialogHeader className="mt-4">
              <DialogTitle>Jadwal Matkul</DialogTitle>
              <DialogDescription>Jadwal perkuliahan mata kuliah</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <TableJ data={jadwal} />
            </div>
            <DialogFooter>
                {
                  userData.role === "Admin" && (
                    <Link to={`/matkul/${data.id}`}>
                      <Button variant="default">Edit Jadwal</Button>
                    </Link>
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
