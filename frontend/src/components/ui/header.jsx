import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import ModeToggle from "../ModeToggle"
import { useAuth } from "../AuthProvider";

export function Header({children}) {

  const location = useLocation();
  const [, setUser] = useAuth();
  const navigate = useNavigate();

  const routes = [
    {
      href: "/",
      label: "Dashboard",
    },
    {
      href: "/post",
      label: "Post",
    },
    {
      href: "/matkul",
      label: "Mata Kuliah",
    },
  ];

  const logout = () => {
    window.localStorage.removeItem("accessToken");
    setUser({});
    navigate("/login");
  }

  return (
    (<div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link className="flex items-center gap-2 text-lg font-semibold md:text-base cursor-default">
            KRSans
          </Link>
          {routes.map((route, i) => (
            <Link
              key={i}
              className={
                route.href === location.pathname
                  ? "text-foreground transition-colors hover:text-foreground"
                  : "text-muted-foreground transition-colors hover:text-foreground"
              }
              to={route.href}
              style={{ whiteSpace: "nowrap" }}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="shrink-0 md:hidden rounded-full" size="icon" variant="ghost">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link className="flex items-center gap-2 text-lg font-semibold md:text-base cursor-default md:animate-bounce">
                KRSans
              </Link>
              {routes.map((route, i) => (
                <Link
                  key={i}
                  className={
                    route.href === location.pathname
                      ? "text-foreground transition-colors hover:text-foreground"
                      : "text-muted-foreground transition-colors hover:text-foreground"
                  }
                  to={route.href}
                  style={{ whiteSpace: "nowrap" }}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex-grow"></div>
        <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
          <span className="flex-shrink-0">
            <ModeToggle />
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="ghost">
                <CircleUserIcon className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuLabel align="center">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
                <Link to="/">
              <DropdownMenuItem>
                Profile
              </DropdownMenuItem>
                </Link>
                <Link to="/">        
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
                </Link>
              <DropdownMenuSeparator />
              <Button onClick={logout} variant="ghost" className="hover:bg-red-500 w-full">
                Logout
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        {children}
      </main>
    </div>)
  );
}

function CircleUserIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>)
  );
}


function MenuIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>)
  );
}