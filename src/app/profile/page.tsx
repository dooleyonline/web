"use client";

import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="p-4">Loading profile...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
