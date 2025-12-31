//  Inertia PageProps augmentation
declare module '@inertiajs/react' {
  export interface PageProps {
    auth: {
      user: User
    }
    flash: {
      success: string | null
      error: string | null
    }
  }
}

declare global {
  // Pagination interface
  interface Pagination<T> {
    data: T[]
    current_page: number
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: {
      url: string | null
      label: string
      active: boolean
    }[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
  }

  interface User {
    id: number
    name: string
    email: string
    email_verified_at?: string
  }

  // Customer interface
  interface Customer {
    id: number
    fullname?: string
    firstname: string
    lastname: string
    email: string
    username: string
    phone: string | null
    province: string
    city: string
    brgy: string
    street: string
    is_active: boolean
    last_login: string | null
    created_at: string
    updated_at: string
  }

  interface Product {
    id: number
    image: string
    name: string
    size: 'Small' | 'Medium' | 'Large'
    price: number
    description: string
    created_at: string
    updated_at: string
  }
}

export {}
