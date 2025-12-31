import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui/table'
import { Input } from '@/Components/ui/input'
import { MoreHorizontalIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu'
import { Badge } from '@/Components/ui/badge'
import { Separator } from '@/Components/ui/separator'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select'
import AppDatePicker from '@/Components/AppDatePicker'

const invoices = [
  {
    invoice: 'INV-1001',
    customer: 'Liam Henderson',
    item: 8,
    status: 'Pending',
    paid: 'Unpaid',
    total: 129.99,
    date: '2024-01-04',
    note: 'Deliver to side gate',
  },
  {
    invoice: 'INV-1002',
    customer: 'Sarah Jenkins',
    item: 7,
    status: 'Processing',
    paid: 'Paid',
    total: 45.5,
    date: '2024-01-04',
    note: 'Fragile',
  },
  {
    invoice: 'INV-1003',
    customer: 'Marcus Chen',
    item: 1,
    status: 'Shipped',
    paid: 'Paid',
    total: 399.0,
    date: '2024-01-03',
    note: '',
  },
  {
    invoice: 'INV-1004',
    customer: 'Emma Wilson',
    item: 2,
    status: 'Completed',
    paid: 'Paid',
    total: 250.0,
    date: '2024-01-02',
    note: 'Birthday gift',
  },
  {
    invoice: 'INV-1005',
    customer: 'James Rodriguez',
    item: 4,
    status: 'Cancelled',
    paid: 'Refunded',
    total: 180.0,
    date: '2024-01-01',
    note: 'Customer changed mind',
  },
]

export default function Orders() {
  return (
    <AuthenticatedLayout>
      <Head title="Orders" />

      <h1 className="mb-6 text-3xl font-semibold text-neutral-600">Orders</h1>

      <div className="">
        <div className="mb-8 space-y-1">
          <div className="flex gap-2">
            <Input className=" bg-neutral-100" placeholder="Search by invoice" />
            <Input className=" bg-neutral-100" placeholder="Search by customer" />
            <Select>
              <SelectTrigger className="bg-neutral-100">
                <SelectValue placeholder="Search by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">pending</SelectItem>
                <SelectItem value="dark">processing</SelectItem>
                <SelectItem value="system">shipped</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4 items-center mb-4">
            <AppDatePicker
              attr="startDateFilter"
              placeholder="Start date"
              mainClass="flex-1"
              triggerClass="bg-neutral-100"
            />
            <span>to</span>
            <AppDatePicker
              attr="endDateFilter"
              placeholder="End date"
              mainClass="flex-1"
              triggerClass="bg-neutral-100"
            />
          </div>

          <div className="space-y-2">
            <Button className="w-full">Apply Filter</Button>
            <Button className="w-full" variant="destructive">
              Clear
            </Button>
          </div>
        </div>

        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Status</TableHead>
              {/* <TableHead>Paid</TableHead> */}
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell>
                  <a href="#" className="hover:text-primary hover:underline">
                    {invoice.invoice}
                  </a>
                </TableCell>
                <TableCell>
                  <a href="#" className="hover:text-primary hover:underline">
                    {invoice.customer}
                  </a>
                </TableCell>
                <TableCell>{invoice.item}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                {/* <TableCell>{invoice.paid}</TableCell> */}
                <TableCell>{invoice.total}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AuthenticatedLayout>
  )
}
