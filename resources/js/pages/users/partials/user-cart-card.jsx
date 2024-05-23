import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import { formatCurrency } from '@/lib/utils';

function UserCartCard({ cart_items }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>User Cart Items</CardTitle>
            </CardHeader>
            <CardContent>
                <Table className='mt-5'>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Actual Price</TableHead>
                            <TableHead>Qty.</TableHead>
                            <TableHead>Sub Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cart_items.length > 0 ? (
                            <>
                                {cart_items.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell className='w-0 py-7 text-center'>{i + 1}</TableCell>
                                        <TableCell>{item.nama_produk}</TableCell>
                                        <TableCell>{formatCurrency(item.harga_produk)}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{formatCurrency(item.sub_total)}</TableCell>
                                    </TableRow>
                                ))}
                            </>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className='animate-pulse py-5 text-center text-base font-semibold text-destructive'>
                                    Cart is empty.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default UserCartCard;
