import { Request, Response, NextFunction } from 'express';

import Project from '@/models/Project';

const isProjectOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId = req.params.projectId; // Get project ID from request parameters (adjust based on your route)
      const userId = req.user._id; // Get user ID from authenticated user object
  
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      if (!project.owner.equals(userId)) { // Compare project owner ID with authenticated user ID
        return res.status(403).json({ message: 'Unauthorized access. You are not the owner of this project.' });
      }

      req.project = project;
      next(); // Proceed if user is the owner
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
 export default isProjectOwner;