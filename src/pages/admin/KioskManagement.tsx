import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";
import { useGetKiosks } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";
import AdminError from "@/components/Admin/AdminError";

//constant
const LIMIT = 10;

const KioskManagement = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler); 
    };
  }, [search]);

  const {data,isError,isLoading,refetch} = useGetKiosks({page,limit:LIMIT,search: debouncedSearch,})


  const kiosks = data?.kiosks || [];
  const totalPages = data?.totalPages || 1;


   
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleAddKiosk =  () => {
    navigate(`/admin/addkiosk`)
  }


  const handleEditKiosk = (id: string) => {
     navigate(`/admin/editkiosk/${id}`)
  }

  
  
    if (isLoading) return <Loading />;
    if (isError) return <AdminError message="Fetching Kiosk" retry={refetch} />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <Card className="p-6 shadow rounded-2xl bg-white font-tertiary">
    {/*Card Header */}
    <CardHeader>
      <CardTitle className="text-2xl font-semibold font-primary">
        Kiosk Management
      </CardTitle>
      <p className="text-sm text-muted-foreground">
        Manage kiosks
      </p>

      <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <Input
          placeholder="🔍 Search by kiosk name"
          value={search}
          onChange={handleSearch}
          className="w-full sm:w-3/4 md:w-1/2 lg:w-[400px] xl:w-[350px]"
        />
      <Button onClick={handleAddKiosk} variant="secondary">Add Kiosk</Button>
      </div>

   
    </CardHeader>

    {/*Card Content */}
    <CardContent className="overflow-x-auto">
      <Table>
        <TableCaption>A list of all registered kiosks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead >Edit</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {kiosks.map((kiosk: any) => (
            <TableRow key={kiosk._id}>
              <TableCell className="font-medium">{kiosk.name}</TableCell>
              <TableCell > {kiosk.location.address.length > 30 ? `${kiosk.location.address.slice(0, 30)}...` : kiosk.location.address}</TableCell>
             
              <TableCell className="">
              
                  <Button onClick={() => handleEditKiosk(kiosk._id)} variant="secondary" size="sm">
                    Edit
                  </Button>
              
              </TableCell>
            </TableRow>
          ))}
          {kiosks.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-gray-500 py-6"
              >
                No Kiosk found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/*Pagination */}
      {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
     
    </CardContent>
  </Card>
  </div>
  )
}

export default KioskManagement