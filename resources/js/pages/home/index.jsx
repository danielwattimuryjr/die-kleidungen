import AppLayout from '@/Layouts/app-layout';
import Container from '@/components/container';
import { Input } from '@/components/input';
import ProductCard from '@/components/product-card';
import { useFilter } from '@/hooks/useFilter';
import { useState } from 'react';

export default function Index(props) {
    const { data: products, meta, links } = props.products;

    const [params, setParams] = useState(props.state);
    useFilter({
        route: route('home'),
        values: params,
        only: ['products'],
    });

    const handleSort = (newField) => {
        let newDirection = params?.direction ?? 'asc';
        const field = params?.field ?? 'created_at';

        if (newField === field) {
            newDirection = newDirection === 'asc' ? 'desc' : 'asc'; // used newDirection
        }

        setParams({ ...params, field: newField, direction: newDirection });
    };

    return (
        <Container>
            <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 lg:pb-14'>
                <header className='text-center'>
                    <h2 className='text-xl font-bold text-primary sm:text-3xl'>Product Collection</h2>

                    <p className='mx-auto mt-4 max-w-md text-muted-foreground'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit natus?</p>
                </header>

                <div className='mx-auto mt-8 w-full md:w-96'>
                    <Input type='text' value={params?.search} onChange={(e) => setParams((prev) => ({ ...prev, search: e.target.value }))} placeholder='Cari Produk' />
                </div>

                {products.length > 0 ? (
                    <ul className='mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                        <>
                            {products.map((product) => (
                                <ProductCard product={product} />
                            ))}
                        </>
                    </ul>
                ) : (
                    <div colSpan={7} className='w-full animate-pulse py-20 text-center text-base font-semibold text-destructive'>
                        No products.
                    </div>
                )}
            </div>
        </Container>
    );
}

Index.layout = (page) => <AppLayout title={'Home'} children={page} />;
