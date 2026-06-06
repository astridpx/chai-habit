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
import { debounce, set } from 'lodash'
import { useForm, usePage } from '@inertiajs/react'

interface ISingleOrderProps {
  customers: Pagination<Customer>
  customerFilters: { search?: string }
  products: Pagination<Product>
  productFilters: { name?: string }
  order: Order
}

export default function SingleOrder({
  customers,
  customerFilters,
  products,
  productFilters,
  order,
}: ISingleOrderProps) {
  const { flash, id } = usePage<PageProps>().props

  const [orderTotal, setOrderTotal] = useState({
    subTotal: 0,
    total: 0,
  })
  const [searchCustomer, setSearchCustomer] = useState(customerFilters?.search ?? '')
  const [searchProduct, setSearchProduct] = useState(productFilters?.name ?? '')
  const [selectedName, setSelectedName] = useState('')
  const [showAddItem, setShowAddItem] = useState(false)
  const { data, setData, post, processing, errors, reset } = useForm({
    order_id: '',
    customer_id: null as null | number,
    note: '',
    buying_method: 'walkin',
    is_paid: false,
    items: [] as OrderItemForm[],
  })

  // Set initial form data when editing an existing order
  useEffect(() => {
    if (id) {
      interface OrderItemWithProduct extends OrderItem {
        product: Product
      }

      setData({
        order_id: order.order_id,
        customer_id: order.customer_id,
        note: order.note,
        buying_method: order.buying_method,
        is_paid: Boolean(order.is_paid),
        items: (order.order_items as OrderItemWithProduct[]).map((item) => ({
          product_id: item.product_id,
          product_name: item.product.name,
          productPrice: item.product.price,
          quantity: item.quantity,
          discount: item.discount,
          total_price: item.total_price,
        })),
      })
      setSelectedName(order.customer.fullname || '')
    }
  }, [id])

  // Search customers with debounce to avoid excessive requests while typing
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        router.get(
          id ? route('orders.edit', { id }) : route('orders.create'),
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

  // Add item to order
  const [addOrderItemMsg, setOrderItemMsg] = useState('') //  error msg
  function createOrderItem(
    productId: number,
    productName: string,
    productPrice: number,
    discount: number = 0,
    totalPrice: number,
  ) {
    setOrderItemMsg('') // reset message

    const productExist = data.items?.find((item) => item.product_id === productId)
    if (productExist) {
      // If the product already exists in the order, update the quantity and total price
      setOrderItemMsg('Product already added. Adjust quantity in the order summary.')
      return
    }

    setData('items', [
      ...(data.items || []),
      {
        product_id: productId,
        product_name: productName,
        productPrice: productPrice,
        quantity: 1,
        discount: discount,
        total_price: totalPrice,
      },
    ])
  }

  // Handle quantity changes for order items
  function handleQuantity(
    productId: number,
    action: 'increment' | 'decrement' | 'change',
    value?: number,
  ) {
    const updatedItems = [...data.items]
    const itemIndex = updatedItems.findIndex((i) => i.product_id === productId)

    if (itemIndex !== -1) {
      if (action === 'increment') {
        updatedItems[itemIndex].quantity += 1
      } else if (action === 'decrement') {
        updatedItems[itemIndex].quantity -= 1
      } else if (action === 'change' && value !== undefined) {
        updatedItems[itemIndex].quantity = value
      }

      setData('items', updatedItems)
    }
  }

  // Calculate order totals
  useEffect(() => {
    const subTotal = data.items.reduce((acc, curr) => acc + curr.productPrice * curr.quantity, 0)

    setOrderTotal({
      subTotal,
      total: subTotal, // TODO adjust - deduct with discount
    })
  }, [data.items])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    post(id ? route('orders.update', id as string) : route('orders.store'), {
      onSuccess: (p) => {
        if (!id) {
          setSearchCustomer('')
          setSelectedName('')
          reset()
        }
      },
      onError: (e) => {
        console.log('Form submission error', e)
      },
    })
  }
  return (
    <AuthenticatedLayout>
      {/* ADD PRODUCT ITEM DIALOG */}
      <Dialog open={showAddItem} onOpenChange={setShowAddItem}>
        <DialogContent className="max-w-3xl  h-screen overflow-y-auto">
          <div className="w-full">
            <DialogHeader>
              <DialogTitle>Add Order Item</DialogTitle>
              <DialogDescription>
                Search and select products to add them to this order.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4">
              <Input placeholder="Search products..." className="mb-4 shadow-sm border-2" />

              <p className="text-destructive text-center pb-4 text-sm font-semibold">
                {addOrderItemMsg}
              </p>

              <div className="border rounded-md overflow-hidden shadow-sm">
                <Table>
                  <TableHeader className="bg-muted">
                    <TableRow>
                      {/* <TableHead /> */}
                      <TableHead>Product</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead className="text-center -translate-x-9">Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  {
                    <TableBody>
                      {products?.data?.map((product, index) => (
                        <TableRow key={index}>
                          {/* <TableCell>
                          <Checkbox className="rounded" />
                        </TableCell> */}
                          <TableCell>{product.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">₱ {product.price.toFixed(2)}</Badge>
                          </TableCell>
                          <TableCell className="flex items-center justify-center">
                            <Button
                              onClick={() =>
                                createOrderItem(
                                  product.id,
                                  product.name,
                                  product.price,
                                  0,
                                  product.price,
                                )
                              }
                              variant="default"
                              className="border shadow-2xs"
                            >
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
              <Input value={data.order_id} id="orderNumber" placeholder="Auto Generated" readOnly />
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <Label htmlFor="paymentStatus">Payment Status</Label>
              <Select
                value={data.is_paid ? 'true' : 'false'}
                onValueChange={(value) => setData('is_paid', value === 'true')}
              >
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
            {selectedName}-{searchCustomer}
            <Combobox
              items={customers.data}
              onValueChange={(id) => {
                const found = customers.data.find((c) => c.id === id)
                if (found) {
                  // Inertia Form helper:
                  // console.log('To be sent to server:', found.id)
                  setData('customer_id', found.id)
                  setSelectedName(found.fullname || '') // text display only
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
              id="notes"
              value={data.note}
              onChange={(e) => setData('note', e.target.value)}
              placeholder="Add any notes for this order..."
              className="min-h-20 resize-none"
            />
          </div>
        </div>

        <Separator orientation="vertical" className="hidden lg:block " />

        {/* ORDER SUMMARY */}
        <div className="flex-1 text-sm">
          <h3 className="font-semibold text-lg mb-6 mt-4">Order Summary</h3>

          <div className="flex items-center justify-between mb-4">
            <p>Subtotal</p>
            <p>₱{orderTotal.subTotal.toFixed(2)}</p>
          </div>

          <div className="flex items-center justify-between w-full mb-4">
            <div className="flex items-center justify-between  flex-2 pr-2">
              <p>Discount</p>
              <Input type="number" disabled className="max-w-20 rounded-sm" placeholder="0.00" />
            </div>

            <p className="flex-1 text-right">₱0.00</p>
          </div>

          <Separator className="my-5" />

          <div className="flex items-center justify-between">
            <p className="font-semibold">Total</p>
            <p className="text-xl font-bold">₱{orderTotal.total.toFixed(2)}</p>
          </div>
        </div>
      </section>

      {/* ORDER ITEM SECTION */}
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

            {data.items?.length ? (
              <TableBody>
                {data.items?.map((item) => (
                  <TableRow key={item.product_id}>
                    <TableCell>{item.product_name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">₱{item.productPrice.toFixed(2)}</Badge>
                    </TableCell>
                    {/* <TableCell>{items.quantity}</TableCell> */}
                    <TableCell className="space-x-1">
                      <Button
                        onClick={() => handleQuantity(item.product_id, 'decrement')}
                        variant="secondary"
                        className="border shadow-2xs"
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        className="max-w-15 rounded-sm outline-none focus-visible:ring-0"
                        defaultValue={1}
                        max={99} // TODO - set max to available stock quantity for the product
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantity(item.product_id, 'change', parseInt(e.target.value) || 0)
                        }
                      />
                      <Button
                        onClick={() => handleQuantity(item.product_id, 'increment')}
                        variant="secondary"
                        className="border shadow-2xs"
                      >
                        +
                      </Button>
                    </TableCell>
                    <TableCell>₱{item.total_price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() =>
                          setData(
                            'items',
                            data.items.filter(
                              (_, i) =>
                                i !== data.items.findIndex((v) => v.product_id === item.product_id),
                            ),
                          )
                        }
                        variant="ghost"
                        size="sm"
                      >
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

      <Separator className="my-4" />

      <div className=" flex justify-between  items-center ">
        <Button variant="outline" className="border shadow-2xs">
          Cancel
        </Button>

        <Button type="submit" onClick={onSubmit} className="">
          {id ? 'Update' : 'Create'} Order
        </Button>
      </div>
    </AuthenticatedLayout>
  )
}
