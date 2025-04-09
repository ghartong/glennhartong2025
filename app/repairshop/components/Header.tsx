import { HomeIcon, File, UsersRound, LogOut } from 'lucide-react';
import Link from 'next/link';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { Button } from '@/components/ui/button';

import { NavButton } from './NavButton';
import { ModeToggle } from '@/components/modeToggle';

function Header() {
    return (
        <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20 w-full">
            <div className="flex h-8 items-center justify-between w-full">
                <div className="flex items-center gap-2">
                    <NavButton href="/repairshop/" label="Home" icon={HomeIcon} />

                    <Link href="/repairshop" className="flex justify-center items-center gap-2 ml-0" title="Home">
                        <h1 className="hidden sm:block text-xl font-bold m-0 mt-1">
                            Computer Repair Shop
                        </h1>
                    </Link>
                </div>
                <div className="flex items-center">
                    <NavButton href="/repairshop/tickets" label="Tickets" icon={File} />
                    <NavButton href="/repairshop/customers" label="Customers" icon={UsersRound} />
                    <ModeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Log out"
                        title="Logout"
                        className="rounded-full"
                        asChild
                    >
                        <LogoutLink>
                            <LogOut />
                        </LogoutLink>
                    </Button>

                </div>
            </div>
        </header>
    );
}

export default Header;