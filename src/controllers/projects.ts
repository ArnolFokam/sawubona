import { Request, Response, NextFunction } from 'express';

import Project from '@/models/Project';

const create_project = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body; // Destructure name from request body
        const newProject = new Project({name, owner: req.user._id}); // Create a new project instance from request body
        await newProject.save(); // Save the project to the database

        res.status(201).json(newProject); // Respond with created project and status code 201 (Created)
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creating project' }); // Generic error for security
    }
}

const delete_project = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projectId = req.params.projectId;

        // Check if project exists (optional, but recommended)
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Implement authorization check for project ownership (optional)
        // You can check if the logged-in user ID matches the project's owner ID

        await Project.findByIdAndDelete(projectId);

        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' }); // Generic error message for security
    }
}

const get_all_projects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user._id; // Get user ID from authenticated user object

        const projects = await Project.find({ owner: userId });

        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const get_project = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projectId = req.params.projectId;
        const project = await Project.findById(projectId);
        res.json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


export { create_project, delete_project, get_all_projects, get_project };