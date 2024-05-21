import AppLayout from '@/Layouts/app-layout';
import { Button } from '@/components/button';
import Container from '@/components/container';
import { Icon } from '@/components/icon';
import { Input } from '@/components/input';
import InputError from '@/components/input-error';
import { getTimeStamp } from '@/lib/get-date';
import { toast } from '@/lib/use-toast';
import { formatCurrency } from '@/lib/utils';
import { useForm } from '@inertiajs/react';

function GridTitle({ children }) {
    return <div className='col-span-2 font-medium text-muted-foreground'>{children}</div>;
}

function GridColon({ children }) {
    return <div className='col-span-1 font-medium text-muted-foreground'>{children}</div>;
}

function Grid({ children }) {
    return <div className='grid grid-cols-12 text-sm'>{children}</div>;
}

function GridValue({ children }) {
    return <div className='col-span-7 text-primary'>{children}</div>;
}

export default function Index(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        quantity: 0,
    });

    const { product } = props;

    const addQuantity = (qty) => {
        setData('quantity', data.quantity + qty);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('add-to-cart', product), {
            onSuccess: () => {
                toast({
                    title: 'Yeay!! Product successfully added to your cart 🎉',
                    description: getTimeStamp(),
                });

                reset();
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: "Uh oh... . Something's wrong 😥",
                    description: getTimeStamp(),
                });
            },
        });

        console.log(data);
    };

    return (
        <AppLayout title={`${product.nama}`}>
            <Container>
                <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16'>
                    <div className='grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16'>
                        <div className='w-full'>
                            <img alt='Party' src={product?.gambar || 'https://placehold.co/600x400'} className=' w-full' />
                        </div>

                        <div>
                            <h2 className='text-3xl font-bold sm:text-4xl'>{product.nama}</h2>

                            <div class='mt-10 flow-root'>
                                <dl class='-my-3 divide-y divide-gray-100 text-sm'>
                                    <div class='grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4'>
                                        <dt class='font-medium '>Category</dt>
                                        <dd class=' sm:col-span-2'>{product.category}</dd>
                                    </div>

                                    <div class='grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4'>
                                        <dt class='font-medium '>Harga</dt>
                                        <dd class=' sm:col-span-2'>{formatCurrency(product.harga)}</dd>
                                    </div>

                                    <div class='grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4'>
                                        <dt class='font-medium '>In Stock</dt>
                                        <dd class=' sm:col-span-2'>{product.stock}</dd>
                                    </div>
                                </dl>
                            </div>

                            <p className='mt-10' dangerouslySetInnerHTML={{ __html: product.description }} />

                            <form onSubmit={submit}>
                                <div className='mt-8 flex items-center  gap-4'>
                                    <Button variant='ghost' size='icon' onClick={() => addQuantity(-1)} type='button'>
                                        <Icon icon={'IconMinus'} />
                                    </Button>
                                    <Input id='order_qty' name='order_qty' className='w-20' value={data.quantity} onChange={(e) => setData('quantity', Number(e.target.value))} />
                                    <Button variant='ghost' size='icon' onClick={() => addQuantity(1)} type='button'>
                                        <Icon icon={'IconPlus'} />
                                    </Button>
                                </div>
                                <InputError message={errors.quantity} className='mt-2' />

                                <div className='mt-8'>
                                    <Button disabled={processing}>Add to Cart</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </AppLayout>
    );
}

// Index.layout = (page) => <AppLayout title={`${product.name}`} children={page} />;
