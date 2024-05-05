"use client";

import { usePathname } from "next/navigation";

import NavItem from "./nav-items";
import { INavItem } from "./navigations";
import NavItemMobile from "./nav-item-mobile";

type NavGroupProps = {
  navItems: INavItem[];
  mobile?: boolean;
};

export default function NavGroup({
  navItems,
  mobile = false,
}: Readonly<NavGroupProps>) {
  const pathname = usePathname();
  return (
    <>
      {navItems.map((item) => (
        <>
          {mobile ? (
            <NavItemMobile
              key={item.id}
              item={item}
              state={item.href === pathname ? "active" : "inactive"}
            />
          ) : (
            <NavItem
              key={item.id}
              item={item}
              state={item.href === pathname ? "active" : "inactive"}
            />
          )}
        </>
      ))}
    </>
  );
}
