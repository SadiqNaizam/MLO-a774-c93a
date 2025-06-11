import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FilePlus, ListFilter, MoreHorizontal, Search, Truck } from 'lucide-react';

type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: { name: string; quantity: number }[];
  shippingAddress: string;
}

const initialOrders: Order[] = [
  { id: "ORD001", customerName: "Liam Johnson", customerEmail: "liam@example.com", date: "2023-10-26", status: "Delivered", total: 150.00, items: [{name: "T-Shirt", quantity: 2}], shippingAddress: "123 Main St, Anytown, USA" },
  { id: "ORD002", customerName: "Olivia Smith", customerEmail: "olivia@example.com", date: "2023-10-25", status: "Shipped", total: 200.50, items: [{name: "Hoodie", quantity: 1}], shippingAddress: "456 Oak Ave, Anytown, USA" },
  { id: "ORD003", customerName: "Noah Williams", customerEmail: "noah@example.com", date: "2023-10-24", status: "Processing", total: 75.20, items: [{name: "Cap", quantity: 3}], shippingAddress: "789 Pine Rd, Anytown, USA" },
  { id: "ORD004", customerName: "Emma Brown", customerEmail: "emma@example.com", date: "2023-10-23", status: "Pending", total: 300.00, items: [{name: "Jacket", quantity: 1}], shippingAddress: "101 Elm St, Anytown, USA" },
  { id: "ORD005", customerName: "Ava Jones", customerEmail: "ava@example.com", date: "2023-10-22", status: "Cancelled", total: 50.75, items: [{name: "Socks", quantity: 5}], shippingAddress: "202 Maple Dr, Anytown, USA" },
];

const getStatusVariant = (status: OrderStatus) => {
  switch (status) {
    case "Delivered": return "default"; // Green in shadcn is 'default' for badge success
    case "Shipped": return "secondary"; // Blue-ish
    case "Processing": return "outline"; // Yellow-ish/Orange-ish if text-yellow-600 border-yellow-300 defined, else default outline
    case "Pending": return "destructive"; // Red-ish
    case "Cancelled": return "outline"; // Gray
    default: return "secondary";
  }
};


const OrdersPage = () => {
  console.log('OrdersPage loaded');
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>("Pending");

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setCurrentStatus(order.status);
    setIsDialogOpen(true);
  };

  const handleStatusUpdate = () => {
    if (selectedOrder) {
      setOrders(prevOrders => prevOrders.map(o => o.id === selectedOrder.id ? {...o, status: currentStatus} : o));
      setIsDialogOpen(false);
      setSelectedOrder(null);
      // Here you would typically make an API call to update the status
      console.log(`Order ${selectedOrder.id} status updated to ${currentStatus}`);
    }
  };


  // Pagination logic (basic example)
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header userName="Orders Management" />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>Manage and track all customer orders.</CardDescription>
              <div className="flex items-center gap-2 pt-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search orders by ID, customer..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-10 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map(status => (
                      <DropdownMenuItem key={status} onSelect={() => console.log(`Filter by ${status}`)}>
                        {status}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" className="h-10 gap-1">
                  <FilePlus className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Order</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(order)}>View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {paginatedOrders.length === 0 && <p className="text-center py-4 text-muted-foreground">No orders found.</p>}
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>{(currentPage-1)*ordersPerPage + 1}-{Math.min(currentPage*ordersPerPage, filteredOrders.length)}</strong> of <strong>{filteredOrders.length}</strong> orders
              </div>
              {totalPages > 1 && (
                <Pagination className="ml-auto">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" onClick={(e) => {e.preventDefault(); setCurrentPage(p => Math.max(1, p-1))}} />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                         <PaginationItem key={i}>
                         <PaginationLink href="#" isActive={currentPage === i+1} onClick={(e) => {e.preventDefault(); setCurrentPage(i+1)}}>
                           {i+1}
                         </PaginationLink>
                       </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext href="#" onClick={(e) => {e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p+1))}}/>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </CardFooter>
          </Card>
        </main>
      </div>

      {selectedOrder && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Order Details: {selectedOrder.id}</DialogTitle>
              <DialogDescription>
                Customer: {selectedOrder.customerName} ({selectedOrder.customerEmail})
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <p><strong>Date:</strong> {selectedOrder.date}</p>
              <p><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
              <p><strong>Shipping Address:</strong> {selectedOrder.shippingAddress}</p>
              <div><strong>Items:</strong>
                <ul className="list-disc pl-5">
                  {selectedOrder.items.map(item => <li key={item.name}>{item.name} (Qty: {item.quantity})</li>)}
                </ul>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Order Status</Label>
                <Select value={currentStatus} onValueChange={(value: OrderStatus) => setCurrentStatus(value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
              <Button type="button" onClick={handleStatusUpdate}>Update Status</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default OrdersPage;