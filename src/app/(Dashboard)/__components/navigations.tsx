import {
  Home,
  LineChart,
  Package,
  ShoppingCart,
  Users,
  UserX,
} from "lucide-react";

export interface INavItem {
  id: number;
  text: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
}

export const navItems: INavItem[] = [
  {
    id: 1,
    text: "Dashboards",
    icon: <Home className="h-4 w-4" />,
    href: "/dashboard",
  },
  {
    id: 2,
    text: "Analytics",
    icon: <LineChart className="h-4 w-4" />,
    href: "/analytics",
  },
  {
    id: 3,
    text: "Customers",
    icon: <Users className="h-4 w-4" />,
    href: "/customers",
  },
  {
    id: 4,
    text: "Orders",
    icon: <ShoppingCart className="h-4 w-4" />,
    href: "/orders",
    badge: 18,
  },
  {
    id: 5,
    text: "Products",
    icon: <Package className="h-4 w-4" />,
    href: "/products",
  },
  {
    id: 6,
    text: "Roles",
    icon: <UserX className="h-4 w-4" />,
    href: "/roles",
  },
];
