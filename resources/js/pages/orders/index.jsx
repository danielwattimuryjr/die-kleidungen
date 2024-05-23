import AuthLayout from '@/Layouts/auth-layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/card';
import Container from '@/components/container';
import { Input } from '@/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/select';
import { SimplePagination } from '@/components/simple-pagination';
import { SortIndicator } from '@/components/sort-indicator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import { useFilter } from '@/hooks/useFilter';
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';
import { OrderListOptions } from './partials/order-list-option';

export default function Index(props) {
    const { data: orders, meta, links } = props.orders;
    const [params, setParams] = useState(props.state);

    useFilter({
        route: route('orders.index'),
        values: params,
        only: ['orders'],
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
        <Container className={'lg:mx-auto lg:max-w-5xl'}>
            <Card>
                <CardHeader>
                    <CardTitle>All Orders</CardTitle>
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
                                <TableHead onClick={() => handleSort('nama_penerima')}>
                                    <SortIndicator label='Receiver Name' column='nama_penerima' field={params?.field} direction={params?.direction} />
                                </TableHead>
                                <TableHead onClick={() => handleSort('total_belanja')}>
                                    <SortIndicator label='Total' column='total_belanja' field={params?.field} direction={params?.direction} />
                                </TableHead>
                                <TableHead onClick={() => handleSort('status')}>
                                    <SortIndicator label='status' column='status' field={params?.field} direction={params?.direction} />
                                </TableHead>
                                <TableHead onClick={() => handleSort('created_at')}>
                                    <SortIndicator label='created_at' column='created_at' field={params?.field} direction={params?.direction} />
                                </TableHead>
                                <TableHead />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.length > 0 ? (
                                <>
                                    {orders.map((order, i) => (
                                        <TableRow key={i}>
                                            <TableCell className='w-0 py-7 text-center'>{meta.from + i}</TableCell>
                                            <TableCell>{order.nama_penerima}</TableCell>
                                            <TableCell>{formatCurrency(order.total_belanja)}</TableCell>
                                            <TableCell>{order.status}</TableCell>
                                            <TableCell>{order.created_at}</TableCell>
                                            <TableCell>
                                                <OrderListOptions order={order} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className='animate-pulse py-5 text-center text-base font-semibold text-destructive'>
                                        No Orders
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
    );
}

Index.layout = (page) => <AuthLayout title={'My Orders'} children={page} />;
