import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "../api/axios";
import { useAuth } from "@/components/AuthProvider";


export function AddJadwalButton() {


    return (
        <Dialog>
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
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ruangan" className="text-right">
                Ruangan
                </Label>
                <Input
                id="ruangan"
                defaultValue="Pedro Duarte"
                className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hari" className="text-right">
                Hari
                </Label>
                <Input
                id="hari"
                defaultValue="@peduarte"
                className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="jam" className="text-right">
                Jam
                </Label>
                <Input
                id="jam"
                defaultValue="@peduarte"
                className="col-span-3"
                />
            </div>
            </div>
            <DialogFooter>
                <Button type="submit">Add Jadwal</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}
