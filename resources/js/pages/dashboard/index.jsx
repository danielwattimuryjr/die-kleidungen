import AuthLayout from '@/Layouts/auth-layout';
import { Button } from '@/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';
import Container from '@/components/container';
import { Icon } from '@/components/icon';

export default function Index() {
    return (
        <Container>
            <Card>
                <CardHeader>
                    <CardTitle>Download Customer Report</CardTitle>
                    <CardDescription>
                        Download Monthly Customer Report. Available in <pre>.pdf, .xls, and .csv</pre>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col gap-x-5 lg:flex-row'>
                        <Button asChild>
                            <a
                                href={route('generate-report', {
                                    report_type: 'customers',
                                    file_type: 'pdf',
                                })}>
                                <Icon icon={'IconFileTypePdf'} className={'me-2'} />
                                PDF
                            </a>
                        </Button>
                        <Button asChild>
                            <a
                                href={route('generate-report', {
                                    report_type: 'customers',
                                    file_type: 'xlsx',
                                })}>
                                <Icon icon={'IconFileTypeXls'} className={'me-2'} />
                                XLSX
                            </a>
                        </Button>
                        <Button asChild>
                            <a
                                href={route('generate-report', {
                                    report_type: 'customers',
                                    file_type: 'csv',
                                })}>
                                <Icon icon={'IconFileTypeCsv'} className={'me-2'} />
                                CSV
                            </a>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Download Orders Report</CardTitle>
                    <CardDescription>
                        Download Monthly Orders Report. Available in <pre>.pdf, .xls, and .csv</pre>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col gap-x-5 lg:flex-row'>
                        <Button asChild>
                            <a
                                href={route('generate-report', {
                                    report_type: 'orders',
                                    file_type: 'pdf',
                                })}>
                                <Icon icon={'IconFileTypePdf'} className={'me-2'} />
                                PDF
                            </a>
                        </Button>
                        <Button asChild>
                            <a
                                href={route('generate-report', {
                                    report_type: 'orders',
                                    file_type: 'xlsx',
                                })}>
                                <Icon icon={'IconFileTypeXls'} className={'me-2'} />
                                XLSX
                            </a>
                        </Button>
                        <Button asChild>
                            <a
                                href={route('generate-report', {
                                    report_type: 'orders',
                                    file_type: 'csv',
                                })}>
                                <Icon icon={'IconFileTypeCsv'} className={'me-2'} />
                                CSV
                            </a>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Download Products Report</CardTitle>
                    <CardDescription>
                        Download Monthly Products Report. Available in <pre>.pdf, .xls, and .csv</pre>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col gap-x-5 lg:flex-row'>
                        <Button asChild>
                            <a
                                href={route('generate-report', {
                                    report_type: 'products',
                                    file_type: 'pdf',
                                })}>
                                <Icon icon={'IconFileTypePdf'} className={'me-2'} />
                                PDF
                            </a>
                        </Button>
                        <Button asChild>
                            <a
                                href={route('generate-report', {
                                    report_type: 'products',
                                    file_type: 'xlsx',
                                })}>
                                <Icon icon={'IconFileTypeXls'} className={'me-2'} />
                                XLSX
                            </a>
                        </Button>
                        <Button asChild>
                            <a
                                href={route('generate-report', {
                                    report_type: 'products',
                                    file_type: 'csv',
                                })}>
                                <Icon icon={'IconFileTypeCsv'} className={'me-2'} />
                                CSV
                            </a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Container>
    );
}
Index.layout = (page) => <AuthLayout title={'Dashboard'} children={page} />;
{
    /* <div className='px-2 pb-12 pt-28'>
<Container>
    <div className='max-w-2xl space-y-6'>
        <div className='p-6 text-foreground'>You're logged in!</div>
    </div>
</Container>
</div> */
}
