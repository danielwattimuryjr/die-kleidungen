import { Button } from '@/components/button';
import { DropdownDialog } from '@/components/dropdown-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { Icon } from '@/components/icon';
import { getTimeStamp } from '@/lib/get-date';
import { toast } from '@/lib/use-toast';
import { Link, useForm, usePage } from '@inertiajs/react';

export function OrderListOptions({ order, details = true }) {
    const { delete: destroy, patch } = useForm();
    const { auth } = usePage().props;

    function cancelOrder(order) {
        patch(route('cancel-order', order), {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: 'Order has been canceled 🎉',
                    description: getTimeStamp(),
                });
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: 'Uh oh... Cannot cancel your order right now. 😥',
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
                            <Link href={route('show-order-details', order)}>
                                <Icon icon={'IconId'} />
                                Details
                            </Link>
                        </DropdownMenuItem>
                    </>
                ) : null}
                {order.original_status === 'pending' && (order.payment === null || order.payment === false) && (
                    <DropdownMenuItem asChild>
                        <Link href={route('open-upload-payment', { order: order })}>
                            <Icon icon={'IconUpload'} />
                            Upload Proof of Payment
                        </Link>
                    </DropdownMenuItem>
                )}
                {order.original_status === 'pending' && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownDialog description='This action cannot be undone. This will cancel your order.' action={() => cancelOrder(order)} submit_text='Cancel It' buttonStyle='destructive'>
                            <Icon icon={'IconX'} />
                            Cancel Order
                        </DropdownDialog>
                    </>
                )}
                {/* {auth.user.isAdmin && order.original_status === 'canceled' && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownDialog description='This action cannot be undone. This will remove your order from the system record.' action={() => destroyOrder()} submit_text='Yes' buttonStyle='destructive'>
                            <Icon icon={'IconTrash'} />
                            Delete Order
                        </DropdownDialog>
                    </>
                )}

                {auth.user.isAdmin && order.original_status === 'processing' && (
                    <>
                        <DropdownDialog
                            description={
                                <>
                                    This action cannot be undone. This will update the order status into <pre>shipping</pre>
                                </>
                            }
                            action={() => updateOrderStatus(2)}
                            submit_text='Yes'>
                            <Icon icon={'IconCubeSend'} />
                            Set status to shipping
                        </DropdownDialog>
                    </>
                )}

                {auth.user.isAdmin && order.original_status === 'shipped' && (
                    <>
                        <DropdownDialog
                            description={
                                <>
                                    This action cannot be undone. This will update the order status into <pre>delivered</pre>
                                </>
                            }
                            action={() => updateOrderStatus(3)}
                            submit_text='Yes'>
                            <Icon icon={'IconCheck'} />
                            Set status to delivered
                        </DropdownDialog>
                    </>
                )} */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
