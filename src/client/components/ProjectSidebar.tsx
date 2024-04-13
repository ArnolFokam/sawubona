import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Run {
  _id: string;
  name: string;
  data: string;
}

const ProjectSidebar = ({
  projectId,
  projectName,
  token,
}: {
  projectId: string;
  projectName: string;
  token: string;
}) => {
  const [runs, setRuns] = useState<Run[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRuns = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/v1/projects/${projectId}/runs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch runs");
        }
        const data = await response.json();
        setRuns(data);
        setError(null); // Clear any previous errors
      } catch (error: any) {
        console.log(error, error.response);
        setError(error.response?.data?.message || "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRuns();
  }, [projectId, token]); // Re-fetch runs on project ID or token change

  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white px-4 py-4 h-full">
      <h2 className="grow-0 py-4 px-4 text-2xl font-bold text-center">
        {projectName}
      </h2>
      <div className="grow flex flex-col justify-between">
        {isLoading ? (
          <p className="text-center">Loading runs...</p>
        ) : error ? (
          <p className="text-center">{error}</p>
        ) : runs.length > 0 ? (
          <ul className="space-y-2">
            {runs.map((run) => (
              <li className="py-8 px-4 text-center" key={run._id}>
                {run.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No runs found.</p>
        )}
        <Link
          className="py-6 text-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
          to="/dashboard"
        >
          👈 back to projects
        </Link>
      </div>
    </div>
  );
};

export default ProjectSidebar;
