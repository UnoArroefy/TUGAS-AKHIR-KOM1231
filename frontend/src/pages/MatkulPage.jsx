import { Button } from '@/components/ui/button';
import { Layout } from '@/components/ui/layout';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import MatkulCard from '@/components/MatkulCard';
import api from "../api/axios";
import { FormMatkul } from '@/components/FormMatkul';
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

export const MatkulPage = () => {
    const [user] = useAuth();
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [Matkul, setMatkul] = useState([]);

    const fetchData = async () => {
        try {
            const response = await api.get("/matkul", {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            setData(response.data);
            setMatkul(response.data);
        } catch (error) {
           toast.error("Error occurred", {
                description: error.response?.data?.message ? error.response.data.message : "Something went wrong",
            });
        }
    };

    const filterData = (id) => {
        if (id === null) {
            setData(Matkul);
        } else {
            setData(Matkul.filter((item) => item.id === id));
        }
        setOpen(false);
    }

    useEffect(() => {
        document.title = "Mata Kuliah";
        if (user.accessToken) {
            fetchData();
        }
    }, [user]);

    return (
        <Layout>
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
                                                value={item.id}
                                                onSelect={(currentFilter) => {
                                                    filterData(currentFilter)
                                                }}
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
            </div>
            {data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data.map((item, index) => (
                        <MatkulCard key={index} data={item} />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center">
                    <h1 className="text-lg font-semibold">No Mata Kuliah</h1>
                </div>
            )}
            <div className="flex justify-center px-20">
                <FormMatkul>
                    <Button> Add Mata Kuliah </Button>
                </FormMatkul>
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
    );
};
