'use client';

import { useActionState } from 'react';
import { updateCategory } from '@/app/action/categoryAction';
import { useEffect } from 'react';

export default function EditCategoryForm({ category, onCancel }) {
    const [state, formAction, pending] = useActionState(updateCategory, {
        success: null,
        message: '',
    });

    useEffect(() => {
        if (state.success) {
            const timer = setTimeout(() => {
                onCancel();
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [state.success, onCancel]);

    return (
        <form
            action={formAction}
            className="mt-3 flex flex-col sm:flex-row items-center gap-2 p-3 rounded-lg shadow-md"
            style={{ backgroundColor: '#030303' }}
        >
            {/* Hidden ID */}
            <input type="hidden" name="id" value={category.id} />

            {/* Nama kategori */}
            <input
                type="text"
                name="name"
                defaultValue={category.name}
                placeholder="Masukkan nama kategori"
                className="flex-1 p-2 rounded-md border border-[#D4C9BE] focus:outline-none focus:ring-2 focus:ring-[#D4C9BE]"
                style={{
                    backgroundColor: '#030303',
                    color: '#F1EFEC',
                }}
            />

            <div className="flex gap-2 mt-2 sm:mt-0">
                <button
                    type="submit"
                    disabled={pending}
                    className="px-4 py-2 rounded-md font-semibold transition-all"
                    style={{
                        backgroundColor: '#D4C9BE',
                        color: '#030303',
                        opacity: pending ? 0.7 : 1,
                    }}
                    onMouseOver={(e) =>
                        (e.target.style.backgroundColor = '#F1EFEC')
                    }
                    onMouseOut={(e) =>
                        (e.target.style.backgroundColor = '#D4C9BE')
                    }
                >
                    {pending ? 'Menyimpan...' : 'Simpan'}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 rounded-md font-semibold transition-all"
                    style={{
                        backgroundColor: '#D4C9BE',
                        color: '#030303',
                    }}
                    onMouseOver={(e) =>
                        (e.target.style.backgroundColor = '#F1EFEC')
                    }
                    onMouseOut={(e) =>
                        (e.target.style.backgroundColor = '#D4C9BE')
                    }
                >
                    Batal
                </button>
            </div>

            {state?.message && (
                <p className="mt-2 text-sm text-center" style={{ color: '#F1EFEC' }}>
                    {state.message}
                </p>
            )}
        </form>
    );
}
