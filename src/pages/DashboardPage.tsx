import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import KPICard from '@/components/KPICard';
import RecentActivityFeedItem from '@/components/RecentActivityFeedItem';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart as ReLineChart, ResponsiveContainer } from 'recharts';

import { DollarSign, Users, CreditCard, Activity, PackageSearch, ShoppingCart, ListFilter, MoreHorizontal } from 'lucide-react';

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

const recentActivities = [
    { actorName: "Olivia Martin", actorAvatarUrl: "https://source.unsplash.com/random/40x40?face&sig=1", actionDescription: "placed a new order #ORD001 for $250.00", timestamp: "5m ago", icon: ShoppingCart },
    { actorName: "Jackson Lee", actorAvatarUrl: "https://source.unsplash.com/random/40x40?face&sig=2", actionDescription: "updated customer profile", timestamp: "10m ago", icon: Users },
    { actorName: "Isabella Nguyen", actorAvatarUrl: "https://source.unsplash.com/random/40x40?face&sig=3", actionDescription: "added a new product 'Wireless Headphones'", timestamp: "1h ago", icon: PackageSearch },
    { actionDescription: "System processed 5 recurring subscriptions", timestamp: "2h ago", icon: Activity },
];

const recentOrders = [
    { id: "ORD001", customer: "Olivia Martin", avatar: "https://source.unsplash.com/random/40x40?face&sig=4", email: "olivia@example.com", type: "Sale", status: "Fulfilled", date: "2023-06-23", amount: "$250.00" },
    { id: "ORD002", customer: "Jackson Lee", avatar: "https://source.unsplash.com/random/40x40?face&sig=5", email: "jackson@example.com", type: "Subscription", status: "Pending", date: "2023-06-24", amount: "$150.00" },
    { id: "ORD003", customer: "Isabella Nguyen", avatar: "https://source.unsplash.com/random/40x40?face&sig=6", email: "isabella@example.com", type: "Sale", status: "Shipped", date: "2023-06-25", amount: "$350.00" },
];


const DashboardPage = () => {
  console.log('DashboardPage loaded');
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header userName="Admin Dashboard" userAvatarUrl="https://source.unsplash.com/random/40x40?face&sig=0" />
        
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <KPICard
                title="Total Revenue"
                value="$45,231.89"
                description="+20.1% from last month"
                icon={DollarSign}
                trend="up"
                trendValue="+20.1%"
              />
              <KPICard
                title="Subscriptions"
                value="+2350"
                description="+180.1% from last month"
                icon={Users}
                trend="up"
                trendValue="+180.1%"
              />
              <KPICard
                title="Sales"
                value="+12,234"
                description="+19% from last month"
                icon={CreditCard}
                trend="up"
                trendValue="+19%"
              />
              <KPICard
                title="Active Now"
                value="573"
                description="+201 since last hour"
                icon={Activity}
                trend="up"
                trendValue="+201"
              />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Sales Trends (Last 6 Months)</CardTitle>
                <CardDescription>Showing sales data for desktop and mobile.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                  <ReLineChart data={chartData} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                    <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
                    <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
                    <ChartLegend content={<ChartLegendContent />} />
                  </ReLineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="px-7">
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>An overview of the latest orders.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden sm:table-cell">Type</TableHead>
                      <TableHead className="hidden sm:table-cell">Status</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.slice(0,3).map(order => (
                        <TableRow key={order.id}>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Avatar className="hidden h-8 w-8 sm:flex">
                                        <AvatarImage src={order.avatar} alt={order.customer} />
                                        <AvatarFallback>{order.customer.substring(0,2)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{order.customer}</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">{order.email}</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{order.type}</TableCell>
                            <TableCell className="hidden sm:table-cell">{order.status}</TableCell>
                            <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                            <TableCell className="text-right">{order.amount}</TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <RecentActivityFeedItem
                        key={index}
                        actorName={activity.actorName}
                        actorAvatarUrl={activity.actorAvatarUrl}
                        actionDescription={activity.actionDescription}
                        timestamp={activity.timestamp}
                        icon={activity.icon}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Quick Navigation</CardTitle>
                </CardHeader>
                <CardContent>
                     <NavigationMenu orientation="vertical" className="w-full">
                        <NavigationMenuList className="flex flex-col space-y-1 w-full">
                            <NavigationMenuItem className="w-full">
                                <NavigationMenuLink href="/orders" className={cn(navigationMenuTriggerStyle(), "w-full justify-start")}>
                                    <ShoppingCart className="mr-2 h-4 w-4" /> View All Orders
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem className="w-full">
                                <NavigationMenuLink href="/products" className={cn(navigationMenuTriggerStyle(), "w-full justify-start")}>
                                   <PackageSearch className="mr-2 h-4 w-4" /> Manage Products
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem className="w-full">
                                <NavigationMenuLink href="/customers" className={cn(navigationMenuTriggerStyle(), "w-full justify-start")}>
                                    <Users className="mr-2 h-4 w-4" /> Customer List
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;

// Helper cn function if not globally available
// You might need to import this from "@/lib/utils" if it's set up there
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');