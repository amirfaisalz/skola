import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { INavItem } from "./navigations";

const navItemVariants = cva(
  "inline-flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
  {
    variants: {
      state: {
        active: "bg-muted text-white-foreground",
        inactive: "text-muted-foreground",
      },
    },
    defaultVariants: {
      state: "inactive",
    },
  }
);

export interface NavItemProps extends VariantProps<typeof navItemVariants> {
  item: INavItem;
}

export default function NavItem({ item, state }: Readonly<NavItemProps>) {
  return (
    <Link href={item.href} className={cn(navItemVariants({ state }))}>
      {item.icon}
      {item.text}
      {item.badge && (
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          {item.badge}
        </Badge>
      )}
    </Link>
  );
}
