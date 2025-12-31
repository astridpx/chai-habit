import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu'
import { Input } from '@/Components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'
import { format, set } from 'date-fns'
import { AlertCircleIcon, MoreHorizontalIcon } from 'lucide-react'
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
import { useState } from 'react'
import { useForm } from '@inertiajs/react'
import { buttonVariants } from '@/Components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert'

export default function Customers({ customers }: { customers: Pagination<Customer> }) {
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

  // handle menu actions
  function handleMenuAction(action: string, customerId: number) {
    switch (action) {
      case 'Delete':
        setOpenDialog(true)
        setData('id', customerId.toString())
        break
      case 'View':
        alert('View action clicked')
        break
      default:
        break
    }
  }

  function handleDeleteCustomer() {
    deleteCustomer(route('customers.destroy', data.id), {
      preserveScroll: true,
      onSuccess: () => {
        setOpenDialog(false)
        reset()
      },
      // onError: (e) => console.log(e),
      // onFinish: () => reset(),
    })
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
              onClick={() => handleDeleteCustomer()}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Head title="Customers" />

      <h1 className="mb-6 text-3xl font-semibold text-neutral-600">Customers</h1>
      <div className="">
        <div>
          <Input className="mb-6 bg-neutral-100" placeholder="Search..." />
        </div>

        {errors.id && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircleIcon />
            <AlertTitle>Unable to delete user.</AlertTitle>
            <AlertDescription>Something went wrong.</AlertDescription>
          </Alert>
        )}

        <Table className="">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.data.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="flex items-center gap-2 ">
                  {/* <Avatar className="w-7 h-7">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar> */}

                  <span>{customer.fullname}</span>
                </TableCell>
                <TableCell>{customer.username}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.is_active}</TableCell>
                <TableCell>
                  {customer?.last_login
                    ? format(new Date(customer.last_login), 'dd MMM yyyy, HH:mm aaaa')
                    : 'Never'}
                </TableCell>
                <TableCell className="">
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                      {/* <Button variant="outline" aria-label="Open menu"> */}
                      <MoreHorizontalIcon className="text-neutral-600" />
                      {/* </Button> */}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="" align="end">
                      <DropdownMenuGroup>
                        {['View', 'Delete'].map((action) => (
                          <DropdownMenuItem
                            key={action}
                            onClick={() => handleMenuAction(action, customer.id)}
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
          <TableFooter>
            {/* <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow> */}
            // TODO Pagination here
          </TableFooter>
        </Table>
      </div>
    </AuthenticatedLayout>
  )
}
