import AppLayout from '@/Layouts/app-layout';
import ProductCard from '@/components/product-card';

export default function Index() {
    return (
        <div class='mx-auto max-w-screen-xl px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pb-14 lg:pt-28'>
            <header class='text-center'>
                <h2 class='text-xl font-bold text-primary sm:text-3xl'>Product Collection</h2>

                <p class='mx-auto mt-4 max-w-md text-muted-foreground'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit natus?</p>
            </header>

            <ul class='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                {Array.from({ length: 50 }, (_, index) => (
                    <ProductCard />
                ))}
            </ul>
        </div>
    );
}

const collections = [
    {
        title: 'Documentation',
        description: 'Laravel has wonderful documentation covering every aspect of the framework. Whether you are a newcomer or have prior experience with Laravel, we recommend reading our documentation from beginning to end.',
        url: 'https://laravel.com/docs',
    },
    {
        title: 'Laracasts',
        description: 'Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development. Check them out, see for yourself, and massively level up your development skills in the process.',
        url: 'https://laracasts.com',
    },
    {
        title: 'Laravel News',
        description: 'Laravel News is a community driven portal and newsletter aggregating all of the latest and most important news in the Laravel ecosystem, including new package releases and tutorials.',
        url: 'https://laravel-news.com',
    },
    {
        title: 'Vibrant Ecosystem',
        description: 'Laravel robust library of first-party tools and libraries, such as Forge, Vapor , Nova , and Envoyer help you take your projects to the next level. Pair them with powerful open source libraries like Cashier , Dusk , Echo , Horizon , Sanctum , Telescope , and more.',
        url: 'https://laravel.com',
    },
];

function CardLink({ children, ...props }) {
    return (
        <a {...props} className={'duration-250 flex scale-100 rounded-lg border bg-white from-gray-700/50 via-transparent p-6 shadow-sm shadow-gray-500/20 transition-all focus:outline focus:outline-2 focus:outline-red-500 motion-safe:hover:scale-[1.01] dark:bg-gray-800/50 dark:bg-gradient-to-bl dark:shadow-none dark:ring-1 dark:ring-inset dark:ring-white/5'}>
            {children}
        </a>
    );
}

function Template({ children }) {
    return (
        <div className='bg-card pt-10 lg:pt-24'>
            <div className='mx-auto max-w-7xl px-2 py-6 lg:p-8'>
                <div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8'>{children}</div>
            </div>
        </div>
    );
}

function Content({ children }) {
    return <div>{children}</div>;
}

function Title({ children }) {
    return <h2 className='mt-3 text-xl font-semibold text-gray-900 dark:text-white'>{children}</h2>;
}

function Description({ children }) {
    return <p className='mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400'>{children}</p>;
}

Index.layout = (page) => <AppLayout title={'Home'} children={page} />;
