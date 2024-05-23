import AuthLayout from '@/Layouts/auth-layout';
import { Button } from '@/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/card';
import Container from '@/components/container';
import { Icon } from '@/components/icon';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import { getTimeStamp } from '@/lib/get-date';
import { toast } from '@/lib/use-toast';
import { formatCurrency } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';

export default function Index({ cartItems: items }) {
    const removeFromCart = (e, id) => {
        e.preventDefault();
        router.delete(route('remove-from-cart', { product: id }), {
            onSuccess: () => {
                toast({
                    title: 'Yeay!! Product has been removed from your cart 🎉',
                    description: getTimeStamp(),
                });
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: "Uh oh... . Something's wrong 😥",
                    description: getTimeStamp(),
                });
            },
        });
    };

    return (
        <Container className={'lg:mx-auto lg:max-w-5xl'}>
            <Card>
                <CardHeader>
                    <div className='flex flex-col items-start justify-between gap-3 md:flex-row md:items-center'>
                        <div>
                            <CardTitle>My Shopping Cart</CardTitle>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Actual Price</TableHead>
                                <TableHead>Qty.</TableHead>
                                <TableHead>Sub Total</TableHead>
                                <TableHead />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.length > 0 ? (
                                <>
                                    {items.map((item, i) => (
                                        <TableRow key={i}>
                                            <TableCell className='w-0 py-7 text-center'>{i + 1}</TableCell>
                                            <TableCell>{item.nama_produk}</TableCell>
                                            <TableCell>{formatCurrency(item.harga_produk)}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>{formatCurrency(item.sub_total)}</TableCell>
                                            <TableCell>
                                                <Button type='button' onClick={(e) => removeFromCart(e, item.id)} variant='outline' size='icon'>
                                                    <Icon icon={'IconTrash'} className={'text-destructive'} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className='animate-pulse py-5 text-center text-base font-semibold text-destructive'>
                                        Cart is empty.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
                {items.length > 0 && (
                    <CardFooter className='flex w-full  justify-end pt-6'>
                        <Button asChild>
                            <Link href={route('open-checkout-form')}>Checkout Now</Link>
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </Container>
    );
}

Index.layout = (page) => <AuthLayout title={'Users'} children={page} />;
