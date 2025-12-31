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
import { MoreHorizontalIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/Components/ui/alert-dialog'
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
import { buttonVariants, Button } from '@/Components/ui/button'

export default function Products({ products }: { products: Pagination<Product> }) {
  // dialogs
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [restockDialog, setRestockDialog] = useState({
    open: false,
    product: '',
  })

  const {
    data,
    setData,
    post,
    delete: destroy,
    processing,
    errors,
    reset,
  } = useForm({
    id: '',
    product_id: '',
    quantity: '',
  })

  // handle restock product
  function handleRestockProduct(e: React.FormEvent) {
    e.preventDefault()
    post(route('inventory.products.storeStock'), {
      preserveScroll: true,
      onSuccess: () => {
        setRestockDialog({ open: false, product: '' })
        reset()
      },
      // onError: (e) => console.log(e),
      // onFinish: () => reset(),
    })
  }

  // handle delete product
  function handleDeleteProduct() {
    destroy(route('inventory.products.destroy', data.id), {
      preserveScroll: true,
      onSuccess: () => {
        setDeleteDialog(false)
        reset()
      },
      // onError: (e) => console.log(e),
      // onFinish: () => reset(),
    })
  }

  // handle menu actions
  function handleMenuAction(action: string, productId: number, productName: string) {
    switch (action) {
      case 'Restock':
        setData('product_id', productId.toString())
        setRestockDialog({ open: true, product: productName })
        break
      case 'Delete':
        setDeleteDialog(true)
        setData('id', productId.toString())
        break
      case 'View':
        alert('View action clicked')
        break
      default:
        break
    }
  }
  return (
    <AuthenticatedLayout>
      {/* DELETE MODAL */}
      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently deleted and remove data from the
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={processing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={processing}
              className={buttonVariants({ variant: 'destructive' })}
              onClick={() => handleDeleteProduct()}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* RESTOCK MODAL */}
      <Dialog
        open={restockDialog.open}
        onOpenChange={(open) => setRestockDialog({ ...restockDialog, open })}
      >
        <form>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Restock {restockDialog.product}</DialogTitle>
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
            <p className="text-red-500">{errors.quantity || errors.product_id}</p>
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

      <Head title="Products" />

      <h1 className="mb-6 text-3xl font-semibold text-neutral-600">Products</h1>

      <div className="">
        <div>
          <Input className="mb-6 bg-neutral-100" placeholder="Search..." />
        </div>

        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Decription</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.data?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="flex items-center gap-2 ">
                  <Avatar className="w-7 h-7">
                    <AvatarImage src={`/storage/${product.image}`} alt={product.name} />
                    <AvatarFallback>N/A</AvatarFallback>
                  </Avatar>

                  <span>{product.name}</span>
                </TableCell>
                <TableCell>{product.size}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                      {/* <Button variant="outline" aria-label="Open menu"> */}
                      <MoreHorizontalIcon className="text-neutral-600" />
                      {/* </Button> */}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="" align="start">
                      <DropdownMenuGroup>
                        {['Restock', 'View', 'Delete'].map((action) => (
                          <DropdownMenuItem
                            key={action}
                            onClick={() => handleMenuAction(action, product.id, product.name)}
                          >
                            {action}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AuthenticatedLayout>
  )
}
