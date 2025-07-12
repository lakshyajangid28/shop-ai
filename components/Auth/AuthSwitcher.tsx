"use client";
import React, { useState } from 'react';
import { SignIn, SignUp, UserButton, useUser, useClerk } from '@clerk/nextjs';
import Swal from 'sweetalert2';

const AuthSwitcher: React.FC = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    const { signOut } = useClerk();
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');

    if (!isLoaded) return null;

    const handleSignOut = async () => {
        await signOut();
        Swal.fire('Signed out!', 'You have been signed out.', 'success');
    };

    if (isSignedIn) {
        return (
            <div className="flex flex-col items-center justify-center py-24">
                <div className="bg-white/90 rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center">
                    <UserButton />
                    <div className="mt-6 text-center text-lg text-gray-700 font-semibold">
                        You are already signed in as <span className="text-blue-700">{user?.emailAddresses?.[0]?.emailAddress}</span>
                    </div>
                    <div className="mt-8 w-full flex flex-col items-center gap-4">
                        <button
                            className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition flex items-center gap-2 shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
                            onClick={handleSignOut}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                            </svg>
                            Sign out
                        </button>
                        <div className="text-gray-500 text-sm mt-2 text-center">
                            Want to use a different account? Sign out and sign in again.<br />
                            <span className="text-xs text-gray-400">You can safely close this tab or continue shopping.</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-24">
            <div>
                {mode === 'signin' ? (
                    <>
                        <SignIn routing="path" path="/login" />
                        <div className="mt-4 text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button
                                className="text-blue-600 hover:underline font-medium cursor-pointer"
                                onClick={() => setMode('signup')}
                            >
                                Sign up
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <SignUp routing="path" path="/login" />
                        <div className="mt-4 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <button
                                className="text-blue-600 hover:underline font-medium cursor-pointer"
                                onClick={() => setMode('signin')}
                            >
                                Sign in
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthSwitcher;
