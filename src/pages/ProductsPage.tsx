import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; // Assuming Dialog for viewing, Sheet for editing
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FilePlus, ListFilter, MoreHorizontal, Search, Edit, Trash2 } from 'lucide-react';
// No direct Form component from shadcn listed as top-level, but Label, Input, etc. are used to build forms.
// react-hook-form could be used if complex validation is needed, but for placeholders, direct state is fine.

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "Published" | "Draft";
  imageUrl: string;
  description?: string;
}

const initialProducts: Product[] = [
  { id: "PROD001", name: "Organic Cotton T-Shirt", category: "Apparel", price: 25.99, stock: 150, status: "Published", imageUrl: "https://source.unsplash.com/random/80x80?tshirt&sig=1" },
  { id: "PROD002", name: "Wireless Bluetooth Headphones", category: "Electronics", price: 79.50, stock: 80, status: "Published", imageUrl: "https://source.unsplash.com/random/80x80?headphones&sig=2" },
  { id: "PROD003", name: "Reusable Coffee Mug", category: "Home Goods", price: 15.00, stock: 200, status: "Draft", imageUrl: "https://source.unsplash.com/random/80x80?mug&sig=3" },
  { id: "PROD004", name: "Leather Laptop Sleeve", category: "Accessories", price: 45.00, stock: 50, status: "Published", imageUrl: "https://source.unsplash.com/random/80x80?laptop-sleeve&sig=4" },
];

const ProductsPage = () => {
  console.log('ProductsPage loaded');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null); // Partial for new product

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditProduct = (product?: Product) => {
    setEditingProduct(product || { name: "", category: "", price: 0, stock: 0, status: "Draft", imageUrl: ""});
    setIsSheetOpen(true);
  };

  const handleSaveProduct = () => {
    // Add validation and API call logic here
    if (editingProduct) {
        if (editingProduct.id) { // Existing product
            setProducts(products.map(p => p.id === editingProduct!.id ? editingProduct as Product : p));
        } else { // New product
            const newProduct: Product = { ...editingProduct, id: `PROD${Date.now()}` } as Product;
            setProducts([...products, newProduct]);
        }
    }
    setIsSheetOpen(false);
    setEditingProduct(null);
  };
  
  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header userName="Product Catalog" />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage your product inventory and details.</CardDescription>
              <div className="flex items-center gap-2 pt-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search products by name, category..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                 {/* Filter button can be added here if needed */}
                <Button size="sm" className="h-10 gap-1 ml-auto" onClick={() => handleEditProduct()}>
                  <FilePlus className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Price</TableHead>
                    <TableHead className="hidden md:table-cell">Stock</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="hidden sm:table-cell">
                        <Avatar className="h-12 w-12 rounded-md">
                          <AvatarImage src={product.imageUrl || "https://via.placeholder.com/80"} alt={product.name} />
                          <AvatarFallback>{product.name.substring(0,2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <Badge variant={product.status === "Published" ? "default" : "secondary"}>
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">${product.price.toFixed(2)}</TableCell>
                      <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        {/* Delete button can be added here with a confirmation dialog */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {paginatedProducts.length === 0 && <p className="text-center py-4 text-muted-foreground">No products found.</p>}
            </CardContent>
             <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>{(currentPage-1)*itemsPerPage + 1}-{Math.min(currentPage*itemsPerPage, filteredProducts.length)}</strong> of <strong>{filteredProducts.length}</strong> products
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

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-lg w-[90vw] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingProduct?.id ? 'Edit Product' : 'Add New Product'}</SheetTitle>
            <SheetDescription>
              {editingProduct?.id ? `Update details for ${editingProduct.name}.` : 'Fill in the details for the new product.'}
            </SheetDescription>
          </SheetHeader>
          {editingProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea id="description" value={editingProduct.description || ""} onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Input id="category" value={editingProduct.category} onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">Price ($)</Label>
                <Input id="price" type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">Stock</Label>
                <Input id="stock" type="number" value={editingProduct.stock} onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right">Image URL</Label>
                <Input id="imageUrl" value={editingProduct.imageUrl} onChange={(e) => setEditingProduct({...editingProduct, imageUrl: e.target.value})} className="col-span-3" />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                 <div className="col-span-3 flex items-center space-x-2">
                    <Switch 
                        id="status" 
                        checked={editingProduct.status === "Published"} 
                        onCheckedChange={(checked) => setEditingProduct({...editingProduct, status: checked ? "Published" : "Draft"})}
                    />
                    <span>{editingProduct.status}</span>
                 </div>
              </div>
            </div>
          )}
          <SheetFooter>
            <SheetClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </SheetClose>
            <Button type="submit" onClick={handleSaveProduct}>Save Product</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProductsPage;