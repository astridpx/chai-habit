import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'
import { useForm, usePage } from '@inertiajs/react'
import { Label } from '@/Components/ui/label'
// import { PageProps } from '@/types'

export default function CreateCustomer() {
  const { flash } = usePage().props
  const { data, setData, post, processing, errors, reset } = useForm({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    username: '',
    province: '',
    city: '',
    brgy: '',
    street: '',
    password: '',
    password_confirmation: '',
  })

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    post(route('customers.store'), {
      onSuccess: (p) => reset(),
      onError: (e) => {
        console.log('Form submission error', e)
      },
    })
  }

  return (
    <AuthenticatedLayout>
      <Head title="Create Customer" />

      <h1 className="mb-6 text-3xl font-semibold text-neutral-600">Create New Customer</h1>
      {flash?.success && (
        <div className="mb-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg border border-green-200">
          {flash.success}
        </div>
      )}

      <div className="px-4 ">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-1">
            <Label htmlFor="firstname">Firstname</Label>
            <Input
              id="firstname"
              value={data.firstname}
              onChange={(e) => setData('firstname', e.target.value)}
              placeholder="Firstname"
            />
            {errors.firstname && <p className="text-sm text-red-500">{errors.firstname}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="lastname">Lastname</Label>
            <Input
              id="lastname"
              value={data.lastname}
              onChange={(e) => setData('lastname', e.target.value)}
              placeholder="Lastname"
            />
            {errors.lastname && <p className="text-sm text-red-500">{errors.lastname}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={data.email}
              type="email"
              onChange={(e) => setData('email', e.target.value)}
              placeholder="Email"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={(e) => setData('phone', e.target.value)}
              placeholder="Phone"
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={data.username}
              onChange={(e) => setData('username', e.target.value)}
              placeholder="Username"
            />
            {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="province">Province</Label>
            <Input
              id="province"
              value={data.province}
              onChange={(e) => setData('province', e.target.value)}
              placeholder="Province"
            />
            {errors.province && <p className="text-sm text-red-500">{errors.province}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={data.city}
              onChange={(e) => setData('city', e.target.value)}
              placeholder="City"
            />
            {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="brgy">Brgy</Label>
            <Input
              id="brgy"
              value={data.brgy}
              onChange={(e) => setData('brgy', e.target.value)}
              placeholder="Brgy"
            />
            {errors.brgy && <p className="text-sm text-red-500">{errors.brgy}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="street">Street</Label>
            <Input
              id="street"
              value={data.street}
              onChange={(e) => setData('street', e.target.value)}
              placeholder="Street"
            />
            {errors.street && <p className="text-sm text-red-500">{errors.street}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              value={data.password}
              type="password"
              onChange={(e) => setData('password', e.target.value)}
              placeholder="Password"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password_confirmation">Confirm Password</Label>
            <Input
              id="password_confirmation"
              value={data.password_confirmation}
              type="password"
              onChange={(e) => setData('password_confirmation', e.target.value)}
              placeholder="Confirm Password"
            />
            {errors.password_confirmation && (
              <p className="text-sm text-red-500">{errors.password_confirmation}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </div>
    </AuthenticatedLayout>
  )
}
