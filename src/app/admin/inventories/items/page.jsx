import { getItem } from '@/app/action/itemAction';
import { getCategory } from '@/app/action/categoryAction';
import ItemList from './itemList';

export default async function ItemsPage() {
    const item = await getItem();
    const category = await getCategory();

    return (
        <div className='bg-[#030303]'>
            <ItemList item={item} category={category} />
        </div>
    );
}
