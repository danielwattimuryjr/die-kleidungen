function ProductCard(props) {
    const { product } = props;
    return (
        <li>
            <a href='#' className='group block overflow-hidden'>
                <img src='https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' alt='' className='h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]' />

                <div className='relative pt-3'>
                    <h3 className='text-xs text-primary group-hover:underline group-hover:underline-offset-4'>Basic Tee</h3>

                    <p className='mt-2'>
                        <span className='sr-only'> Regular Price </span>

                        <span className='tracking-wider text-muted-foreground'> £24.00 GBP </span>
                    </p>
                </div>
            </a>
        </li>
    );
}

export default ProductCard;
