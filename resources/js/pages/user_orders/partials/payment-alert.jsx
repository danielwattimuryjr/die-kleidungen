import { Alert, AlertDescription, AlertTitle } from '@/components/alert';
import { Icon } from '@/components/icon';
import { Link } from '@inertiajs/react';

const PaymentAlert = ({ order }) => {
    return (
        <>
            {order.original_status === 'canceled' ? (
                <Alert variant='destructive'>
                    <Icon icon={'IconX'} />
                    <AlertTitle>Order Canceled</AlertTitle>
                    <AlertDescription>This order has been canceled.</AlertDescription>
                </Alert>
            ) : order.original_status === 'delivered' ? (
                <Alert>
                    <Icon icon={'IconCircleCheck'} />
                    <AlertTitle>Order Delivered</AlertTitle>
                    <AlertDescription>This order has been successfully delivered.</AlertDescription>
                </Alert>
            ) : order.payment ? null : ( // No alert component if payment is true
                <Alert>
                    <Icon icon={'IconInfoCircle'} />
                    <AlertTitle>Head's Up, Kido!! 📣</AlertTitle>
                    <AlertDescription>
                        <p>Your payment is pending. Please complete the payment process.</p>
                        <Link href={route('open-upload-payment', order)} target='_blank' rel='noopener noreferrer' className='text-blue-500 underline'>
                            Click here to make the payment
                        </Link>
                    </AlertDescription>
                </Alert>
            )}
        </>
    );
};

export default PaymentAlert;
