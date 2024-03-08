import { Request, Response, NextFunction } from 'express';

import Run from '@/models/Run'; // Assuming Run model

const get_all_runs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projectId = req.project._id; // Assuming project ID is in the request object

        const runs = await Run.find({ project: projectId });
        res.json(runs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const delete_run = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Run.findByIdAndDelete(req.run._id);
        res.json({ message: 'Run deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const create_run = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, metrics } = req.body; // Destructure name and metrics
        const newRun = new Run({ name, project: req.project._id, metrics });
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
        const { metricName, value, step = Date.now() } = req.body; // Destructure metric name, value, and optional step (timestamp)
        let run = req.run; // Assuming run is in the request object

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

/**
 * Gets a run by ID.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 */
const get_run = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const run = req.run; // Assuming run is in the request object
        res.json(run);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export { get_all_runs, delete_run, create_run, get_run, log_run_metric };