import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';
import { Separator } from '@/components/separator';
import { UserListOptions } from './user-list-options';

const ProfileCard = ({ user }) => {
    return (
        <Card>
            <CardHeader>
                <div className='flex items-start justify-between'>
                    <div>
                        <CardTitle>Profile Detail</CardTitle>
                        <CardDescription>All profile information from this user</CardDescription>
                    </div>
                    <UserListOptions user={user} details={false} />
                </div>
            </CardHeader>
            <CardContent>
                <div className='mt-5 space-y-2'>
                    <Grid>
                        <GridTitle>Email</GridTitle>
                        <GridColon>:</GridColon>
                        <GridValue>{user.email}</GridValue>
                    </Grid>
                    <Grid>
                        <GridTitle>Username</GridTitle>
                        <GridColon>:</GridColon>
                        <GridValue>{user.username}</GridValue>
                    </Grid>
                    <Grid>
                        <GridTitle>Joined</GridTitle>
                        <GridColon>:</GridColon>
                        <GridValue>{user.joined}</GridValue>
                    </Grid>
                    <Grid>
                        <GridTitle>Updated</GridTitle>
                        <GridColon>:</GridColon>
                        <GridValue>{user.updated}</GridValue>
                    </Grid>
                </div>
                <Separator className='my-6' />
                <div className='space-y-2'>
                    <Grid>
                        <GridTitle>Nama Lengkap</GridTitle>
                        <GridColon>:</GridColon>
                        <GridValue>{user.nama_lengkap}</GridValue>
                    </Grid>
                    <Grid>
                        <GridTitle>Tgl. Lahir</GridTitle>
                        <GridColon>:</GridColon>
                        <GridValue>{user.tanggal_lahir}</GridValue>
                    </Grid>
                    <Grid>
                        <GridTitle>No. Telepon</GridTitle>
                        <GridColon>:</GridColon>
                        <GridValue>{user.no_telp}</GridValue>
                    </Grid>
                    <Grid>
                        <GridTitle>Jenis Kelamin</GridTitle>
                        <GridColon>:</GridColon>
                        <GridValue>{user.jenis_kelamin}</GridValue>
                    </Grid>
                    <Grid>
                        <GridTitle>Alamat</GridTitle>
                        <GridColon>:</GridColon>
                        <GridValue>{user.alamat}</GridValue>
                    </Grid>
                </div>
            </CardContent>
        </Card>
    );
};

function Grid({ children }) {
    return <div className='grid grid-cols-12 text-sm'>{children}</div>;
}

function GridTitle({ children }) {
    return <div className='col-span-4 font-medium text-muted-foreground'>{children}</div>;
}

function GridColon({ children }) {
    return <div className='col-span-1 font-medium text-muted-foreground'>{children}</div>;
}

function GridValue({ children }) {
    return <div className='col-span-7 text-primary'>{children}</div>;
}

export default ProfileCard;
