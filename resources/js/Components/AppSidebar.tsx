import {
  Home,
  Inbox,
  Settings,
  UsersRound,
  ChevronRight,
  BarChart3,
  Package,
  ClipboardList,
} from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/Components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from '@/Components/ui/sidebar'
import { Link } from '@inertiajs/react'
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu'

// nav items.
const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Orders',
    url: '/orders',
    icon: Inbox,
    child: [
      {
        title: 'All Orders',
        url: '/orders/all',
      },
      {
        title: 'Pending Shipments',
        url: '/orders/pending',
      },
    ],
  },
  {
    title: 'Inventory',
    icon: Package,
    child: [
      {
        title: 'Product List',
        url: '/inventory/products',
      },
      {
        title: 'Add New Product',
        url: '/inventory/products/add',
      },
      {
        title: 'Product Stock',
        url: '/inventory/products/stock',
      },
    ],
  },
  {
    title: 'Customers',
    icon: UsersRound,
    child: [
      {
        title: 'Customer List',
        url: '/customers/list',
      },
      {
        title: 'Add Customer',
        url: '/customers/new',
      },
    ],
  },
  {
    title: 'Reports',
    icon: BarChart3,
    child: [
      {
        title: 'Transaction History',
        url: '/reports/transactions',
      },
      {
        title: 'Stock & Revenue',
        url: '/reports/inventory-analysis',
      },
    ],
  },
  {
    title: 'Logs',
    icon: ClipboardList,
    child: [
      {
        title: 'User Activity',
        url: '/logs/activity',
      },
      {
        title: 'System Events',
        url: '/logs/system',
      },
    ],
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
]

export function AppSidebar() {
  const { isMobile } = useSidebar()

  return (
    <Sidebar>
      {/* HEADER */}
      <SidebarHeader className="text-xl">Chai Habit</SidebarHeader>

      {/* navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-var(sidebar-accent-foreground)">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) =>
                item.child ? (
                  // dropdown nav item
                  <Collapsible className="group/collapsible">
                    <SidebarMenuItem key={item.title}>
                      <CollapsibleTrigger asChild>
                        {/* Added hover:bg-transparent and hover:text-current to keep text color stable */}

                        <SidebarMenuButton className="relative data-[state=open]:bg-transparent! group-data-[state=closed]/collapsible:hover:bg-primary/20 active:bg-transparent!">
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                          <ChevronRight className="absolute right-2 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.child.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <a
                                href={subItem.url}
                                className="pl-5 transition-colors text-muted-foreground hover:text-primary"
                              >
                                {subItem.title}
                              </a>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  //  basic nav item
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="hover:bg-primary/20">
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ),
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* footer */}
      <SidebarFooter>
        {/* <Link
          href={route('logout')}
          method="post"
          as="button"
          className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Log Out
        </Link> */}
        <SidebarMenu className="mb-2  rounded-lg">
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">John Doe</span>
                    <span className="truncate text-xs">abc@xyz.com</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? 'bottom' : 'right'}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">John Doe</span>
                      <span className="truncate text-xs">abc@xyz.com</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
