"use client";
import React, { useState } from 'react';
import { SignIn, UserButton, useUser, SignOutButton } from '@clerk/nextjs';

const AuthSwitcher: React.FC = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) return null;

  if (isSignedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <div className="bg-white/90 rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center">
          <UserButton afterSignOutUrl="/" />
          <div className="mt-6 text-center text-lg text-gray-700 font-semibold">
            You are already signed in as <span className="text-blue-700">{user?.emailAddresses?.[0]?.emailAddress}</span>
          </div>
          <SignOutButton>
            <button className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition">Sign out</button>
          </SignOutButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <SignIn routing="path" path="/login" />
      </div>
    </div>
  );
};

export default AuthSwitcher;
