import { Request, Response, NextFunction } from 'express';

import Run from '@/models/Run';

async function isRunFromProject(req: Request, res: Response, next: NextFunction) {
    const { runId } = req.params; // Assuming project and run IDs are in params
  
    try {
      // Find the run directly by ID, assuming it has an `owner` field matching the project ID
      const run = await Run.findById(runId);
  
      if (!run) {
        return res.status(404).json({ message: 'Run not found' });
      }
  
      if (!run.project.equals(req.project._id)) {
        return res.status(403).json({ message: 'Run does not belong to the specified project' });
      }
      
      req.run = run;
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

export default isRunFromProject;