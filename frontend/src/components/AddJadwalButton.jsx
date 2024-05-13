import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/select"
  
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "../api/axios";
import { useAuth } from "@/components/AuthProvider";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"

const jadwalSchema = z.object({
    ruangan: z.string().min(1, { message: "Ruangan is required"}),
    hari: z.string().refine((val) => ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].includes(val), {
      message: 'Invalid day (Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, Minggu)',
    }),
    jam: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Invalid time format (HH:mm)',
    }),
});

export function AddJadwalButton() {
    const [user] = useAuth();
    const params = useParams();
    const [edit, setEdit] = useState(false);

    const navigate = useNavigate();

    const defaultValues = {
        ruangan: "",
        hari: "",
        jam: "",
    }

    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
      } = useForm({
        resolver: zodResolver(jadwalSchema),
        defaultValues,
    });

    const addJadwal = async (data) => {
        try {
            const response = await api.post("/jadwal-matkul", {
                ...data,
                mataKuliahId : params.id,
            }, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });
            reset(defaultValues);
            setEdit(true);
            toast.success(response.data.message);
        } catch (error) {
            toast.error("Error occured", {
                description: error.response?.data?.message ? error.response.data.message : "Something went wrong",
              });
        }
    }


    return (
    <Dialog onOpenChange={
        () => {
            if (edit){
            navigate(0);
            }
            setEdit(false);
        }
    }>
        <DialogTrigger asChild>
            <Button
                variant="outline"
                size="sm"
                onClick={() => console.log("Add jadwal")}
            >
                Add jadwal
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Add Jadwal Mata Kuliah</DialogTitle>
            <DialogDescription>
                Tambah jadwal mata kuliah baru
            </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(addJadwal)}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ruangan" className="text-right">
                    Ruangan
                    </Label>
                    <div className="col-span-3">
                    <Input
                    id="ruangan"
                    defaultValue=""
                    placeholder="e.g CCR 2.01"
                    {...register("ruangan")}
                    />
                    {
                        errors.ruangan && <p className="text-red-500 text-xs">{errors.ruangan.message}</p>
                    }
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="hari" className="text-right">
                        Hari
                    </Label>
                    <div className="col-span-3">
                        <Controller
                            name="hari"
                            control={control}
                            render={({ field }) => (
                            <Select 
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}    
                            >
                                <SelectTrigger>
                                <SelectValue placeholder="Pilih hari" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="Senin">Senin</SelectItem>
                                <SelectItem value="Selasa">Selasa</SelectItem>
                                <SelectItem value="Rabu">Rabu</SelectItem>
                                <SelectItem value="Kamis">Kamis</SelectItem>
                                <SelectItem value="Jumat">Jumat</SelectItem>
                                <SelectItem value="Sabtu">Sabtu</SelectItem>
                                <SelectItem value="Minggu">Minggu</SelectItem>
                                </SelectContent>
                            </Select>
                            )}
                        />
                        {errors.hari && (
                            <p className="text-red-500 text-xs">{errors.hari.message}</p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="jam" className="text-right">
                    Jam
                    </Label>
                    <div className="col-span-3">
                    <Input
                    id="jam"
                    defaultValue=""
                    placeholder="e.g 08:00"
                    {...register("jam")}
                    />
                    {
                        errors.jam && <p className="text-red-500 text-xs">{errors.jam.message}</p>
                    }
                    </div>
                </div>
            </div>
            <DialogFooter>
                <Button type="submit">
                    {isSubmitting && (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {isSubmitting ? "Loading..." : "Add Jadwal"}
                </Button>
                <DialogClose >
                    <Button type="button" variant="secondary" className="w-full">
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
    )
}