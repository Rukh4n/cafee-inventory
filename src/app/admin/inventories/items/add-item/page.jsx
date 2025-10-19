import { getCategory } from '@/app/action/categoryAction';
import AddItemForm from './addItemForm';

export default async function AddItemPage() {
    const category = await getCategory();

    return <AddItemForm category={category} />;
}
