import EditItemForm from './editItemForm';
import { getItem } from '@/app/action/itemAction';
import { getCategory } from '@/app/action/categoryAction';

export default async function EditItemPage({ params }) {
    const { id } = await params;
    const itemList = await getItem();
    const category = await getCategory();

    const item = itemList.find((b) => b.id === parseInt(id));

    if (!item) {
        return (
            <div>
                <h1 className="text-3xl font-bold text-[#123458] mb-6 border-b-4 border-[#D4C9BE] pb-2">
                    Item Tidak Ditemukan
                </h1>
            </div>
        );
    }

    return <EditItemForm item={item} category={category} />;
}
