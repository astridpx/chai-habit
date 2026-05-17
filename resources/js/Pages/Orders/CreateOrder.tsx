import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, PageProps, router } from '@inertiajs/react'
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
import { MoreHorizontalIcon, Funnel, Plus, Trash, PackageOpen } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'
import { Badge } from '@/Components/ui/badge'
import { Separator } from '@/Components/ui/separator'
import { Button } from '@/Components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/Components/ui/dialog'
import { useEffect, useMemo, useState } from 'react'
import { Toggle } from '@/Components/ui/toggle'
import { Label } from '@/Components/ui/label'
import DatePicker from '@/Components/AppDatePicker'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/Components/ui/combobox'
import { Textarea } from '@/Components/ui/textarea'
import { Checkbox } from '@/Components/ui/checkbox'
import { debounce } from 'lodash'
import { useForm, usePage } from '@inertiajs/react'
import { custom } from 'zod'
import { is } from 'date-fns/locale'

interface ICreateOrderProps {
  customers: Pagination<Customer>
  customerFilters: { search?: string }
  products: Pagination<Product>
  productFilters: { name?: string }
}

export default function CreateOrder({
  customers,
  customerFilters,
  products,
  productFilters,
}: ICreateOrderProps) {
  const { flash } = usePage<PageProps>().props
  console.log(products)

  const [searchCustomer, setSearchCustomer] = useState(customerFilters?.search ?? '')
  const [searchProduct, setSearchProduct] = useState(productFilters?.name ?? '')
  const [selectedName, setSelectedName] = useState('')
  const [showAddItem, setShowAddItem] = useState(false)
  const { data, setData, post, processing, errors, reset } = useForm({
    customer_id: null,
    note: null,
    buying_method: 'walkin',
    is_paid: false,
  })

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        router.get(
          route('orders.create'),
          { search: value }, // query parameter for search
          {
            preserveState: true,
            replace: true,
          },
        )
      }, 300),
    [],
  )

  useEffect(() => {
    debouncedSearch(searchCustomer)

    // Cleanup the timer if the component unmounts mid-type
    return () => debouncedSearch.cancel()
  }, [searchCustomer, debouncedSearch])

  const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro']
  const items = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'System', value: 'system' },
  ]

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

  return (
    <AuthenticatedLayout>
      {/* ADD PRODUCT ITEM DIALOG */}
      <Dialog open={showAddItem} onOpenChange={setShowAddItem}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Order Item</DialogTitle>
            <DialogDescription>
              Search and select products to add them to this order.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <Input placeholder="Search products..." className="mb-4 shadow-sm border-2" />

            <div className="border rounded-md overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-muted">
                  <TableRow>
                    {/* <TableHead /> */}
                    <TableHead>Product</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>

                {
                  <TableBody>
                    {products?.data?.map((product) => (
                      <TableRow key={product.id}>
                        {/* <TableCell>
                          <Checkbox className="rounded" />
                        </TableCell> */}
                        <TableCell>{product.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">₱ {product.price.toFixed(2)}</Badge>
                        </TableCell>
                        <TableCell className="space-x-1">
                          <Button variant="secondary" className="border shadow-2xs">
                            -
                          </Button>
                          <Input
                            type="number"
                            className="max-w-20 rounded-sm outline-none focus-visible:ring-0"
                            defaultValue={1}
                          />
                          <Button variant="secondary" className="border shadow-2xs">
                            +
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" className="border shadow-2xs">
                            Add to Order
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                }
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Head title="Create Order" />

      <div className="flex justify-between">
        <h1 className="mb-7 text-3xl font-semibold text-neutral-600">Create Order</h1>
      </div>

      {/* Order Information */}
      <section className="lg:h-95 flex flex-col lg:flex-row items-stretch gap-5 border rounded-md p-5">
        <div className="flex-2 ">
          <h3 className="font-semibold text-lg mb-6">Order Information</h3>

          <div className="flex items-center gap-6 w-full mb-6">
            <div className="flex flex-col gap-3 flex-1">
              <Label htmlFor="orderNumber">Order Number</Label>
              <Input id="orderNumber" placeholder="Auto Generated" readOnly />
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <Label htmlFor="paymentStatus">Payment Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="true">Paid</SelectItem>
                    <SelectItem value="false">Unpaid</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-3 flex-1 mb-6">
            <Label htmlFor="customer">Customer</Label>
            <Combobox
              items={customers.data}
              onValueChange={(id) => {
                const found = customers.data.find((c) => c.id === id)
                if (found) {
                  // Inertia Form helper:
                  // form.setData('customer_id', found.id);
                  setSelectedName(found.fullname || '')
                  console.log('To be sent to server:', found.id)
                }
              }}
            >
              <ComboboxInput
                value={selectedName || searchCustomer}
                placeholder="Search and select a customer..."
                onChange={(e) => {
                  //  If they click back in and start typing, break the lock so they can search again
                  if (selectedName) setSelectedName('')
                  setSearchCustomer(e.target.value)
                }}
              />
              <ComboboxContent>
                <ComboboxEmpty>No person found.</ComboboxEmpty>
                <ComboboxList>
                  {(customer) => (
                    <ComboboxItem key={customer.id} value={customer.id}>
                      {customer.fullname}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              placeholder="Add any notes for this order..."
              className="min-h-20 resize-none"
            />
          </div>
        </div>

        <Separator orientation="vertical" className="hidden lg:block " />

        <div className="flex-1 text-sm">
          <h3 className="font-semibold text-lg mb-6 mt-4">Order Summary</h3>

          <div className="flex items-center justify-between mb-4">
            <p>Subtotal</p>
            <p>₱0.00</p>
          </div>

          <div className="flex items-center justify-between w-full mb-4">
            <div className="flex items-center justify-between  flex-2 pr-2">
              <p>Discount</p>
              <Input type="number" className="max-w-20 rounded-sm" placeholder="0.00" />
            </div>

            <p className="flex-1 text-right">₱0.00</p>
          </div>

          <Separator className="my-5" />

          <div className="flex items-center justify-between">
            <p className="font-semibold">Total</p>
            <p className="text-xl font-bold">₱0.00</p>
          </div>
        </div>
      </section>

      <section className="border rounded-md p-5 mt-4">
        <h3 className="font-semibold text-lg mb-6">Order Items</h3>

        <div className="flex justify-between items-center mb-4">
          <Input placeholder="Search products..." className="max-w-sm shadow-sm" />
          <Button variant="default" onClick={() => setShowAddItem(true)}>
            <Plus />
            Add Product
          </Button>
        </div>

        <div className="rounded-md border overflow-hidden sahdow-sm">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            {1 === 2 ? (
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell>{invoice.invoice}</TableCell>
                    <TableCell>
                      <Badge variant="outline">₱{(invoice.total / invoice.item).toFixed(2)}</Badge>
                    </TableCell>
                    <TableCell>{invoice.item}</TableCell>
                    <TableCell>{invoice.total}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Trash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={5} className="h-48 text-center border-none">
                    <div className="flex flex-col items-center justify-center gap-3 w-full h-full">
                      <PackageOpen className="size-16 text-neutral-300 stroke-1" />
                      <p className="text-sm font-medium text-neutral-500">No items added yet.</p>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </div>
      </section>
    </AuthenticatedLayout>
  )
}
