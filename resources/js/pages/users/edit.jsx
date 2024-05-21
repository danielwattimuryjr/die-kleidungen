import AuthLayout from '@/Layouts/auth-layout';
import { Button } from '@/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/card';
import Container from '@/components/container';
import { DatePicker } from '@/components/date-picker';
import { Input } from '@/components/input';
import InputError from '@/components/input-error';
import { Label } from '@/components/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/select';
import { Textarea } from '@/components/textarea';
import { getTimeStamp } from '@/lib/get-date';
import { toast } from '@/lib/use-toast';
import { formatDate } from '@/lib/utils';
import { useForm } from '@inertiajs/react';

export default function Edit(props) {
    const { genders, user } = props;

    const { data, setData, patch, processing, errors, reset } = useForm({
        username: user.username,
        email: user.email,

        nama_lengkap: user.nama_lengkap,
        tanggal_lahir: user.tanggal_lahir,
        no_telp: user.no_telp,
        jenis_kelamin: user.jenis_kelamin,
        alamat: user.alamat,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('users.update', user), {
            onSuccess: () => {
                toast({
                    title: 'Yeay!! User has been updated succesfully 🎉',
                    description: getTimeStamp(),
                });
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: 'Uh oh... User update failed 😥',
                    description: getTimeStamp(),
                });
            },
        });
    };

    return (
        <Container className={'lg:mx-auto lg:max-w-5xl'}>
            <Card>
                <CardHeader>
                    <CardTitle>Update User</CardTitle>
                </CardHeader>
                <form onSubmit={submit}>
                    <CardContent>
                        <div>
                            <Label htmlFor='username'>Username</Label>

                            <Input id='username' name='username' value={data.username} className='mt-1 block w-full' autoComplete='username' autoFocus onChange={(e) => setData('username', e.target.value)} />

                            <InputError message={errors.username} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor='email'>Email</Label>

                            <Input id='email' type='email' name='email' value={data.email} className='mt-1 block w-full' autoComplete='username' onChange={(e) => setData('email', e.target.value)} />

                            <InputError message={errors.email} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor='nama_lengkap'>Nama Lengkap</Label>

                            <Input id='nama_lengkap' type='text' name='nama_lengkap' value={data.nama_lengkap} className='mt-1 block w-full' autoComplete='nama_lengkap' onChange={(e) => setData('nama_lengkap', e.target.value)} />

                            <InputError message={errors.nama_lengkap} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor='nama_lengkap'>Tanggal Lahir</Label>

                            <DatePicker placeholder={'Pilih tanggal lahir'} selected={data.tanggal_lahir} onSelect={(e) => setData('tanggal_lahir', formatDate(e))} />

                            <InputError message={errors.tanggal_lahir} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor='no_telp'>Nomor Telepon</Label>

                            <Input id='no_telp' type='tel' name='no_telp' value={data.no_telp} className='mt-1 block w-full' autoComplete='no_telp' onChange={(e) => setData('no_telp', e.target.value)} />

                            <InputError message={errors.no_telp} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor='gender'>Jenis Kelamin</Label>

                            <div className='mt-1 block w-full'>
                                <Select id='gender' onValueChange={(value) => setData('jenis_kelamin', value)} defaultValue={data.jenis_kelamin}>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Pilih Jenis Kelamin' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {genders.map((gender) => (
                                                <SelectItem value={gender.value} key={gender.value}>
                                                    {gender.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <InputError message={errors.no_telp} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor='alamat'>Alamat</Label>

                            <Textarea id='alamat' name='alamat' value={data.alamat} className='mt-1 block w-full' autoComplete='alamat' onChange={(e) => setData('alamat', e.target.value)} />

                            <InputError message={errors.alamat} className='mt-2' />
                        </div>
                    </CardContent>
                    <CardFooter className='flex flex-row-reverse items-center gap-2 pt-6'>
                        <Button disabled={processing}>Update</Button>
                        <Button variant='destructive'>Clear</Button>
                    </CardFooter>
                </form>
            </Card>
        </Container>
    );
}

Edit.layout = (page) => <AuthLayout title={'Products'} children={page} />;
