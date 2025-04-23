import { useAdmin, useGetAllUsers } from "@/hooks/useAdmin";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/Pagination";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import AdminError from "@/components/Admin/AdminError";

//Constant
const LIMIT = 10;

const UserManagement = () => {
  const [page, setPage] = useState(1);
  const [role, setRole] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler); 
    };
  }, [search]);

  //data fetching
  const { data, isError, isLoading, refetch } = useGetAllUsers({ page, limit: LIMIT, search: debouncedSearch, role});

  //Mutation hook
  const {ToggleBlockUser} = useAdmin()
  const { mutateAsync } = ToggleBlockUser 

  //Extracted Data
  const users = data?.Users || [];
  const totalPages = data?.totalPages || 1;

  //Handles block/unblock 
  const handleToggleBlock = async (id: string) => {
    try {
     const res =  await mutateAsync(id);
     if(res.success){
      toast.success(`${res.user.isBlocked ? `${res.user.name} has been blocked` : `${res.user.name} has been unblocked`} `)
     }
    } catch (error) {
      console.error("Error toggling user block status", error);
    }
  };

  //Handles Search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  //Handles role change
  const handleRoleChange = (val: string) => {
    setRole(val);
    setPage(1);
  };


  //UI rendering
  if (isLoading) return <Loading />;
  if (isError) return <AdminError message="Failed to load users." retry={refetch} />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="p-6 shadow rounded-2xl bg-white">
        {/*Card Header */}
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            User Management
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage user roles, permissions, and status.
          </p>

          <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <Input
              placeholder="🔍 Search by name or email"
              value={search}
              onChange={handleSearch}
              className="w-full sm:w-3/4 md:w-1/2 lg:w-[400px] xl:w-[350px]"
            />

            <Select value={role} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="volunteer">Volunteer</SelectItem>
                <SelectItem value="donor">Donor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        {/*Card Content - table/select - whatever you want you can use inside card content i guess */}
        <CardContent className="overflow-x-auto">
          <Table>
            <TableCaption>A list of all registered users.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user: any) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 capitalize">
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={user.isBlocked ? "secondary" : "destructive"}
                      size="sm"
                      onClick={() => handleToggleBlock(user._id)}

                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-gray-500 py-6"
                  >
                    No users found.
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
  );
};

export default UserManagement;
