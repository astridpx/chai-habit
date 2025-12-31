import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useState } from 'react'
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'
import { ImageUp } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select'
import { Label } from '@/Components/ui/label'
import { Head, usePage, useForm } from '@inertiajs/react'

export default function CreateProduct() {
  const { flash } = usePage().props
  const imgPreview = useState<string | null>(null)
  const { data, setData, post, processing, errors, reset } = useForm({
    image: null as File | null,
    name: '',
    size: '',
    price: '',
    description: '',
  })
  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    post(route('inventory.products.store'), {
      onSuccess: (p) => reset(),
      onError: (e) => {
        console.log('Form submission error: ', e)
      },
    })
  }

  return (
    <AuthenticatedLayout>
      <Head title="Create Product" />

      <h1 className="mb-6 text-3xl font-bold">Create New Product</h1>
      {flash?.success && (
        <div className="mb-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg border border-green-200">
          {flash.success}
        </div>
      )}

      <div className="px-8 py-6">
        <form onSubmit={onSubmit} className="space-y-6">
          {/* <Avatar className="w-16 h-16 rounded-none">
              <AvatarImage  />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}
          <div className="flex flex-col items-center ">
            {data.image ? (
              <div
                className="relative overflow-hidden bg-primary/5 p-2 cursor-pointer border-2 border-primary/20
                  rounded-lg"
              >
                <img
                  className="rounded-sm  h-48 w-52"
                  src={URL.createObjectURL(data.image)}
                  alt="@shadcn"
                />
                <label
                  htmlFor="image"
                  className="absolute inset-0 bg-foreground/30 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-md cursor-pointer"
                >
                  <span className="text-white text-sm font-semibold">Change Image</span>
                </label>
              </div>
            ) : (
              <Label
                htmlFor="image"
                className={`
                  relative cursor-pointer
                  bg-neutral-50 hover:bg-neutral-100
                  h-48 w-52
                  flex flex-col items-center justify-center
                  border-2 border-dashed border-neutral-300
                  rounded-lg shadow-inner
                  transition duration-200 ease-in-out
                  overflow-hidden
            `}
              >
                <div className="flex flex-col items-center justify-center text-neutral-400">
                  <ImageUp size={36} />
                  <span className="mt-2 text-sm font-medium">Click to upload</span>
                  <span className="text-xs text-neutral-500">JPG, PNG, max 4MB</span>
                </div>
              </Label>
            )}
            <Input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setData('image', e.target.files[0])
                }
              }}
            />
            {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              placeholder="Name"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={data.price}
              onChange={(e) => setData('price', e.target.value)}
              placeholder="Price"
            />
            {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="size">Size</Label>
            <Select onValueChange={(value) => setData('size', value)} value={data.size ?? ''}>
              <SelectTrigger className="shadow-xs">
                <SelectValue placeholder="Select a Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sizes</SelectLabel>
                  <SelectItem value="Small">Small</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Large">Large</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.size && <p className="text-sm text-red-500">{errors.size}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              placeholder="Description"
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </div>
    </AuthenticatedLayout>
  )
}
