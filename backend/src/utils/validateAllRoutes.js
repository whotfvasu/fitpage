import express from 'express';
import { validateRoutes } from './routeValidator.js';
import routes from '../routes/index.js';

// Create a test app to validate routes
const testApp = express();
testApp.use('/api', routes);

// Validate all routes
const validateAllRoutes = () => {
  console.log('Validating API routes...');
  const invalidRoutes = validateRoutes(testApp._router, '');
  
  if (invalidRoutes.length > 0) {
    console.error('INVALID ROUTES FOUND:');
    invalidRoutes.forEach(route => {
      console.error(`Path: ${route.path}, Methods: ${route.methods.join(', ')}`);
    });
    return false;
  }
  
  console.log('All routes are valid.');
  return true;
};

export default validateAllRoutes;
