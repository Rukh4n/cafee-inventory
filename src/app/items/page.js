import { getItem } from '../action/itemAction';
import { getCategory } from '../action/categoryAction';
import ItemList from './itemList';

export default async function ItemsPage() {
    const item = await getItem();
    const category = await getCategory();

    return (
        <div className="p-6">
            <ItemList item={item} category={category} />
        </div>
    );
}
