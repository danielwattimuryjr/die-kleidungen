import AuthLayout from '@/Layouts/auth-layout';
import Container from '@/components/container';
import ProfileCard from './partials/profile-card';
import UserCartCard from './partials/user-cart-card';

export default function Show({ user, cart_items, orders, state }) {
    return (
        <Container>
            <ProfileCard user={user} />
            <UserCartCard cart_items={cart_items} />
        </Container>
    );
}

Show.layout = (page) => <AuthLayout title={'User Detail'} children={page} />;
