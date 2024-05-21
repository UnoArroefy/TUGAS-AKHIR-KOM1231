import { Button } from '@/components/ui/button'
import { Layout } from '@/components/ui/layout'
import api from "../api/axios"
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { Toaster } from "@/components/ui/sonner";
import { FormPost } from '@/components/FormPost';
import { PostCard } from '@/components/PostCard';
import { toast } from "sonner";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Search } from 'lucide-react';

export const PostPage = () => {

    const [user] = useAuth();
    const [data, setData] = useState([]);
    const [backup, setBackup] = useState([]);
    const [Matkul, setMatkul] = useState([]);
    const [open, setOpen] = useState(false);
    const [isFilter, setIsFilter] = useState(false);

    const fetchData = async () => {
        try {
            const response = await api.get("/post", {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            setData(response.data);
            setBackup(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMatkul = async () => {
        try {
            const response = await api.get("/matkul", {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            setMatkul(response.data);
        } catch (error) {
           toast.error("Error occurred", {
                description: error.response?.data?.message ? error.response.data.message : "Something went wrong",
            });
        }
    };

    const filterData = (nama) => {
        if (nama === null) {
            fetchData();
        } else {
            setData(backup.filter(item => 
                item.jadwal.some(jadwalItem => 
                    jadwalItem.jadwal.mataKuliah.nama.toLowerCase() === nama
                )
            ));
        }
        setOpen(false);
        setIsFilter(true);
    }

    useEffect(() => {
        document.title = "Post"
        if (user.accessToken) {
            fetchData();
            fetchMatkul();
        }
    },[user.accessToken]); 

    console.log(data.filter(item => 
        item.jadwal.some(jadwalItem => 
            jadwalItem.jadwal.mataKuliah.nama === "Grafika Komputer dan Visualisasi"
        )
    ), "prepept")

    return (
        <Layout >
            { data.length || isFilter ?            
            <div className="flex justify-end">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="justify-center"
                        >
                            <Search />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-64">
                        <Command>
                            <CommandInput placeholder="Search Matkul..." />
                            <CommandEmpty>No Matkul Found.</CommandEmpty>
                            <CommandGroup>
                                <CommandList>
                                    <CommandItem
                                        onSelect={() => filterData(null)}
                                    >
                                        Semua Mata Kuliah
                                    </CommandItem>
                                    {   
                                        Matkul.map((item) => (
                                            <CommandItem
                                                key={item.id}
                                                value={item.nama}
                                                onSelect={(currentFilter) => {
                                                    filterData(currentFilter, backup);
                                                }
                                            }
                                            >
                                                {item.nama}
                                            </CommandItem>
                                        ))
                                    }
                                </CommandList>
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div> : null
            }
            {
                data.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data.map((item, index) => (
                            <PostCard key={index} data={item}/>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <h1 className="text-lg font-semibold">No Post</h1>
                    </div>
                )
            }
            <div className="flex justify-center px-20">
                <FormPost>
                    <Button> Add Post </Button>
                </FormPost>
            </div>
            <Toaster
                toastOptions={{
                    unstyled: false,
                    classNames: {
                    error: 'bg-red-400',
                    success: 'text-green-400',
                    warning: 'text-yellow-400',
                    info: 'bg-blue-400',
                    },
                }}
            />
        </Layout>
    )
}