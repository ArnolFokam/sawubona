import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Project {
  _id: string;
  name: string;
}

export default function ProjectList({ token }: { token: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Initially loading
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/v1/projects', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
        setError(null); // Clear any previous errors
      } catch (error: any) {
        console.log(error, error.response);
        setError(error.response?.data?.message || 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="px-4 py-8">
      {isLoading ? (
        <p className="text-center">Loading projects...</p>
      ) : error ? (
        <p className="text-center">{error}</p>
      ) : projects.length > 0 ? (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project._id}>
              <Link to={`/dashboard/projects/${project._id}`} className="text-blue-500 hover:underline">
                {project.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No projects found.</p>
      )}
    </div>
  );
}