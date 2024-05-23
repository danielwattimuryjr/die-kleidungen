import AuthLayout from '@/Layouts/auth-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';
import Container from '@/components/container';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import { formatCurrency } from '@/lib/utils';
import { OrderListOptions } from './partials/order-list-options';
import PaymentAlert from './partials/payment-alert';

export default function Show({ order, order_details }) {
    console.log(order);
    return (
        <Container>
            <PaymentAlert order={order} />
            <Card className={'mx-auto lg:mx-0'}>
                <CardHeader>
                    <div className='flex items-start justify-between'>
                        <div>
                            <CardTitle>Order Details</CardTitle>
                            <CardDescription>{`Was ordered ${order.created_at}`}</CardDescription>
                        </div>
                        <OrderListOptions order={order} details={false} />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className='my-5 space-y-2'>
                        <Grid>
                            <GridTitle>Order Status</GridTitle>
                            <GridColon>:</GridColon>
                            <GridValue>{order.status}</GridValue>
                        </Grid>
                        <Grid>
                            <GridTitle>Grand Total</GridTitle>
                            <GridColon>:</GridColon>
                            <GridValue>{formatCurrency(order.total_belanja)}</GridValue>
                        </Grid>
                        {order.payment && (
                            <Grid>
                                <GridTitle>Proof of Payment</GridTitle>
                                <GridColon>:</GridColon>
                                <GridValue>
                                    <div className='flex flex-col gap-2'>
                                        <p>{order.payment.status}</p>
                                        <a href={order.payment.url} target='_blank' rel='noopener noreferrer'>
                                            {order.payment.image_name}
                                        </a>
                                    </div>
                                </GridValue>
                            </Grid>
                        )}
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>product Name</TableHead>
                                <TableHead>Actual Price</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Sub Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order_details.map((order_detail, i) => (
                                <TableRow key={i}>
                                    <TableCell className='w-0 py-7 text-center'>{i + 1}</TableCell>
                                    <TableCell>{order_detail.product_name}</TableCell>
                                    <TableCell>{formatCurrency(order_detail.harga_satuan)}</TableCell>
                                    <TableCell>{order_detail.qty_order}</TableCell>
                                    <TableCell>{formatCurrency(order_detail.grand_total)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Container>
    );
}

function Grid({ children }) {
    return <div className='grid grid-cols-12 text-sm'>{children}</div>;
}

function GridTitle({ children }) {
    return <div className='col-span-4 font-medium text-muted-foreground'>{children}</div>;
}

function GridColon({ children }) {
    return <div className='col-span-1 font-medium text-muted-foreground'>{children}</div>;
}

function GridValue({ children }) {
    return <div className='col-span-7 text-primary'>{children}</div>;
}

Show.layout = (page) => <AuthLayout title={'User Detail'} children={page} />;
