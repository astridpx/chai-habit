//  Inertia PageProps augmentation
import { PageProps as InertiaPageProps } from '@inertiajs/core'

declare module '@inertiajs/react' {
  export interface PageProps extends InertiaPageProps {
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
    stock: number
    description: string
    created_at: string
    updated_at: string
  }

  interface ProductStock {
    id: number
    product_id: number
    products: Product
    quantity: number
    created_at: string
    updated_at: string
  }

  // Order and OrderItem interfaces for useForm in CreateOrder page
  interface OrderItemForm {
    product_name: string // for display purposes
    productPrice: number // for display purposes
    product_id: number
    quantity: number
    discount: number
    total_price: number
  }

  interface OrderItem {
    id: number
    order_id: string
    product_id: number
    total_price: number
    quantity: number
    discount: number
    created_at: string
    updated_at: string
  }

  interface Order {
    id: number
    order_id: string
    customer_id: number
    process_by: number
    status: 'pending' | 'completed' | 'cancelled'
    note: string
    buying_method: 'online' | 'walkin'
    is_paid: number
    completed_at: string | null
    created_at: string
    updated_at: string

    customer: Customer
    order_items: OrderItem[]
  }
}

export {}
