import { Button } from '@/components/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/dialog';
import { DropdownMenuItem } from '@/components/dropdown-menu';
import { Icon } from '@/components/icon';
import { getTimeStamp } from '@/lib/get-date';
import { toast } from '@/lib/use-toast';
import { useForm, usePage } from '@inertiajs/react';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import { FilePond, registerPlugin } from 'react-filepond';

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

function UploadProductImageDialog({ children, product }) {
    const { csrf_token } = usePage().props;
    const { data, setData, patch, processing, errors, reset } = useForm({
        image: '',
    });

    const handleFilepondLoad = (response) => {
        setData('image', response);
        console.log(data.image);

        return response;
    };

    const handleFilepondRevert = (uniqueFileId, load, error) => {
        reset();

        router.delete(
            route('revert-picture', {
                folder_name: 'product_image',
                file_name: uniqueFileId,
            }),
        );

        load();
    };

    const submit = (e) => {
        e.preventDefault();

        patch(route('update-product-image', product), {
            onSuccess: () => {
                toast({
                    title: 'Yeay!! Proof of Payment has been submitted. Please Wait for verification 🎉',
                    description: getTimeStamp(),
                });
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: "Uh oh... Something's wrong. 😥",
                    description: getTimeStamp(),
                });
            },
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                    <Icon icon={'IconUpload'} />
                    Upload New Product Image
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload New Product Image</DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className='py-4'>
                    <FilePond
                        allowImagePreview
                        allowFileTypeValidation
                        acceptedFileTypes={['image/png', 'image/jpeg']}
                        name='image'
                        server={{
                            url: '',
                            process: {
                                url: route('upload-picture', 'product_image'),
                                method: 'POST',
                                onload: handleFilepondLoad,
                            },
                            revert: handleFilepondRevert,
                            headers: {
                                'X-CSRF-TOKEN': csrf_token,
                            },
                        }}
                    />
                    <DialogFooter className={'pt-4'}>
                        <Button disabled={processing}>Update</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default UploadProductImageDialog;
