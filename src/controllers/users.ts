import { Request, Response, NextFunction } from 'express';

import User from '@/models/User';

// Register a new user
const delete_current_user = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user._id; // Get user ID from the authenticated user object
    
        const deletedUser = await User.findByIdAndDelete(userId);
  
        if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        res.json({ message: 'Your account has been deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Server error' }); // Generic error message for security
      }
};

export { delete_current_user };