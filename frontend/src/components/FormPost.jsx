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
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api/axios";
import { useAuth } from "./AuthProvider";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { jwtDecode } from "jwt-decode";
import { Plus} from "lucide-react";

const schema = z.object({
    title: z.string().min(3).max(255)
});

export const FormPost = ({children}) => {
    const defaultValues = {
        title: "",
    }

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const [user] = useAuth();
    const navigate = useNavigate();
    
    const [Edit, setEdit] = useState(false);
    const [jadwal, setJadwal] = useState([]);
    const [postData, setPostData] = useState([]);
    const [open, setOpen] = useState(false);

    const removeItem = (index) => {
        setPostData(prevJadwal => prevJadwal.filter((_, i) => i !== index));
    };

    const addItem = (item) => {
        setPostData(prevPostData => [...prevPostData, item]);
    };

    const removeJadwal = (index) => {
        setJadwal(prevJadwal => prevJadwal.filter((_, i) => i !== index));
    };

    const addJadwal = (item) => {
        setJadwal(prevJadwal => [...prevJadwal, item]);
    };

    const createPost = async (data) => {
        const userData = jwtDecode(user.accessToken);
        try {
            const response = await api.post("/post", {
                title: data.title,
                jadwalId: postData.map(item => item.id),
                authorId: userData.id,
        }, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });
            toast.success(response.data.message);
            setEdit(true);
            reset(defaultValues);
            setPostData([]);
            fetchJadwal();
        } catch (error) {
            toast.error("Error occured", {
                description: error.response?.data?.message ? error.response.data.message : "Something went wrong",
            });
        }
    }

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

    useEffect(() => {
        if (user.accessToken){
            fetchJadwal();
        }
    }, [user]);

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
                    <DialogTitle> Add Post </DialogTitle>
                    <DialogDescription> Buat postingan untuk menukar jadwal </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(createPost)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <div className="col-span-3 flex flex-col">
                            <Input
                            id="title"
                            className="mb-1"
                            {...register("title")}
                            />
                            {errors.title && (
                            <p className="text-red-500 text-xs">{errors.title.message}</p>
                            )}
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            Matkul
                        </Label>
                        <div className="col-span-3 flex flex-wrap gap-2">
                            {
                                postData.length ? 
                                postData.map((item, index) => (
                                    <div key={item.id}>
                                        <Badge className="cursor-pointer hover:bg-red-500" onClick={()=> {
                                            removeItem(index)
                                            addJadwal(item)
                                        }}>{item.jadwal.mataKuliah.nama}</Badge>
                                    </div>
                                )) : null
                            }
                            <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <span
                                className="bg-gray-500 cursor-pointer hover:bg-gray-700 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                >
                                    <Plus className="w-3 h-5 text-white" />
                                </span>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                <CommandInput placeholder="Search Matkul..." />
                                <CommandEmpty>No Matkul Found.</CommandEmpty>
                                <CommandGroup>
                                    <CommandList>
                                    {   
                                        jadwal.map((item, index) => (
                                            <CommandItem
                                                key={item.id}
                                                value={item.jadwal.mataKuliah.nama}
                                                onSelect={() => {
                                                    addItem(item)
                                                    removeJadwal(index)
                                                }}
                                            >
                                                {item.jadwal.mataKuliah.nama}
                                            </CommandItem>
                                        ))
                                    }
                                </CommandList>
                                </CommandGroup>
                                </Command>
                            </PopoverContent>
                            </Popover>
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
                        {isSubmitting ? "Adding..." : "Add Post"}
                    </Button>
                    <DialogClose>
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
