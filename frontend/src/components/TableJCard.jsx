import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table" 
  
  export function TableJ({data}) {
    return (
      <Table>
        <TableCaption>A list of your recent jadwal.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Ruangan</TableHead>
            <TableHead>Hari</TableHead>
            <TableHead className="text-right">Jam</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.ruangan}</TableCell>
              <TableCell>{item.hari}</TableCell>
              <TableCell className="text-right">{item.jam}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  