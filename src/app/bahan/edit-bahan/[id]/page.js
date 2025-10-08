import EditBahanForm from './edit-bahan';
import { getBahan } from '@/app/action/bahanaction';
import { getKategori } from '@/app/action/kategoriaction';

export default async function EditBahanPage({ params }) {
    const { id } = await params;
    const bahanList = await getBahan();
    const kategori = await getKategori();

    const bahan = bahanList.find((b) => b.id === parseInt(id));

    if (!bahan) {
        return (
            <div>
                <h1 className="text-3xl font-bold text-[#123458] mb-6 border-b-4 border-[#D4C9BE] pb-2">
                    Bahan Tidak Ditemukan
                </h1>
            </div>
        );
    }

    return <EditBahanForm bahan={bahan} kategori={kategori} />;
}
