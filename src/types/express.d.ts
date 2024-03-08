import User from '@/models/User';
import Project from '@/models/Project';

declare global {
    namespace Express {
        export interface Request {
            user?: User;
            project?: Project;
            run?: Run;
        }
    }
}