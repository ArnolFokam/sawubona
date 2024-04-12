import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Import useParams for accessing route parameters
import ProjectSidebar from "@/client/components/ProjectSidebar";

interface Project {
  _id: string;
  name: string;
  // Add other project properties
}

const Project = ({ token }: { token: string }) => {
  const { projectId } = useParams(); // Get project ID from route parameter
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    // Fetch project details based on projectId
    const fetchProject = async () => {
      const response = await fetch(`/api/v1/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProject(data);
    };

    fetchProject();
  }, [projectId]);

  return (
    <div>
      {project ? (
        <>
          <ProjectSidebar
            projectId={project._id}
            projectName={project.name}
            token={token}
          />
        </>
      ) : (
        <p>Project not found.</p>
      )}
    </div>
  );
};

export default Project;
