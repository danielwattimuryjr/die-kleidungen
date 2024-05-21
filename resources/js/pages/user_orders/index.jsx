import AuthLayout from '@/Layouts/auth-layout';
import Container from '@/components/container';

export default function Index() {
    return <Container>orders list</Container>;
}

Index.layout = (page) => <AuthLayout title={'My Orders'} children={page} />;
