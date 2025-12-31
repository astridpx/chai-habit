import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
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
import { Plus, PenLine } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/Components/ui/tooltip'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/Components/ui/label'
import { useState } from 'react'

export default function ProductStock({ products }: { products: Pagination<ProductStock> }) {
  const [showStockDialog, setStockDialog] = useState(false)
  const { data, setData, post, errors } = useForm({
    id: '',
    quantity: '',
  })

  // Handle edit stock
  function handleRestockProduct(e: React.FormEvent) {
    e.preventDefault()
    console.log(data)
    post(route('inventory.products.updateStock', data.id), {
      preserveScroll: true,
      onSuccess: () => setStockDialog(false),
      onError: (e) => console.log(e),
    })
  }

  return (
    <AuthenticatedLayout>
      {/* DIALOG */}
      <Dialog open={showStockDialog} onOpenChange={() => setStockDialog(false)}>
        <form>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Edit Stock</DialogTitle>
              <DialogDescription>
                Enter the amount of stock to add for this product. This will update the current
                inventory count immediately.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="quantity">Stock Amount</Label>
                <Input
                  type="number"
                  id="quantity"
                  value={data.quantity}
                  onChange={(e) => setData('quantity', e.target.value)}
                  name="quantity"
                  min={0}
                />
              </div>
            </div>
            <p className="text-red-500">{errors.quantity || errors.id}</p>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={(e) => handleRestockProduct(e)}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      <Head title="Available Products" />

      <h1 className="mb-6 text-3xl font-semibold text-neutral-600">Available Products</h1>

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
            {products?.data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="flex items-center gap-2 ">
                  <Avatar className="w-7 h-7">
                    <AvatarImage src={`/storage/${item.products.image}`} alt={item.products.name} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <span>{item.products.name}</span>
                </TableCell>
                <TableCell>{item.products.size}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.quantity > 0 ? 'In Stock' : 'Out of Stock'}</TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        onClick={() => {
                          setData('id', item.id.toString())
                          setStockDialog(true)
                        }}
                        variant="outline"
                        size="icon"
                      >
                        <PenLine className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit Stock</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AuthenticatedLayout>
  )
}
