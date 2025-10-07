import { getKategori, deleteKategoriAction } from '../action/kategoriaction';
import AddKategoriForm from './addcategorieform';
import KategoriList from './categorielist';

export default async function KategoriPage() {
    const kategori = await getKategori();
    return (
        <div className="min-h-screen bg-[#F1EFEC] flex flex-col items-center py-10 px-4">
            <h1 className="text-3xl font-bold text-[#123458] mb-6 border-b-4 border-[#D4C9BE] pb-2">
                Daftar Kategori
            </h1>

            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 space-y-6">
                <div className="border-t border-[#D4C9BE] pt-4">
                    <AddKategoriForm />
                </div>
                <KategoriList
                    kategori={kategori}
                    deleteAction={deleteKategoriAction}
                />
            </div>
        </div>
    );
}
