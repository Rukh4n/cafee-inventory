'use client';

import { useActionState } from 'react';
import { addCategory } from '@/app/action/categoryAction';
import { Plus } from 'lucide-react';

export default function AddCategoryForm() {
    const [state, formAction, pending] = useActionState(addCategory, {
        success: null,
        message: '',
    });

    return (
        <form
            action={formAction}
            className="flex items-center justify-end gap-2 p-2 rounded-md border shadow-md w-full max-w-xs"
            style={{ backgroundColor: '#030303', borderColor: '#D4C9BE' }}
        >
            <input
                type="text"
                name="name"
                placeholder="Nama kategori"
                className="flex-1 px-2 py-1 rounded-md text-sm focus:outline-none"
                style={{
                    borderColor: '#D4C9BE',
                    color: '#F1EFEC',
                    backgroundColor: '#030303',
                }}
            />
            <button
                type="submit"
                disabled={pending}
                className="flex items-center gap-1 px-3 py-1 rounded-md font-semibold text-sm transition-all"
                style={{
                    backgroundColor: '#030303',
                    color: '#F1EFEC',
                    opacity: pending ? 0.7 : 1,
                }}
                onMouseOver={(e) =>
                    (e.target.style.backgroundColor = '#D4C9BE')
                }
                onMouseOut={(e) =>
                    (e.target.style.backgroundColor = '#030303')
                }
            >
                <Plus size={14} />
                {pending ? 'Menambah...' : 'Tambah'}
            </button>
            {state.message && (
                <p
                    className={`text-xs font-medium ${
                        state.success ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                    {state.message}
                </p>
            )}
        </form>
    );
}
