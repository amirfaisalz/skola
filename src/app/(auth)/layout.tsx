import { redirect } from "next/navigation";

import { validateRequest } from "@/lib/lucia";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();

  if (user) {
    return redirect("/dashboard");
  }

  return <div className="h-screen grid place-items-center">{children}</div>;
}
