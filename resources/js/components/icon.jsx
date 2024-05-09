import { cn } from '@/lib/utils';
import * as tablerIcons from '@tabler/icons-react';

export function Icon({ className, icon, ...props }) {
    const Icon = tablerIcons[icon];
    return <Icon className={cn('h-5 w-5 stroke-[1.2]', className)} {...props} />;
}
