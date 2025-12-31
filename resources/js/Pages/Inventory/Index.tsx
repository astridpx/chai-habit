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
import { buttonVariants } from '@/Components/ui/button'

export default function Products({ products }: { products: Pagination<Product> }) {
  const [openDialog, setOpenDialog] = useState(false)
  const {
    data,
    setData,
    delete: deleteCustomer,
    errors,
    processing,
    reset,
  } = useForm({
    id: '',
  })

  function handleDeleteProduct() {
    deleteCustomer(route('inventory.products.destroy', data.id), {
      preserveScroll: true,
      onSuccess: () => {
        setOpenDialog(false)
        reset()
      },
      // onError: (e) => console.log(e),
      // onFinish: () => reset(),
    })
  }

  // handle menu actions
  function handleMenuAction(action: string, productId: number) {
    switch (action) {
      case 'Delete':
        setOpenDialog(true)
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
      <AlertDialog open={openDialog}>
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
            <AlertDialogCancel disabled={processing} onClick={() => setOpenDialog(false)}>
              Cancel
            </AlertDialogCancel>
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
                        {['View', 'Delete'].map((action) => (
                          <DropdownMenuItem
                            key={action}
                            onClick={() => handleMenuAction(action, product.id)}
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
