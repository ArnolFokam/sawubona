import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Run {
  _id: string;
  name: string;
  data: string;
}

const ProjectSidebar = ({ projectId, token }: { projectId: string; token: string }) => {
  const [runs, setRuns] = useState<Run[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRuns = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/v1/projects/${projectId}/runs`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch runs');
        }
        const data = await response.json();
        setRuns(data);
        setError(null); // Clear any previous errors
      } catch (error: any) {
        console.log(error, error.response);
        setError(error.response?.data?.message || 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRuns();
  }, [projectId, token]); // Re-fetch runs on project ID or token change

  return (
    <div className="w-64 bg-gray-800 text-white px-4 py-4">
      <h3>Project Runs</h3>
      {isLoading ? (
        <p className="text-center">Loading runs...</p>
      ) : error ? (
        <p className="text-center">{error}</p>
      ) : (
        <ul className="space-y-2">
          {runs.map((run) => (
            <li key={run._id}>
              {/* Wrap run name with Link component */}
              <Link to={`/projects/${projectId}/runs/${run._id}`} className="text-blue-500 hover:underline">
                {run.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectSidebar;