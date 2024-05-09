import AuthLayout from '@/Layouts/auth-layout';
import { Button } from '@/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import Container from '@/components/container';
import { formatCurrency } from '@/lib/utils';
import { Link } from '@inertiajs/react';

export default function Show(props) {
    const { product } = props;

    return (
        <Container className={'lg:mx-auto lg:max-w-5xl'}>
            <Card>
                <CardHeader>
                    <div className='flex flex-col items-start justify-between gap-3 md:flex-row md:items-center'>
                        <CardTitle>Update Product</CardTitle>

                        <Button asChild>
                            <Link href={route('products.edit', product)}>Update</Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div class='grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8'>
                        <div>
                            <img src={'https://placehold.co/300'} className='m-auto' />
                        </div>
                        <div class='lg:col-span-2'>
                            <h1 class='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>{product.nama}</h1>

                            <div class='mt-10 flow-root'>
                                <dl class='-my-3 divide-y divide-gray-100 text-sm'>
                                    <div class='grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4'>
                                        <dt class='font-medium text-gray-900'>Category</dt>
                                        <dd class='text-gray-700 sm:col-span-2'>{product.category}</dd>
                                    </div>

                                    <div class='grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4'>
                                        <dt class='font-medium text-gray-900'>Harga</dt>
                                        <dd class='text-gray-700 sm:col-span-2'>{formatCurrency(product.harga)}</dd>
                                    </div>

                                    <div class='grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4'>
                                        <dt class='font-medium text-gray-900'>In Stock</dt>
                                        <dd class='text-gray-700 sm:col-span-2'>{product.stock}</dd>
                                    </div>

                                    <div class='grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4'>
                                        <dt class='font-medium text-gray-900'>Is Visible?</dt>
                                        <dd class='text-gray-700 sm:col-span-2'>
                                            <p className={product.isActive ? 'text-[#25a34a]' : 'text-destructive'}>{product.isActive ? 'Yes' : 'No'}</p>
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div class='mt-8 lg:col-span-2 lg:col-start-1 lg:pb-8 lg:pr-8 lg:pt-6'>
                                <h3 className='sr-only'>Description</h3>
                                <div class='space-y-6'>
                                    <p class='text-base text-gray-900' dangerouslySetInnerHTML={{ __html: product.description }} className='ProseMirror'></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Container>
    );
}

Show.layout = (page) => <AuthLayout title={'Products'} children={page} />;
