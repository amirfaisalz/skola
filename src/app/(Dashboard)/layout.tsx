import Link from "next/link";
import { redirect } from "next/navigation";
import { Bell, CircleUser, Menu, Package2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { validateRequest } from "@/lib/lucia";
import { Button } from "@/components/ui/button";
import NavGroup from "./__components/nav-group";
import { signOut } from "@/actions/auth.actions";
import { navItems } from "./__components/navigations";
import { ToggleTheme } from "@/components/shared/toggle-theme";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // all of children under this file is protected page
  // check if user is null, and then redirect to signin page
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/signin");
  }

  return (
    <div className="h-screen grid place-items-center">
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="">Skola</span>
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1">
              {/* nav desktop */}
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <NavGroup navItems={navItems} />
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <div className="flex-1">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                  {/* nav mobile */}
                  <nav className="grid gap-2 text-lg font-medium">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 text-lg font-semibold mb-4"
                    >
                      <Package2 className="h-6 w-6" />
                      <span>Skola</span>
                    </Link>
                    <NavGroup navItems={navItems} mobile />
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <form action={signOut}>
                    <Button type="submit" className="w-full">
                      Sign out
                    </Button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ToggleTheme />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {/* children */}
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
