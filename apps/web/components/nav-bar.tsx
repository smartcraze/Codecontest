'use client'

import * as React from 'react'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { ModeToggle } from './mode-toggler'

const Logo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 324 323"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="88.1023"
        y="144.792"
        width="151.802"
        height="36.5788"
        rx="18.2894"
        transform="rotate(-38.5799 88.1023 144.792)"
        fill="currentColor"
      />
      <rect
        x="85.3459"
        y="244.537"
        width="151.802"
        height="36.5788"
        rx="18.2894"
        transform="rotate(-38.5799 85.3459 244.537)"
        fill="currentColor"
      />
    </svg>
  )
}

// Hamburger Icon
const HamburgerIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn('pointer-events-none', className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] 
      group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] 
      group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] 
      group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
)

// Types
export interface Navbar01NavLink {
  href: string
  label: string
  active?: boolean
}
export interface Navbar01Props extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode
  logoHref?: string
  navigationLinks?: Navbar01NavLink[]
  signInText?: string
  signInHref?: string
  ctaText?: string
  ctaHref?: string
}

const defaultNavigationLinks: Navbar01NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/contests', label: 'Contests' },
  { href: '/showcase', label: 'Showcase' },
  { href: '/demo', label: 'Demo' },
  { href: '/leaderboard', label: 'Leaderboard' },
]
export const Navbar01 = React.forwardRef<HTMLElement, Navbar01Props>(
  (
    {
      className,
      logo = <Logo />,
      logoHref = '/',
      navigationLinks = defaultNavigationLinks,
      signInText = 'Sign In',
      signInHref = '/signin',
      ctaText = 'Get Started',
      ctaHref = '/get-started',
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false)
    const containerRef = useRef<HTMLElement>(null)

    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          setIsMobile(containerRef.current.offsetWidth < 768)
        }
      }
      checkWidth()
      const resizeObserver = new ResizeObserver(checkWidth)
      if (containerRef.current) resizeObserver.observe(containerRef.current)
      return () => resizeObserver.disconnect()
    }, [])

    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref)
          (ref as React.MutableRefObject<HTMLElement | null>).current = node
      },
      [ref]
    )

    return (
      <header
        ref={combinedRef}
        className={cn(
          'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline',
          className
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-2">
            {/* Mobile popover */}
            {isMobile && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                    variant="ghost"
                    size="icon"
                  >
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-48 p-2">
                  <NavigationMenu className="max-w-none">
                    <NavigationMenuList className="flex-col items-start gap-1">
                      {navigationLinks.map((link) => (
                        <NavigationMenuItem key={link.href} className="w-full">
                          <Button
                            asChild
                            variant={link.active ? 'default' : 'ghost'}
                            className="w-full justify-start px-3 py-2 text-sm font-medium"
                          >
                            <Link href={link.href}>{link.label}</Link>
                          </Button>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            )}

            <div className="flex items-center gap-6">
              <Button
                asChild
                variant="link"
                className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors"
              >
                <Link href={logoHref}>
                  <div className="text-2xl">{logo}</div>
                  <span className="hidden font-bold text-xl sm:inline-block">
                    Codecontest
                  </span>
                </Link>
              </Button>

              {!isMobile && (
                <NavigationMenu className="flex">
                  <NavigationMenuList className="gap-1">
                    {navigationLinks.map((link) => (
                      <NavigationMenuItem key={link.href}>
                        <Button
                          asChild
                          variant={link.active ? 'default' : 'ghost'}
                          className="inline-flex h-9 px-4 py-2 text-sm font-medium"
                        >
                          <Link href={link.href}>{link.label}</Link>
                        </Button>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <ModeToggle />
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              <Link href={signInHref}>{signInText}</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="text-sm font-medium px-4 h-9 rounded-md shadow-sm"
            >
              <Link href={ctaHref}>{ctaText}</Link>
            </Button>
          </div>
        </div>
      </header>
    )
  }
)
Navbar01.displayName = 'Navbar01'

export { Logo, HamburgerIcon }
