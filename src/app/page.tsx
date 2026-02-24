'use client';

import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const { name, setName } = useUser();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [newName, setNewName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Basic mock protection - if no token, redirect to login
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsUpdating(true);
    setMessage('');

    try {
      const response = await fetch('/api/updateName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      });

      const data = await response.json();

      if (response.ok) {
        setName(newName);
        setNewName('');
        setMessage(data.message || 'Name updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to update name.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500">
                Amplify Demo
              </span>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleSignOut}
                className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
          <div className="p-8 sm:p-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-8">
              Hello, <span className="text-indigo-600">{name}</span>
            </h1>

            <div className="max-w-xl">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <h3 className="text-lg font-medium text-slate-900 mb-4">
                  Update Your Name
                </h3>
                <form onSubmit={handleUpdateName} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter new name"
                    className="flex-1 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-4 block w-full text-sm border bg-white"
                  />
                  <button
                    type="submit"
                    disabled={isUpdating || !newName.trim()}
                    className="inline-flex justify-center items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isUpdating ? 'Updating...' : 'Update'}
                  </button>
                </form>
                {message && (
                  <p className="mt-3 text-sm text-emerald-600 font-medium animate-pulse">
                    {message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
