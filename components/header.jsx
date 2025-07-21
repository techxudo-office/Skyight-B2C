"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "nextjs-toploader/app";
import { Menu, Plane, Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { userData } = useSelector((state) => state.persist);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch({ type: "user/logout" });
    Cookies.remove("token"); // remove token cookie
    router.push("/login");
    toast.success("Logged out successfully");
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Flights", href: "/flights" },
    { name: "Support", href: "/support" },
    { name: "Destinations", href: "/destinations" },
  ];

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Plane className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold">Skyight</span>
          </Link>

          {/* Desktop Navigation */}
          {userData?.token && (
            <nav className="items-center hidden space-x-6 md:flex">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-blue-600"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              disabled={!mounted}
            >
              {mounted && (
                <>
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </>
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            <div className="items-center hidden space-x-2 md:flex">
              {userData?.token ? (
                <Button onClick={handleLogout} variant="outline">
                  Logout
                </Button>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link href="/signup">
                    <Button>Sign Up</Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col mt-8 space-y-4">
                  {userData?.token && (
                    <>
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="text-lg font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </>
                  )}
                  <div className="pt-4 border-t">
                    {userData?.token ? (
                      <Button
                        variant="ghost"
                        className="justify-start w-full"
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    ) : (
                      <>
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          <Button
                            variant="ghost"
                            className="justify-start w-full"
                          >
                            Login
                          </Button>
                        </Link>
                        <Link href="/signup" onClick={() => setIsOpen(false)}>
                          <Button className="justify-start w-full mt-2">
                            Sign Up
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
