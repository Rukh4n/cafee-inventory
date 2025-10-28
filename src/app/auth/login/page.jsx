'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Mail, Lock } from 'lucide-react';

const Page = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const res = await signIn('credentials', {
            redirect: false,
            email: formData.email,
            password: formData.password,
        });

        setLoading(false);

        if (res?.error) {
            setError('Email atau password salah!');
        } else {
            router.push('/');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#030303] to-[#D4C9BE] text-[#F1EFEC]">
            <div className="bg-[#030303] p-8 rounded-2xl shadow-lg w-full max-w-md border border-[#D4C9BE]">
                <h1 className="text-2xl font-bold text-center mb-6 text-[#F1EFEC]">
                    Login
                </h1>

                {error && (
                    <div className="bg-red-600/20 border border-red-500 text-red-400 text-sm rounded-md p-2 mb-4 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-col">
                        <label className="text-sm mb-2 text-[#F1EFEC]">
                            Email
                        </label>
                        <div className="flex items-center bg-[#030303] border border-[#D4C9BE] rounded-lg px-3">
                            <Mail className="w-5 h-5 text-[#D4C9BE] mr-2" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Masukkan email..."
                                required
                                className="bg-transparent w-full p-2 outline-none text-[#F1EFEC] placeholder-[#D4C9BE]"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm mb-2 text-[#F1EFEC]">
                            Password
                        </label>
                        <div className="flex items-center bg-[#030303] border border-[#D4C9BE] rounded-lg px-3">
                            <Lock className="w-5 h-5 text-[#D4C9BE] mr-2" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Masukkan password..."
                                required
                                className="bg-transparent w-full p-2 outline-none text-[#F1EFEC] placeholder-[#D4C9BE]"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#D4C9BE] hover:opacity-90 transition rounded-lg py-2 font-semibold text-[#030303]"
                    >
                        {loading ? 'Sedang masuk...' : 'Masuk'}
                    </button>
                    <hr></hr>
                    {/* 🔽 Tambahkan tombol login Google */}
                    <button
                        onClick={() => signIn('google')}
                        className="mt-4 w-full border border-[#D4C9BE] text-[#D4C9BE] rounded-lg py-2 hover:bg-[#D4C9BE] hover:text-[#030303] transition"
                    >
                        Masuk dengan Google
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Page;
