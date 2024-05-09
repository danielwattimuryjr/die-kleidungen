import { Button } from '@/components/button';
import { DropdownDialog } from '@/components/dropdown-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { Icon } from '@/components/icon';
import { Link, useForm } from '@inertiajs/react';

export function UserListOptions({ user, details = true }) {
    const { delete: destroy } = useForm();

    function destroyUser(user) {
        destroy(route('users.destroy', user), {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: 'User has been deleted succesfully',
                    description: getTimeStamp(),
                });
            },
        });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className='h-7' variant='outline' size='icon'>
                    <Icon icon={'IconDots'} className={'h-5 w-5 stroke-[1.2]'} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {details ? (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={route('users.show', user)}>
                                <Icon icon={'IconId'} />
                                Details
                            </Link>
                        </DropdownMenuItem>
                    </>
                ) : null}
                <DropdownMenuItem asChild>
                    <Link href={route('users.edit', user)}>
                        <Icon icon={'IconEdit'} />
                        Edit
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownDialog description='This action cannot be undone. This will permanently delete user account and remove data from our servers.' action={() => destroyUser(user)} submit_text='Delete' buttonStyle='destructive'>
                    <Icon icon={'IconTrash'} />
                    Delete Permanently
                </DropdownDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
