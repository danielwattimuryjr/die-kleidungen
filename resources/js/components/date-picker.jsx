'use client';

import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from './button';
import { Calendar } from './calendar';
import { Icon } from './icon';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export function DatePicker({ placeholder, onSelect, selected }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={'outline'} className={cn('mt-1  flex h-9 w-full items-center justify-start px-3 py-1 text-left font-normal', !selected && 'text-muted-foreground')}>
                    <Icon icon={'IconCalendar'} className={'mr-2'} />
                    {selected ? format(selected, 'PPP') : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
                <Calendar mode='single' selected={selected} onSelect={onSelect} initialFocus />
            </PopoverContent>
        </Popover>
    );
}
