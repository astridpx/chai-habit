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
import { MoreHorizontalIcon, Funnel } from 'lucide-react'
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
import { Badge, badgeVariants } from '@/Components/ui/badge'
import { VariantProps } from 'class-variance-authority'
import { Separator } from '@/Components/ui/separator'
import { Button } from '@/Components/ui/button'
import { Checkbox } from '@/Components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select'
import AppDatePicker from '@/Components/AppDatePicker'
import { useState } from 'react'
import { Toggle } from '@/Components/ui/toggle'
import { format } from 'date-fns'

export default function Orders({ orders }: { orders: Pagination<Order> }) {
  const [showActions, setshowActions] = useState(false)

  // count total items in an order by summing up the quantity of each order item
  function countItems(orderItems: OrderItem[]) {
    const count = orderItems.reduce((total, item) => total + item.quantity, 0)
    return count
  }

  // calculate total price of an order by summing up the total_price of each order item
  function calculateTotal(orderItems: OrderItem[]) {
    const total = orderItems.reduce((sum, item) => sum + item.total_price, 0)
    return total
  }

  const statusVariant: Record<string, VariantProps<typeof badgeVariants>['variant']> = {
    pending: 'warning',
    completed: 'success',
    cancelled: 'failed',
  }
  return (
    <AuthenticatedLayout>
      <Head title="Recent Orders" />

      <div className="flex justify-between">
        <h1 className="mb-6 text-3xl font-semibold text-neutral-600"> Recent Orders</h1>

        <div>
          <Toggle
            aria-label="Filter"
            size="sm"
            variant="outline"
            onPressedChange={(pressed) => setshowActions(pressed)}
          >
            <Funnel className="group-data-[state=on]/toggle:fill-foreground" />
            Bulk Actions
          </Toggle>
        </div>
      </div>

      <div className="">
        {showActions && (
          <div className="mb-12 space-y-4">
            <div className="flex gap-4">
              <Button variant="warning" className="flex-1">
                Processing
              </Button>
              <Button variant="success" className="flex-1">
                Completed
              </Button>
              <Button variant="destructive" className="flex-1">
                Cancelled
              </Button>
            </div>
          </div>
        )}

        <Table>
          <TableCaption>A list of your recent orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox />
              </TableHead>

              <TableHead>Order ID</TableHead>
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
            {orders.data?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>

                <TableCell>
                  <a href={`/orders/${order.id}`} className="hover:text-primary hover:underline">
                    {order.order_id}
                  </a>
                </TableCell>
                <TableCell>
                  <a href="#" className="hover:text-primary hover:underline">
                    {order.customer.fullname}
                  </a>
                </TableCell>
                <TableCell>{countItems(order.order_items)}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[order.status]}>{order.status}</Badge>
                </TableCell>
                {/* <TableCell>{order.paid}</TableCell> */}
                <TableCell>₱ {calculateTotal(order.order_items).toFixed(2)}</TableCell>
                <TableCell>{format(new Date(order.created_at), 'MMMM dd, yyyy hh:mm a')}</TableCell>
                <TableCell>{order.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AuthenticatedLayout>
  )
}
