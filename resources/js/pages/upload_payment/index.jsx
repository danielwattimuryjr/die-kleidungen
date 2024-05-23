import AuthLayout from '@/Layouts/auth-layout';
import { Button } from '@/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';
import Container from '@/components/container';
import InputError from '@/components/input-error';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import { getTimeStamp } from '@/lib/get-date';
import { toast } from '@/lib/use-toast';
import { formatCurrency } from '@/lib/utils';
import { router, useForm, usePage } from '@inertiajs/react';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import { FilePond, registerPlugin } from 'react-filepond';

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

export default function Index({ order, order_details }) {
    const { csrf_token } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        image: '',
    });

    const handleFilepondLoad = (response) => {
        setData('image', response);
        console.log(data.image);

        return response;
    };

    const handleFilepondRevert = (uniqueFileId, load, error) => {
        reset();

        router.delete(
            route('revert-picture', {
                folder_name: 'proof_of_payment',
                file_name: uniqueFileId,
            }),
        );

        load();
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('payments.store', order), {
            onSuccess: () => {
                toast({
                    title: 'Yeay!! Proof of Payment has been submitted. Please Wait for verification 🎉',
                    description: getTimeStamp(),
                });
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: "Uh oh... Something's wrong. 😥",
                    description: getTimeStamp(),
                });
            },
        });
    };

    const totalSum = order_details.reduce((accumulator, currentItem) => {
        return accumulator + parseInt(currentItem.grand_total);
    }, 0);

    return (
        <AuthLayout title={'Upload Payment'}>
            <Container className={'lg:mx-auto lg:max-w-5xl'}>
                <Card>
                    <CardHeader>
                        <CardTitle>Order Details</CardTitle>
                        <CardDescription>Make sure all the items is correct!</CardDescription>
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
                                {order_details.length > 0 ? (
                                    <>
                                        {order_details.map((order_detail, i) => (
                                            <TableRow key={i}>
                                                <TableCell className='w-0 py-7 text-center'>{i + 1}</TableCell>
                                                <TableCell>{order_detail.product_name}</TableCell>
                                                <TableCell>{formatCurrency(order_detail.harga_satuan)}</TableCell>
                                                <TableCell>{order_detail.qty_order}</TableCell>
                                                <TableCell>{formatCurrency(order_detail.grand_total)}</TableCell>
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
                                <TableRow>
                                    <TableCell colSpan={4}>Total</TableCell>
                                    <TableCell>{formatCurrency(totalSum)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Upload Proof of Payment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit}>
                            <div>
                                <FilePond
                                    allowImagePreview
                                    allowFileTypeValidation
                                    acceptedFileTypes={['image/png', 'image/jpeg']}
                                    name='image'
                                    server={{
                                        url: '',
                                        process: {
                                            url: route('upload-picture', 'proof_of_payment'),
                                            method: 'POST',
                                            onload: handleFilepondLoad,
                                        },
                                        revert: handleFilepondRevert,
                                        headers: {
                                            'X-CSRF-TOKEN': csrf_token,
                                        },
                                    }}
                                />
                                <InputError message={errors.image} className='mt-2' />
                            </div>

                            <Button disabled={processing}>Save</Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </AuthLayout>
    );
}
