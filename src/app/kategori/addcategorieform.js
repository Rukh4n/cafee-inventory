'use client';

import { useActionState } from 'react';
import { addKategori } from '../action/kategoriaction';

export default function AddKategoriForm() {
    const [state, formAction, pending] = useActionState(addKategori, {
        success: null,
        message: '',
    });

    return (
        <form
            action={formAction}
            className="flex items-center justify-center gap-3 p-5 rounded-xl border shadow-md flex-col"
            style={{ backgroundColor: '#F1EFEC', borderColor: '#D4C9BE' }}
        >
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Nama kategori"
                    className="w-56 px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2"
                    style={{
                        borderColor: '#D4C9BE',
                        color: '#030303',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 0 0 2px transparent',
                    }}
                />

                <button
                    type="submit"
                    disabled={pending}
                    className="px-5 py-2 rounded-lg font-semibold transition-all"
                    style={{
                        backgroundColor: '#123458',
                        color: '#F1EFEC',
                        opacity: pending ? 0.7 : 1,
                    }}
                    onMouseOver={(e) =>
                        (e.target.style.backgroundColor = '#D4C9BE')
                    }
                    onMouseOut={(e) =>
                        (e.target.style.backgroundColor = '#123458')
                    }
                >
                    {pending ? 'Menambah...' : 'Tambah'}
                </button>
            </div>
            {/* ✅ Tampilkan pesan hasil dari action */}
            {state.message && (
                <p
                    className={`text-sm font-medium ${
                        state.success ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                    {state.message}
                </p>
            )}
        </form>
    );
}
