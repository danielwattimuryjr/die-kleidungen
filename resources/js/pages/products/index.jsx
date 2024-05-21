import AuthLayout from '@/Layouts/auth-layout';
import { Avatar, AvatarImage } from '@/components/avatar';
import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/card';
import Container from '@/components/container';
import { Input } from '@/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/select';
import { SimplePagination } from '@/components/simple-pagination';
import { SortIndicator } from '@/components/sort-indicator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import { useFilter } from '@/hooks/useFilter';
import { formatCurrency } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { ProductListOptions } from './partials/product-list-options';

export default function Index(props) {
    const { data: products, meta, links } = props.products;

    const [params, setParams] = useState(props.state);
    useFilter({
        route: route('products.index'),
        values: params,
        only: ['products'],
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
                    <div className='flex flex-col items-start justify-between gap-3 md:flex-row md:items-center'>
                        <div>
                            <CardTitle>Products</CardTitle>
                            <CardDescription>The list of the registered products.</CardDescription>
                        </div>

                        <Button asChild>
                            <Link href={route('products.create')}>Tambah</Link>
                        </Button>
                    </div>
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
                                <TableHead onClick={() => handleSort('nama')}>
                                    <SortIndicator label='nama' column='nama' field={params?.field} direction={params?.direction} />
                                </TableHead>
                                <TableHead onClick={() => handleSort('category')}>
                                    <SortIndicator label='kategori' column='category' field={params?.field} direction={params?.direction} />
                                </TableHead>
                                <TableHead onClick={() => handleSort('stock')}>
                                    <SortIndicator label='stock' column='stock' field={params?.field} direction={params?.direction} />
                                </TableHead>
                                <TableHead onClick={() => handleSort('isActive')}>
                                    <SortIndicator label='status' column='isActive' field={params?.field} direction={params?.direction} />
                                </TableHead>
                                <TableHead onClick={() => handleSort('created_at')}>
                                    <SortIndicator label='created' column='created_at' field={params?.field} direction={params?.direction} />
                                </TableHead>
                                <TableHead onClick={() => handleSort('updated_at')}>
                                    <SortIndicator label='updated' column='updated_at' field={params?.field} direction={params?.direction} />
                                </TableHead>
                                <TableHead />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.length > 0 ? (
                                <>
                                    {products.map((product, i) => (
                                        <TableRow key={i}>
                                            <TableCell className='w-0 py-7 text-center'>{meta.from + i}</TableCell>
                                            <TableCell>
                                                <div className='flex items-center font-normal'>
                                                    <div className='mr-3 shrink-0'>
                                                        <Avatar>
                                                            <AvatarImage src={'https://placehold.co/100'} />
                                                        </Avatar>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <p>{product.nama}</p>
                                                        </div>
                                                        <div className='text-muted-foreground'>{formatCurrency(product.harga)}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{product.category}</TableCell>
                                            <TableCell>{product.stock}</TableCell>
                                            <TableCell>
                                                <Badge variant={product.isActive ? 'default' : 'destructive'}>{product.isActive ? 'Aktif' : 'Non Aktif'}</Badge>
                                            </TableCell>
                                            <TableCell>{product.created_at}</TableCell>
                                            <TableCell>{product.updated_at}</TableCell>
                                            <TableCell>
                                                <div className='flex justify-end'>
                                                    <ProductListOptions product={product} />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className='animate-pulse py-5 text-center text-base font-semibold text-destructive'>
                                        No products.
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

Index.layout = (page) => <AuthLayout title={'Products'} children={page} />;
