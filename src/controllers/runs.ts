import { Request, Response, NextFunction } from 'express';

import Project from '@/models/Project'; // Assuming Project model
import Run from '@/models/Run'; // Assuming Run model

const get_all_runs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projectId = req.params.projectId;

        // Check if project exists (optional, but recommended)
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const runs = await Run.find({ project: projectId });
        res.json(runs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const delete_run = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projectId = req.params.projectId;
        const runId = req.params.runId;

        // Check if project and run exist (optional, but recommended)
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const run = await Run.findByIdAndDelete({ _id: runId, project: projectId });
        if (!run) {
            return res.status(404).json({ message: 'Run not found' });
        }

        res.json({ message: 'Run deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const create_run = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projectId = req.params.projectId;
        const { name, metrics } = req.body; // Destructure name and metrics

        // Check if project exists (optional, but recommended)
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const newRun = new Run({ name, project, metrics });
        await newRun.save();

        res.status(201).json(newRun);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creating run' });
    }
};

// Assuming 'metrics' is an object or array of key-value pairs
const log_run_metric = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projectId = req.params.projectId;
        const runId = req.params.runId;
        const { metricName, value, step = Date.now() } = req.body; // Destructure metric name, value, and optional step (timestamp)

        // Check if project and run exist (optional, but recommended)
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const run = await Run.findByIdAndUpdate(
            { _id: runId, project: projectId },
            { $set: {} }, // Initialize empty $set object
            { new: true } // Return the updated document
        );
        if (!run) {
            return res.status(404).json({ message: 'Run not found' });
        }

        // Update logic based on metric structure
        if (run.metrics && run.metrics[metricName]) {
            // Update existing step within the metric
            run.metrics[metricName][parseInt(step)] = parseFloat(value);
        } else {
            if (!run.metrics) {
                run.metrics = {};
            }
            // Create a new step for the metric
            run.metrics[metricName] = { [parseInt(step)]: parseFloat(value) };
        }

        // Handle potential errors during save
        try {
            run.markModified('metrics')
            await run.save();
            res.json(run);
        } catch (saveError) {
            console.error('Error saving run:', saveError);
            res.status(500).json({ message: 'Error logging run metric' }); // Generic error message for security
        }
    } catch (error) {
        console.error('Error in log_run_metric:', error);
        res.status(400).json({ message: 'Error logging run metric' }); // Generic error message for security
    }
};

export { get_all_runs, delete_run, create_run, log_run_metric };