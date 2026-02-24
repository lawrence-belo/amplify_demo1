'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function LoginPage() {
    const router = useRouter();
    const { setName } = useUser();
    const [loading, setLoading] = useState(false);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/signin', {
                method: 'POST',
            });
            const data = await response.json();

            if (data.token) {
                localStorage.setItem('token', data.token);
                // We'll just set a default name if they sign in to showcase the feature
                setName('Amplify User');
                router.push('/');
            }
        } catch (error) {
            console.error('Sign in failed', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
            <div className="max-w-md w-full p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500 tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="mt-3 text-sm text-gray-500">
                        Sign in to access your Amplify Demo dashboard.
                    </p>
                </div>

                <form onSubmit={handleSignIn} className="space-y-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing In...
                            </span>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
