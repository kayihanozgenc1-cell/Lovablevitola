import { useState } from "react";
import { Home, Archive, Compass, MessageCircle, X, Menu } from "lucide-react";

type Page = "dashboard" | "humidor" | "discover" | "concierge";

interface NavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems = [
  { id: "dashboard" as Page, label: "Home", icon: Home },
  { id: "humidor" as Page, label: "Humidor", icon: Archive },
  { id: "discover" as Page, label: "Discover", icon: Compass },
  { id: "concierge" as Page, label: "Concierge", icon: MessageCircle },
];

export function AppNav({ currentPage, onNavigate }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen bg-sidebar border-r border-sidebar-border py-8 px-6">
        {/* Logo */}
        <div className="mb-10">
          <div className="divider-gold mb-6" />
          <p className="text-xs font-ui tracking-[0.25em] uppercase text-gold mb-1">Premium</p>
          <h1 className="font-display text-2xl text-cream font-bold">Cigar Companion</h1>
          <div className="divider-gold mt-4" />
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-ui tracking-wide transition-all duration-200 text-left ${
                  active
                    ? "text-gold border-l-2 border-gold bg-gold/5 pl-[14px]"
                    : "text-sidebar-foreground hover:text-cream hover:bg-sidebar-accent border-l-2 border-transparent"
                }`}
              >
                <Icon size={16} strokeWidth={active ? 2 : 1.5} />
                <span className={active ? "font-medium" : ""}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto">
          <div className="divider-gold mb-4" />
          <p className="text-xs text-muted-foreground font-ui text-center tracking-wider">
            Est. in excellence
          </p>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-sidebar/95 backdrop-blur border-b border-sidebar-border">
        <h1 className="font-display text-lg text-cream font-bold">Cigar Companion</h1>
        <button
          onClick={() => setMobileOpen(true)}
          className="text-gold p-1"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-mahogany/80" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-sidebar border-l border-sidebar-border py-8 px-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="font-display text-xl text-cream font-bold">Menu</h1>
              <button onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-cream">
                <X size={20} />
              </button>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-ui transition-all duration-200 text-left ${
                      active ? "text-gold" : "text-sidebar-foreground hover:text-cream"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export type { Page };
