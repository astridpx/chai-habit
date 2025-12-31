import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { useState } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/Components/ui/form'
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  image: z.string().min(2, 'Image is required'),
  name: z.string().min(2, 'Name is required'),
  price: z.number().min(0, 'Invalid price'),
  size: z.enum(['small', 'medium', 'large'], { message: 'Size is required' }),
  description: z.string(),
})

export default function AddStock() {
  // State for the selected value in the combobox.
  const [open, setOpen] = useState(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: '',
      name: '',
      price: 0,
      size: undefined,
      description: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <AuthenticatedLayout>
      <Head title="Restock Product" />

      <h1 className="mb-6 text-3xl font-semibold text-neutral-600">Restock Product</h1>

      <div className="px-8 py-6 ">// TODO</div>
    </AuthenticatedLayout>
  )
}
