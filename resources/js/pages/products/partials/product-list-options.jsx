import { Button } from '@/components/button';
import { DropdownDialog } from '@/components/dropdown-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { Icon } from '@/components/icon';
import { getTimeStamp } from '@/lib/get-date';
import { toast } from '@/lib/use-toast';
import { Link, useForm } from '@inertiajs/react';

export function ProductListOptions({ product, details = true }) {
    const { delete: destroy, patch } = useForm();

    function destroyProduct(product) {
        destroy(route('products.destroy', product), {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: 'Product has been deleted succesfully',
                    description: getTimeStamp(),
                });
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: 'Uh oh... . Product deletion failed. 😥',
                    description: getTimeStamp(),
                });
            },
        });
    }

    function updateProductStatus(product, new_status) {
        patch(
            route('products.update-status', {
                product: product,
                new_status: new_status ? 0 : 1,
            }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast({
                        title: 'Product status has been updated succesfully',
                        description: getTimeStamp(),
                    });
                },
                onError: () => {
                    toast({
                        variant: 'destructive',
                        title: 'Uh oh... . Product status update failed. 😥',
                        description: getTimeStamp(),
                    });
                },
            },
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className='h-7' variant='outline' size='icon'>
                    <Icon icon={'IconDots'} className={'h-5 w-5 stroke-[1.2]'} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {details ? (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={route('products.show', product)}>
                                <Icon icon={'IconId'} />
                                Details
                            </Link>
                        </DropdownMenuItem>
                    </>
                ) : null}
                <DropdownMenuItem asChild>
                    <Link href={route('products.edit', product)}>
                        <Icon icon={'IconEdit'} />
                        Edit
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownDialog description='This action cannot be undone. This product will not be visible for the customer.' action={() => updateProductStatus(product, product.isActive)} submit_text='Update Status' buttonStyle='destructive'>
                    <Icon icon={product.isActive ? 'IconEyeOff' : 'IconEye'} />
                    {product.isActive ? 'Hide Product' : 'Show Product'}
                </DropdownDialog>

                <DropdownDialog description='This action cannot be undone. This will permanently delete the product and remove data from our servers.' action={() => destroyProduct(product)} submit_text='Delete' buttonStyle='destructive'>
                    <Icon icon={'IconTrash'} />
                    Delete Permanently
                </DropdownDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

{
    /* <DropdownMenuSeparator />
<DropdownMenuSub>
    <DropdownMenuSubTrigger>
        <IconShare className=' mr-2 h-5 w-5 stroke-[1.2]' />
        Share
    </DropdownMenuSubTrigger>
    <DropdownMenuPortal>
        <DropdownMenuSubContent className='w-40'>
            <DropdownMenuItem>
                <IconBrandFacebook className=' mr-2 h-5 w-5 stroke-[1.2]' />
                Facebook
            </DropdownMenuItem>
            <DropdownMenuItem>
                <IconBrandTwitter className=' mr-2 h-5 w-5 stroke-[1.2]' />
                Twitter
            </DropdownMenuItem>
            <DropdownMenuItem>
                <IconBrandTelegram className=' mr-2 h-5 w-5 stroke-[1.2]' />
                Telegram
            </DropdownMenuItem>
        </DropdownMenuSubContent>
    </DropdownMenuPortal>
</DropdownMenuSub>
<DropdownMenuSub>
    <DropdownMenuSubTrigger>
        <IconSend className=' mr-2 h-5 w-5 stroke-[1.2]' />
        Publish
    </DropdownMenuSubTrigger>
    <DropdownMenuPortal>
        <DropdownMenuSubContent className='w-40'>
            <DropdownMenuItem>
                <IconBrandFacebook className=' mr-2 h-5 w-5 stroke-[1.2]' />
                Facebook
            </DropdownMenuItem>
            <DropdownMenuItem>
                <IconBrandTwitter className=' mr-2 h-5 w-5 stroke-[1.2]' />
                Twitter
            </DropdownMenuItem>
            <DropdownMenuItem>
                <IconBrandTelegram className=' mr-2 h-5 w-5 stroke-[1.2]' />
                Telegram
            </DropdownMenuItem>
            <DropdownMenuItem>
                <IconBrandWhatsapp className=' mr-2 h-5 w-5 stroke-[1.2]' />
                Whatsapp
            </DropdownMenuItem>
        </DropdownMenuSubContent>
    </DropdownMenuPortal>
</DropdownMenuSub> */
}
