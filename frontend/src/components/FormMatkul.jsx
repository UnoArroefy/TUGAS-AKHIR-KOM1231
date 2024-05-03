import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api/axios";
import { useAuth } from "./AuthProvider";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export const FormMatkul = ({children}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm({
        resolver: zodResolver(schema),
    });

    const [user] = useAuth();
    const [Edit, setEdit] = useState(false);
    const navigate = useNavigate();

    const createMatkul = async (data) => {
        try {
            const response = await api.post("/matkul", data, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });
            toast.success(response.data.message);
            setEdit(true);
        } catch (error) {
            console.error(error);
        }
        console.log(data);
    }

    return (
        <Dialog onOpenChange={
            () => {
              if (Edit){
                navigate(0);
              }
              setEdit(false);
            }
        }
        >
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle> Add Mata Kuliah </DialogTitle>
                    <DialogDescription> Tambah mata kuliah baru </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(createMatkul)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nama" className="text-right">
                            Nama
                        </Label>
                        <div className="col-span-3 flex flex-col">
                            <Input
                            id="nama"
                            className="mb-1"
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
                            {...register("sks")}
                        />
                        {errors.sks && (
                            <p className="text-red-500 text-xs">{errors.sks.message}</p>
                        )}
                        </div>
                    </div>
                    </div>
                <DialogFooter>
                    <Button variant="default" type="submit">
                        {isSubmitting && (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        )}
                        {isSubmitting ? "Adding..." : "Add Matkul"}
                    </Button>
                    <DialogClose>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                    </DialogClose>
                </DialogFooter>
                        </form>
            </DialogContent>
        </Dialog>
    )
}
