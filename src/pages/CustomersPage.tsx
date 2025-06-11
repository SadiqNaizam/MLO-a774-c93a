import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, Mail, Phone, MapPin } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  joinedDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  address?: string;
}

const initialCustomers: Customer[] = [
  { id: "CUST001", name: "Alice Wonderland", email: "alice@example.com", phone: "555-0101", avatarUrl: "https://source.unsplash.com/random/40x40?face&sig=10", joinedDate: "2023-01-15", totalOrders: 5, totalSpent: 450.75, lastOrderDate: "2023-10-20", address: "123 Fantasy Lane, Dream City" },
  { id: "CUST002", name: "Bob The Builder", email: "bob@example.com", phone: "555-0102", avatarUrl: "https://source.unsplash.com/random/40x40?face&sig=11", joinedDate: "2022-11-20", totalOrders: 12, totalSpent: 1250.00, lastOrderDate: "2023-10-15", address: "456 Construction Rd, Tool Town" },
  { id: "CUST003", name: "Charlie Chaplin", email: "charlie@example.com", phone: "555-0103", avatarUrl: "https://source.unsplash.com/random/40x40?face&sig=12", joinedDate: "2023-05-10", totalOrders: 2, totalSpent: 80.20, lastOrderDate: "2023-09-01", address: "789 Comedy Ave, Silent Film City" },
  { id: "CUST004", name: "Diana Prince", email: "diana@example.com", phone: "555-0104", avatarUrl: "https://source.unsplash.com/random/40x40?face&sig=13", joinedDate: "2021-07-01", totalOrders: 25, totalSpent: 3500.50, lastOrderDate: "2023-10-25", address: "1 Justice Way, Themyscira" },
];

const CustomersPage = () => {
  console.log('CustomersPage loaded');
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailModalOpen(true);
  };

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header userName="Customer Management" />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Customers</CardTitle>
              <CardDescription>View and manage your customer base.</CardDescription>
              <div className="flex items-center gap-2 pt-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search customers by name or email..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {/* Add Customer button can be placed here if needed */}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden md:table-cell">Joined</TableHead>
                    <TableHead className="hidden sm:table-cell">Total Orders</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                            <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{customer.name}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{customer.email}</TableCell>
                      <TableCell className="hidden md:table-cell">{customer.joinedDate}</TableCell>
                      <TableCell className="hidden sm:table-cell text-center">{customer.totalOrders}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(customer)}>
                          <Eye className="h-4 w-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {paginatedCustomers.length === 0 && <p className="text-center py-4 text-muted-foreground">No customers found.</p>}
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>{(currentPage-1)*itemsPerPage + 1}-{Math.min(currentPage*itemsPerPage, filteredCustomers.length)}</strong> of <strong>{filteredCustomers.length}</strong> customers
                </div>
                {totalPages > 1 && (
                    <Pagination className="ml-auto">
                    <PaginationContent>
                        <PaginationItem><PaginationPrevious href="#" onClick={(e) => {e.preventDefault(); setCurrentPage(p => Math.max(1, p-1))}} /></PaginationItem>
                        {[...Array(totalPages)].map((_, i) => (
                            <PaginationItem key={i}><PaginationLink href="#" isActive={currentPage === i+1} onClick={(e) => {e.preventDefault(); setCurrentPage(i+1)}}>{i+1}</PaginationLink></PaginationItem>
                        ))}
                        <PaginationItem><PaginationNext href="#" onClick={(e) => {e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p+1))}} /></PaginationItem>
                    </PaginationContent>
                    </Pagination>
                )}
            </CardFooter>
          </Card>
        </main>
      </div>

      {selectedCustomer && (
        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                 <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedCustomer.avatarUrl} alt={selectedCustomer.name} />
                    <AvatarFallback>{selectedCustomer.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                </Avatar>
                {selectedCustomer.name}
              </DialogTitle>
              <DialogDescription>Customer since {selectedCustomer.joinedDate}</DialogDescription>
            </DialogHeader>
            <Card className="my-4">
                <CardContent className="pt-6 space-y-3">
                    <div className="flex items-center"><Mail className="h-4 w-4 mr-2 text-muted-foreground" /> {selectedCustomer.email}</div>
                    <div className="flex items-center"><Phone className="h-4 w-4 mr-2 text-muted-foreground" /> {selectedCustomer.phone}</div>
                    {selectedCustomer.address && <div className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-muted-foreground" /> {selectedCustomer.address}</div>}
                    <p><strong>Total Orders:</strong> {selectedCustomer.totalOrders}</p>
                    <p><strong>Total Spent:</strong> ${selectedCustomer.totalSpent.toFixed(2)}</p>
                    {selectedCustomer.lastOrderDate && <p><strong>Last Order:</strong> {selectedCustomer.lastOrderDate}</p>}
                </CardContent>
            </Card>
            {/* Placeholder for order history or other details */}
            {/* <Card>
                <CardHeader><CardTitle>Order History</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">Order history would be displayed here.</p></CardContent>
            </Card> */}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CustomersPage;