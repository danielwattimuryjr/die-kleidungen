import AuthLayout from '@/Layouts/auth-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/card';
import Container from '@/components/container';
import { Input } from '@/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/select';
import { SimplePagination } from '@/components/simple-pagination';
import { SortIndicator } from '@/components/sort-indicator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import { useFilter } from '@/hooks/useFilter';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import PaymentListOption from './partials/payment-list-options';

function Index(props) {
    const { data: payments, meta, links } = props.payments;
    const [params, setParams] = useState(props.state);

    useFilter({
        route: route('payments.index'),
        values: params,
        only: ['payments'],
    });

    const handleSort = (newField) => {
        let newDirection = params?.direction ?? 'asc';
        const field = params?.field ?? 'created_at';

        if (newField === field) {
            newDirection = newDirection === 'asc' ? 'desc' : 'asc'; // used newDirection
        }

        setParams({ ...params, field: newField, direction: newDirection });
    };

    return (
        <AuthLayout title={'Payments'}>
            <Container className={'lg:mx-auto lg:max-w-5xl'}>
                <Card>
                    <CardHeader>
                        <CardTitle>Payments</CardTitle>
                        <CardDescription>The list of the registered payments.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='mb-3 flex items-center justify-between'>
                            <div>
                                <Select value={params?.limit} onValueChange={(e) => setParams({ ...params, limit: e })}>
                                    <SelectTrigger className='w-[180px]'>
                                        <SelectValue placeholder={params?.limit ?? 10} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='10'>10</SelectItem>
                                        <SelectItem value='25'>25</SelectItem>
                                        <SelectItem value='50'>50</SelectItem>
                                        <SelectItem value='75'>75</SelectItem>
                                        <SelectItem value='100'>100</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='w-72'>
                                <Input type='text' value={params?.search} onChange={(e) => setParams((prev) => ({ ...prev, search: e.target.value }))} placeholder='Pencarian...' />
                            </div>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='w-[50px] text-center'>#</TableHead>
                                    <TableHead onClick={() => handleSort('order_id')}>
                                        <SortIndicator label='Order ID' column='order_id' field={params?.field} direction={params?.direction} />
                                    </TableHead>
                                    <TableHead onClick={() => handleSort('image_name')}>
                                        <SortIndicator label='Image' column='image_name' field={params?.field} direction={params?.direction} />
                                    </TableHead>
                                    <TableHead onClick={() => handleSort('status')}>
                                        <SortIndicator label='status' column='status' field={params?.field} direction={params?.direction} />
                                    </TableHead>
                                    <TableHead onClick={() => handleSort('created_at')}>
                                        <SortIndicator label='created at' column='created_at' field={params?.field} direction={params?.direction} />
                                    </TableHead>
                                    <TableHead />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payments.length > 0 ? (
                                    <>
                                        {payments.map((payment, i) => (
                                            <TableRow key={i}>
                                                <TableCell className='w-0 py-7 text-center'>{meta.from + i}</TableCell>

                                                <TableCell>
                                                    <Link href={route('show-order-details', payment.order_id)}>{payment.order_id}</Link>
                                                </TableCell>
                                                <TableCell>
                                                    <a href={payment.url} target='_blank' rel='noopener noreferrer'>
                                                        {payment.image_name}
                                                    </a>
                                                </TableCell>
                                                <TableCell>{payment.status}</TableCell>
                                                <TableCell>{payment.created_at}</TableCell>
                                                <TableCell>
                                                    <PaymentListOption payment={payment} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className='animate-pulse py-5 text-center text-base font-semibold text-destructive'>
                                            No payments.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className='flex items-center justify-between pt-6'>
                        <SimplePagination links={links} meta={meta} />
                    </CardFooter>
                </Card>
            </Container>
        </AuthLayout>
    );
}

export default Index;
