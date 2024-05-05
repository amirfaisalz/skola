import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { INavItem } from "./navigations";

const navItemMobileVariants = cva(
  "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:text-foreground",
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

export interface NavItemMobileProps
  extends VariantProps<typeof navItemMobileVariants> {
  item: INavItem;
}

export default function NavItemMobile({
  item,
  state,
}: Readonly<NavItemMobileProps>) {
  return (
    <Link href={item.href} className={cn(navItemMobileVariants({ state }))}>
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
