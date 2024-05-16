import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
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
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  } from "@/components/ui/select"
import { AddJadwalButton } from "./AddJadwalButton"
import api from "../api/axios";
import { useAuth } from "@/components/AuthProvider";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Label } from "@/components/ui/label"

const jadwalSchema = z.object({
  ruangan: z.string().min(1, { message: "Ruangan is required"}),
  hari: z.string().refine((val) => ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].includes(val), {
    message: 'Invalid day (Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, Minggu)',
  }),
  jam: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: 'Invalid time format (HH:mm)',
  }),
});

export const columns = [
  {
    accessorKey: "ruangan",
    header: "Ruangan kelas",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("ruangan")}</div>
    ),
  },
  {
    accessorKey: "hari",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hari
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("hari")}</div>,
  },
  {
    accessorKey: "jam",
    header: "Jam",
    cell: ({ row }) => <div className="lowercase">{row.getValue("jam")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const jadwal = row.original
      const [user] = useAuth();
      const navigate = useNavigate();
      const [edit, setEdit] = useState(false);

      const deleteJadwal = async () => {
        try {
          await api.delete(`/jadwal-matkul/${jadwal.id}`, {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          
          })
          toast.success("Jadwal deleted successfully");
          setTimeout(() => {
            navigate(0);
          }, 500);
        } catch (error) {
          toast.error("Error occured", {
            description: error.response?.data?.message ? error.response.data.message : "Something went wrong",
          });
          console.log(error);
        }
      }

      const updateJadwal = async (data) => {
        try {
            const response = await api.patch(`/jadwal-matkul/${jadwal.id}`, data, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });
            setEdit(true);
            toast.success(response.data.message);
        } catch (error) {
            toast.error("Error occured", {
                description: error.response?.data?.message ? error.response.data.message : "Something went wrong",
              });
        }
    }

      const defaultValues = {
        ruangan: jadwal.ruangan,
        hari: jadwal.hari,
        jam: jadwal.jam,
    }

    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm({
        resolver: zodResolver(jadwalSchema),
        defaultValues,
    });

      return (
        <Dialog onOpenChange={
          () => {
              if (edit){
              navigate(0);
              }
              setEdit(false);
          }
      }>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(jadwal.id)}
            >
              Copy jadwal ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
            <DropdownMenuItem >
              <p>Edit</p>
            </DropdownMenuItem>
          </DialogTrigger>
            <DropdownMenuItem onClick={deleteJadwal}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
              <DialogTitle>Edit Jadwal Mata Kuliah</DialogTitle>
              <DialogDescription>
                  Edist jadwal mata kuliah
              </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(updateJadwal)}>
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
                          {isSubmitting ? "Loading..." : "Edit Jadwal"}
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
    },
  },
]

export function DataTable({data}) {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] =
    React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
        <div className="flex items-center py-4">
            <Input
            placeholder="Filter ruangan..."
            value={(table.getColumn("ruangan")?.getFilterValue()) ?? ""}
            onChange={(event) =>
                table.getColumn("ruangan")?.setFilterValue(event.target.value)
            }
            className="max-w-sm mr-4" 
            />
            <Input
            placeholder="Filter hari..."
            value={(table.getColumn("hari")?.getFilterValue()) ?? ""}
            onChange={(event) =>
                table.getColumn("hari")?.setFilterValue(event.target.value)
            }
            className="max-w-sm mr-4" 
            />
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                    return (
                    <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                        }
                    >
                        {column.id}
                    </DropdownMenuCheckboxItem>
                    )
                })}
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell 
                        key={cell.id}
                        className="text-center"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    <div className="flex items-center justify-between py-4">
        <AddJadwalButton />
        <div className="flex space-x-2">
            <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            >
            Previous
            </Button>
            <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            >
            Next
            </Button>
        </div>
    </div>
    </div>
  )
}
