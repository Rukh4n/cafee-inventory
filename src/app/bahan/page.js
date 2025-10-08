import { getBahan } from '../action/bahanaction';
import { getKategori } from '../action/kategoriaction';
import BahanList from './bahanlist';

export default async function BahanPage() {
    const bahan = await getBahan();
    const kategori = await getKategori();

    return (
        <div className="p-6">
            <BahanList bahan={bahan} kategori={kategori} />
        </div>
    );
}
