import AuthLayout from '@/Layouts/auth-layout';
import { Button } from '@/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/card';
import Container from '@/components/container';
import { Input } from '@/components/input';
import InputError from '@/components/input-error';
import { Label } from '@/components/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/select';
import Tiptap from '@/components/tiptap';
import { getTimeStamp } from '@/lib/get-date';
import { toast } from '@/lib/use-toast';
import { useForm } from '@inertiajs/react';

export default function Create(props) {
    const { categories } = props;

    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '',
        stock: 1,
        harga: 0,
        category: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('products.store'), {
            onSuccess: () => {
                toast({
                    title: 'Yeay!! Product has been created succesfully 🎉',
                    description: getTimeStamp(),
                });
            },
            onError: () => {
                toast({
                    title: 'Uh oh... . Product creation failed 😥',
                    description: getTimeStamp(),
                });
            },
        });
    };

    return (
        <Container className={'lg:mx-auto lg:max-w-5xl'}>
            <Card>
                <CardHeader>
                    <CardTitle>Create Product</CardTitle>
                </CardHeader>
                <form onSubmit={submit}>
                    <CardContent>
                        <div>
                            <Label htmlFor='nama' className={'capitalize'}>
                                nama produk
                            </Label>

                            <Input id='nama' type='text' name='nama' value={data.nama} className='mt-1 block w-full' autoComplete='username' autoFocus onChange={(e) => setData('nama', e.target.value)} />

                            <InputError message={errors.nama} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor='kategori' className={'capitalize'}>
                                Kategori Produk
                            </Label>

                            <Select id='kategori' onValueChange={(value) => setData('category', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder='Pilih kategori' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {categories.map((category) => (
                                            <SelectItem value={category.value}>{category.label}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <InputError message={errors.category} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor='stock' className={'capitalize'}>
                                In Stock
                            </Label>

                            <Input id='stock' type='number' name='stock' value={data.stock} className='mt-1 block w-full' autoComplete='username' autoFocus onChange={(e) => setData('stock', e.target.value)} min={0} />

                            <InputError message={errors.stock} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor='nama' className={'capitalize'}>
                                harga Produk
                            </Label>

                            <Input id='harga' type='number' name='harga' value={data.harga} className='mt-1 block w-full' autoComplete='username' autoFocus onChange={(e) => setData('harga', e.target.value)} min={0} />

                            <InputError message={errors.harga} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor='deskripsi' className={'capitalize'}>
                                deskripsi produk
                            </Label>

                            <Tiptap
                                description={data.description}
                                onChange={(content) => {
                                    setData('description', content);
                                    console.log(content);
                                }}
                                error={errors?.description}
                            />

                            <InputError message={errors.description} className='mt-2' />
                        </div>
                    </CardContent>
                    <CardFooter className='flex flex-row-reverse items-center gap-2 pt-6'>
                        <Button>Save</Button>
                        <Button variant='destructive'>Clear</Button>
                    </CardFooter>
                </form>
            </Card>
        </Container>
    );
}

Create.layout = (page) => <AuthLayout title={'Products'} children={page} />;
