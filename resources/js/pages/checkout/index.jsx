import AuthLayout from '@/Layouts/auth-layout';
import { Button } from '@/components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/card';
import Container from '@/components/container';
import { Input } from '@/components/input';
import InputError from '@/components/input-error';
import { Label } from '@/components/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import { Textarea } from '@/components/textarea';
import { getTimeStamp } from '@/lib/get-date';
import { toast } from '@/lib/use-toast';
import { formatCurrency } from '@/lib/utils';
import { useForm } from '@inertiajs/react';

export default function Index({ cartItems, auth }) {
    const { user } = auth;
    const totalSum = cartItems.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.sub_total;
    }, 0);

    const { data, setData, post, processing, errors, reset } = useForm({
        nama_penerima: user.name,
        no_telp_penerima: user.no_telp,
        alamat_penerima: user.alamat,
        catatan_penerima: '',
        total_belanja: totalSum,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('create-order'), {
            onSuccess: () => {
                toast({
                    title: 'Yeay!! User has been created succesfully 🎉',
                    description: getTimeStamp(),
                });
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: 'Uh oh... User creation failed 😥',
                    description: getTimeStamp(),
                });
            },
        });
    };

    console.log(data);

    return (
        <Container className={'lg:mx-auto lg:max-w-5xl'}>
            <Card>
                <CardHeader>
                    <CardTitle>My Shopping Cart</CardTitle>
                    <CardDescription>Pastikan bahwa barang telah sesuai!</CardDescription>
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
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cartItems.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell className='w-0 py-7 text-center'>{i + 1}</TableCell>
                                    <TableCell>{item.nama_produk}</TableCell>
                                    <TableCell>{formatCurrency(item.harga_produk)}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{formatCurrency(item.sub_total)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Checkout Form</CardTitle>
                </CardHeader>
                <form onSubmit={submit}>
                    <CardContent>
                        <div>
                            <Label htmlFor='nama_penerima'>Nama Penerima</Label>

                            <Input id='nama_penerima' name='nama_penerima' value={data.nama_penerima} className='mt-1 block w-full' autoComplete='nama_penerima' autoFocus onChange={(e) => setData('nama_penerima', e.target.value)} />

                            <InputError message={errors.nama_penerima} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor='no_telp_penerima'>No. Telp. Penerima</Label>

                            <Input id='no_telp_penerima' name='no_telp_penerima' value={data.no_telp_penerima} className='mt-1 block w-full' autoComplete='no_telp_penerima' autoFocus onChange={(e) => setData('no_telp_penerima', e.target.value)} />

                            <InputError message={errors.no_telp_penerima} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor='alamat_penerima'>Alamat Penerima</Label>

                            <Textarea id='alamat_penerima' name='alamat_penerima' value={data.alamat_penerima} className='mt-1 block w-full' autoComplete='alamat_penerima' onChange={(e) => setData('alamat_penerima', e.target.value)} />

                            <InputError message={errors.alamat_penerima} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor='catatan_penerima'>Catatan Penerima</Label>

                            <Textarea id='catatan_penerima' name='catatan_penerima' value={data.catatan_penerima} className='mt-1 block w-full' autoComplete='catatan_penerima' onChange={(e) => setData('catatan_penerima', e.target.value)} />

                            <InputError message={errors.catatan_penerimaa} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor='total_belanja'>Total Belanja</Label>

                            <Input id='total_belanja' name='total_belanja' value={data.total_belanja} className='mt-1 block w-full' autoComplete='total_belanja' autoFocus onChange={(e) => setData('total_belanja', e.target.value)} disabled />

                            <InputError message={errors.total_belanja} className='mt-2' />
                        </div>
                    </CardContent>
                    <CardFooter className='flex flex-row-reverse items-center gap-2 pt-6'>
                        <Button disabled={processing}>Save</Button>
                        <Button type='button' variant='destructive' onClick={() => reset()}>
                            Clear
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </Container>
    );
}

Index.layout = (page) => <AuthLayout title={'Checkout Order'} children={page} />;
