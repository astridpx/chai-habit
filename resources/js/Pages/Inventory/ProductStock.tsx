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
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'
import { Button } from '@/Components/ui/button'
import { Plus } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
]

export default function ProductStock() {
  return (
    <AuthenticatedLayout>
      <Head title="Available Products" />

      <h1 className="mb-6 text-3xl font-semibold text-neutral-600">Available Products</h1>

      {/* floating button (restock btn link) */}
      <a href={route('inventory.products.stock.add')}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="fixed z-10 rounded-full shadow bottom-8 right-8 ">
              <Plus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Restock a product</p>
          </TooltipContent>
        </Tooltip>
      </a>

      <div className="">
        <div className="mb-6 ">
          <Input className=" bg-neutral-100" placeholder="Search..." />
        </div>

        <Table className="">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>In Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="flex items-center gap-2 ">
                  <Avatar className="w-7 h-7">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <span>{invoice.invoice}</span>
                </TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell>{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AuthenticatedLayout>
  )
}
