import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4">Landing Page Coming Soon</h1>
      <Link href="/signin" className="underline">
        <Button variant="outline" className="w-full">
          Go to Login Page
        </Button>
      </Link>
    </main>
  );
}
