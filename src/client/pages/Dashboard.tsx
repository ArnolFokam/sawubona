import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import useToken from "@/client/components/useToken";
import ProjectList from "@/client/components/ProjectList";
import Project from "@/client/components/Project";

interface IUser {
  _id: string;
  email: string;
  apiKey: string;
}

async function deleteAccount(token: string) {
  try {
    const response = await fetch("/api/v1/users/me", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Include authorization token
      },
    });
    if (!response.ok) {
      throw new Error(`Account deletion failed with status ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Registration error:", error);
    throw error; // Re-throw for handling in component
  }
}

async function getUserProfile(token: string) {
  try {
    const response = await fetch("/api/v1/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include authorization token
      },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to get user profile with status ${response.status}`
      );
    }
    return response.json();
  } catch (error) {
    console.error("User profile retrieval error:", error);
    throw error; // Re-throw for handling in component
  }
}

const Dashboard = () => {
  const [token, _, removeToken] = useToken();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for confirmation modal
  const [user, setUser] = useState<IUser | null>(null); // State for user data

  // Rest of the code...
  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action is irreversible."
      )
    ) {
      try {
        const _ = await deleteAccount(token);

        // Handle successful deletion (e.g., remove token, redirect to login)
        removeToken();
        alert("Your account has been successfully deleted."); // Success message
      } catch (error) {
        console.error("Account deletion error:", error);
        alert(
          "An error occurred while deleting your account. Please try again later."
        ); // User-friendly error message
      }
    }
  };

  const handleLogout = () => {
    removeToken();
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile(token);
        setUser(profile);
      } catch (error) {
        console.error("User profile retrieval error:", error);
        // Handle error
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, []);

  if (token) {
    return (
      <div className="flex flex-col h-screen">
        <header className="grow-0 bg-white shadow-2xl text-gray-900 flex justify-between items-center px-8 py-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {user && <p className="text-black-300"><b>ApiKey:</b> {user.apiKey}</p>}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Logout
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Account
            </button>
          </div>
        </header>
        {isDeleteModalOpen && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-md p-4 shadow-md">
              <p className="text-gray-700 text-lg">
                Are you sure you want to delete your account?
              </p>
              <p className="text-gray-500 text-sm mb-4">
                This action is irreversible.
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="grow">
          <Routes>
            <Route path="/dashboard" element={<ProjectList token={token} />} />{" "}
            {/* List all projects */}
            <Route
              path="/dashboard/projects/:projectId"
              element={<Project token={token} />}
            />{" "}
            {/* Individual project details */}
          </Routes>
        </div>
      </div>
    );
  } else {
    window.location.replace("/");
  }
};

export default Dashboard;
