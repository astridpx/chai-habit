import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Checkbox } from '@/Components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string
  canResetPassword: boolean
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false as boolean,
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('login'), {
      onFinish: () => reset('password'),
    })
  }

  return (
    <>
      <GuestLayout>
        <Head title="Log in" />

        {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

        <form onSubmit={submit}>
          <div>
            <InputLabel htmlFor="email" value="Email" />

            <Input
              id="email"
              type="email"
              name="email"
              value={data.email}
              className="block w-full mt-1"
              autoComplete="username"
              onChange={(e) => setData('email', e.target.value)}
            />

            <InputError message={errors.email} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="password" value="Password" />

            <Input
              id="password"
              type="password"
              name="password"
              value={data.password}
              className="block w-full mt-1"
              autoComplete="current-password"
              onChange={(e) => setData('password', e.target.value)}
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="block mt-4">
            <div className="flex items-center">
              <Checkbox
                id="remember"
                checked={data.remember}
                onCheckedChange={(e) => setData('remember', e as false)}
              />
              <Label htmlFor="remember" className="text-sm text-gray-600 ms-2">
                Remember me
              </Label>
            </div>
          </div>

          <div className="flex items-center justify-end mt-4">
            {canResetPassword && (
              <Link
                href={route('password.request')}
                className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Forgot your password?
              </Link>
            )}

            <Button className="ms-4" disabled={processing}>
              Log in
            </Button>
          </div>
        </form>
      </GuestLayout>
    </>
  )
}
