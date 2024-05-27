import { Router } from 'express';
import sequelize from '../configs/database';
import { validateLead, validateId } from '../middlewares/validation';
import { LeadController } from '../controllers/LeadController';
import { LeadService } from '../services/LeadService';

const router = Router();
const leadService = new LeadService(sequelize);
const leadController = new LeadController(leadService);

// Route to create a new lead
router.post('/leads', validateLead, leadController.createLead);

// Route to get all leads
router.get('/leads', leadController.getLeads);

// Route to get a lead by ID
router.get('/leads/:id', validateId, leadController.getLeadById);

// Route to update a lead
router.put('/leads/:id', validateId, validateLead, leadController.updateLead);

// Route to delete a lead
router.delete('/leads/:id', validateId, leadController.deleteLead);

export default router;
