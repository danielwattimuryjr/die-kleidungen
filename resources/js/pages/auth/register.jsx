import GuestLayout from '@/Layouts/guest-layout';
import { Button } from '@/components/button';
import { DatePicker } from '@/components/date-picker';
import { Input } from '@/components/input';
import InputError from '@/components/input-error';
import { Label } from '@/components/label';
import PrimaryLink from '@/components/primary-link';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/select';
import { Textarea } from '@/components/textarea';
import { formatDate } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Register({ genders }) {
    const [step, setStep] = useState(1);

    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',

        nama_lengkap: '',
        tanggal_lahir: formatDate(new Date()),
        no_telp: '',
        jenis_kelamin: '',
        alamat: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submitFirstStep = (e) => {
        e.preventDefault();

        post(route('validate-first-step'), {
            onSuccess: () => setStep(2),
        });
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    console.log(data);

    return (
        <>
            {step == 1 && (
                <form onSubmit={submitFirstStep}>
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
                        <Label htmlFor='password'>Password</Label>

                        <Input id='password' type='password' name='password' value={data.password} className='mt-1 block w-full' autoComplete='new-password' onChange={(e) => setData('password', e.target.value)} />

                        <InputError message={errors.password} className='mt-2' />
                    </div>

                    <div className='mt-4'>
                        <Label htmlFor='password_confirmation'>Confirm Password</Label>

                        <Input id='password_confirmation' type='password' name='password_confirmation' value={data.password_confirmation} className='mt-1 block w-full' autoComplete='new-password' onChange={(e) => setData('password_confirmation', e.target.value)} />

                        <InputError message={errors.password_confirmation} className='mt-2' />
                    </div>

                    <div className='mt-4 flex items-center justify-end'>
                        <PrimaryLink href={route('login')} value={'login?'} />

                        <Button className='ml-4' disabled={processing}>
                            Next
                        </Button>
                    </div>
                </form>
            )}

            {step == 2 && (
                <form onSubmit={submit}>
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
                            <Select id='gender' onValueChange={(value) => setData('jenis_kelamin', value)}>
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

                    <div className='mt-4 flex items-center justify-between'>
                        <Button type='button' variant='destructive' disabled={processing} onClick={() => setStep(1)}>
                            Previous
                        </Button>

                        <div className='flex items-center justify-end'>
                            <PrimaryLink href={route('login')} value={'login?'} />

                            <Button className='ml-4' disabled={processing}>
                                Register
                            </Button>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
}
Register.layout = (page) => <GuestLayout title={'Register'} description={'Haii, Feel free to register'} children={page} />;
