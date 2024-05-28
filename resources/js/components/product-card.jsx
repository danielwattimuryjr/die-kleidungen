import { formatCurrency } from '@/lib/utils';
import { Link } from '@inertiajs/react';

function ProductCard(props) {
    const { product } = props;
    console.log(product);

    return (
        <li>
            <Link href={route('product-detail', product)} className='group block overflow-hidden'>
                <img src={product.image_url || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'} alt={product.nama} className='h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]' />

                <div className='relative pt-3'>
                    <h3 className='text-xs text-primary group-hover:underline group-hover:underline-offset-4'>{`${product.nama} (${product.stock})`}</h3>

                    <p className='mt-2'>
                        <span className='sr-only'> Regular Price </span>

                        <span className='tracking-wider text-muted-foreground'>{formatCurrency(product.harga)}</span>
                    </p>
                </div>
            </Link>
        </li>
    );
}

export default ProductCard;
