import { getKategori } from '@/app/action/kategoriaction';
import TambahBahanForm from './tambah-bahan-form';

export default async function TambahBahanPage() {
    const kategori = await getKategori();

    return <TambahBahanForm kategori={kategori} />;
}
