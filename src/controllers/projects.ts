import { Request, Response, NextFunction } from 'express';

import Project from '@/models/Project';

/**
 * Creates a new project.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 * @returns A JSON response containing the created project.
 */
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

/**
 * Deletes a project by ID.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 * @returns A JSON response containing a message about the status of the request.
 */
const delete_project = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Project.findByIdAndDelete(req.project._id);
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' }); // Generic error message for security
    }
}

/**
 * Gets all projects for a user.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 */
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

/**
 * Gets a project by ID.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 */
const get_project = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projectId = req.params.projectId;
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


export { create_project, delete_project, get_all_projects, get_project };