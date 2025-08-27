  'use client';

  import Image from "next/image";
  import Link from 'next/link';
  import { usePathname, useRouter } from 'next/navigation';
  import {
    LayoutDashboard,
    Zap,
    MessageSquare,
    Globe,
    Users,
    FileText,
    Bell,
    Menu,
    X,
    LogOut
  } from 'lucide-react';
  import { Button } from '@/components/ui/button';
  import { cn } from '@/lib/utils';
  import { memo, useEffect, useMemo, useState, useTransition } from 'react';

  import logo from "@/public/logo.png";
  import blackLogo from "@/public/black-logo.png"; // keep if you swap by theme

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Features', href: '/admin/features', icon: Zap },
    { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
    { name: 'Services', href: '/admin/services', icon: Globe },
    { name: 'Team', href: '/admin/team', icon: Users },
    { name: 'Blog', href: '/admin/blog', icon: FileText },
    { name: 'Notifications', href: '/admin/notifications', icon: Bell },
  ];

  function NavItems({
    pathname,
    onItemClick,
  }: {
    pathname: string;
    onItemClick?: (href: string) => void;
  }) {
    const items = useMemo(() => navigation, []);
    return (
      <nav className="flex-1 px-4 py-4 space-y-2">
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              prefetch
              className={cn(
                'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
              onClick={(e) => {
                // allow desktop to use default <Link>; mobile can override via parent handler
                onItemClick?.(item.href);
              }}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    );
  }

  const SidebarContent = memo(function SidebarContent({
    pathname,
    onMobileNavigate,
  }: {
    pathname: string;
    onMobileNavigate?: (href: string) => void;
  }) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center px-6 py-4">
          <div className="flex items-center space-x-3">
            <Image
              src={logo}
              alt="logo"
              // use a smaller intrinsic size; Image will serve responsive sizes
              width={160}
              height={48}
              sizes="(max-width: 1024px) 140px, 160px"
              className="object-contain"
              priority={false}
            />
          </div>
        </div>

        <NavItems pathname={pathname} onItemClick={onMobileNavigate} />

        <div className="px-4 py-4 border-t border-gray-200">
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    );
  });

  export default function Sidebar() {
 const pathname = usePathname() ?? '';
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

// Close drawer whenever the route changes
useEffect(() => {
  if (!isMobileMenuOpen) return;
  setIsMobileMenuOpen(false);
}, [pathname, isMobileMenuOpen]);


    // Mobile: perform non-blocking navigation (keeps UI responsive)
    const handleMobileNavigate = (href: string) => {
      if (window.innerWidth < 1024) {
        startTransition(() => {
          router.push(href);
        });
      }
    };

    return (
      <>
        {/* Mobile menu button */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileMenuOpen((s) => !s)}
            className="bg-white shadow-md"
            aria-label="Toggle navigation"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Mobile sidebar */}
        <div
          className={cn(
            "lg:hidden fixed inset-0 z-40 transition-opacity",
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            className={cn(
              "absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl transition-transform will-change-transform",
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <SidebarContent
              pathname={pathname}
              onMobileNavigate={handleMobileNavigate}
            />
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-72 bg-white border-r border-gray-200 z-30">
          <SidebarContent pathname={pathname} />
        </div>
      </>
    );
  }
