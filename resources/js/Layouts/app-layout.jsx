import { Toaster } from '@/components/toaster';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import NavigationMenu from './navigation/navigation';
import ResponsiveNavigation from './navigation/responsive-navigation';

export default function AppLayout({ title, children }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Head title={title} />
            <main>
                <ResponsiveNavigation openCommandPalette={open} setOpenCommandPalette={setOpen} />
                <NavigationMenu openCommandPalette={open} setOpenCommandPalette={setOpen} />
                {children}
            </main>
            <Toaster />
        </>
    );
}
