import { getCategory, deleteCategory } from '@/app/action/categoryAction';
import AddCategoryForm from './addCategoryForm';
import CategoryList from './categoryList';

export default async function CategoryPage() {
  const category = await getCategory();
  return (
    <div className="min-h-screen bg-[#030303] p-4">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-[#F1EFEC] text-2xl font-bold">Daftar Kategori</h1>
        <AddCategoryForm />
      </div>
      <CategoryList category={category} deleteAction={deleteCategory} />
    </div>
  );
}
