import { Button } from '@/components/button';
import { DropdownDialog } from '@/components/dropdown-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { Icon } from '@/components/icon';
import { getTimeStamp } from '@/lib/get-date';
import { toast } from '@/lib/use-toast';
import { useForm } from '@inertiajs/react';

function PaymentListOption({ payment, details = false }) {
    const { patch } = useForm();

    function updatePaymentStatus(status) {
        patch(
            route('payments.update', {
                payment: payment,
                status: status,
            }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast({
                        title: 'The Payment has been approved.',
                        description: getTimeStamp(),
                    });
                },
                onError: () => {
                    toast({
                        variant: 'destructive',
                        title: 'The Payment has been rejected.',
                        description: getTimeStamp(),
                    });
                },
            },
        );
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
                <DropdownMenuItem asChild>
                    <DropdownDialog description='This action cannot be undone.' action={() => updatePaymentStatus(0)} submit_text='Approve It'>
                        <Icon icon={'IconCheck'} />
                        Approve
                    </DropdownDialog>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownDialog description='This action cannot be undone.' action={() => updatePaymentStatus(1)} submit_text='Reject it' buttonStyle='destructive'>
                    <Icon icon={'IconX'} />
                    Reject
                </DropdownDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default PaymentListOption;
