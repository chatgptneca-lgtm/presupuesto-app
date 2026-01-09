import Link from "next/link";
import { ArrowLeftRight, Folder, Home, Wallet } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Resumen", icon: Home },
  { href: "/budgets", label: "Presupuestos", icon: Wallet },
  { href: "/categories", label: "Categorías", icon: Folder },
  { href: "/transactions", label: "Transacciones", icon: ArrowLeftRight }
];

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "hidden h-screen w-64 flex-col border-r border-border bg-card px-4 py-6 md:flex",
        className
      )}
    >
      <div className="flex items-center gap-2 px-2 text-lg font-semibold">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
          P
        </div>
        Presupuesto
      </div>
      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="rounded-md bg-muted px-3 py-4 text-xs text-muted-foreground">
        Última sincronización: hoy
      </div>
    </aside>
  );
}
