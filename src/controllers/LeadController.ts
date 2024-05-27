import { Request, Response } from 'express';
import { LeadService } from '../services/LeadService';
import { LeadAttributes, LeadContactDetailAttributes } from '../types';

/**
 *  LeadController handles incoming requests related to lead management
 */
class LeadController {
  private leadService: LeadService;

  constructor(leadService: LeadService) {
    this.leadService = leadService;
  }

  /**
   *  Creates a new lead using the LeadService
   *  @param req Express request object containing lead data in the body
   *  @param res Express response object
   *  @returns Promise<Response> Express response object with the created lead or an error message
   */
  async createLead(req: Request, res: Response): Promise<Response> {
    try {
      const {
        lead,
        contactDetails,
      }: {
        lead: LeadAttributes;
        contactDetails: LeadContactDetailAttributes[];
      } = req.body;
      const newLead = await this.leadService.createLead({
        lead,
        contactDetails,
      });
      return res.status(201).json(newLead);
    } catch (error) {
      console.error('Error in createLead : ', error);
      return res
        .status(500)
        .json({ error: 'An error occurred while creating the lead' });
    }
  }

  /**
   *  Fetches all leads using the LeadService
   *  @param req Express request object
   *  @param res Express response object
   *  @returns Promise<Response> Express response object with an array of leads or an error message
   */
  async getLeads(req: Request, res: Response): Promise<Response> {
    try {
      const leads = await this.leadService.getLeads();
      return res.status(200).json(leads);
    } catch (error) {
      console.error('Error in getLeads : ', error);
      return res
        .status(500)
        .json({ error: 'An error occurred while fetching leads' });
    }
  }

  /**
   *  Fetches a lead by its ID using the LeadService
   *  @param req Express request object containing the lead ID in the path parameters
   *  @param res Express response object
   *  @returns Promise<Response> Express response object with the lead or an error message
   */
  async getLeadById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const lead = await this.leadService.getLeadById(Number(id));
      if (lead) {
        return res.status(200).json(lead);
      }
      return res.status(404).json({ error: 'Lead not found' });
    } catch (error) {
      console.error('Error in getLeadById : ', error);
      return res
        .status(500)
        .json({ error: 'An error occurred while fetching the lead' });
    }
  }

  /**
   *  Updates a lead using the LeadService
   *  @param req Express request object containing the lead ID in path parameters and updated lead data in the body
   *  @param res Express response object
   *  @returns Promise<Response> Express response object with the updated lead or an error message
   */
  async updateLead(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const {
        lead,
        contactDetails,
      }: {
        lead: LeadAttributes;
        contactDetails: LeadContactDetailAttributes[];
      } = req.body;
      const updatedLead = await this.leadService.updateLead(Number(id), {
        lead,
        contactDetails,
      });
      return res.status(200).json(updatedLead);
    } catch (error) {
      console.error('Error in updateLead : ', error);
      return res
        .status(500)
        .json({ error: 'An error occurred while updating the lead' });
    }
  }

  /**
   *  Deletes a lead by its ID using the LeadService
   *  @param req Express request object containing the lead ID in the path parameters
   *  @param res Express response object
   *  @returns Promise<Response> Express response object with an empty body or an error message
   */
  async deleteLead(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      await this.leadService.deleteLead(Number(id));
      return res.status(204).send();
    } catch (error) {
      console.error('Error in deleteLead : ', error);
      return res
        .status(500)
        .json({ error: 'An error occurred while deleting the lead' });
    }
  }
}

export { LeadController };
