import { Sequelize } from 'sequelize-typescript';
import Lead from '../models/Lead';
import LeadContactDetail from '../models/LeadContactDetail';
import { LeadAttributes, LeadContactDetailAttributes } from '../types';

/**
 *  LeadService handles operations on leads and their associated contact details
 */
class LeadService {
  private sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  /**
   *  Creates a new lead and its associated contact details within a transaction
   *  @param data An object containing lead attributes and an array of contact detail attributes
   *  @returns Promise<Lead> A promise that resolves to the newly created lead object
   *  @throws {Error} If any errors occur during lead or contact detail creation, the transaction is rolled back and the error is re-thrown
   */
  async createLead(data: {
    lead: LeadAttributes;
    contactDetails: LeadContactDetailAttributes[];
  }): Promise<Lead> {
    const transaction = await this.sequelize.transaction();
    try {
      const newLead = await Lead.create(data.lead, { transaction });
      const contactDetails = data.contactDetails.map((detail) => ({
        ...detail,
        leadId: newLead.id,
      }));
      await LeadContactDetail.bulkCreate(contactDetails, { transaction });
      await transaction.commit();
      return newLead;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  /**
   *  Fetches all leads from the database, including their associated contact details
   *  @returns Promise<Lead[]> A promise that resolves to an array of lead objects with their contact details
   */
  async getLeads(): Promise<Lead[]> {
    return await Lead.findAll({ include: [LeadContactDetail] });
  }

  /**
   *  Fetches a lead by its ID using the Lead model
   *  Includes the associated LeadContactDetail entries using the 'include' option
   *  @param id The numeric ID of the lead to retrieve
   *  @returns Promise<Lead | null> A promise that resolves to the lead object or null if not found
   */
  async getLeadById(id: number): Promise<Lead | null> {
    return await Lead.findByPk(id, { include: [LeadContactDetail] });
  }

  /**
   *  Updates an existing lead and its associated contact details within a transaction
   *  @param id The ID of the lead to update
   *  @param data An object containing updated lead attributes and an array of contact detail attributes
   *  @returns Promise<Lead | null> A promise that resolves to the updated lead object or null if the lead is not found
   *  @throws {Error} If any errors occur during lead update, contact detail deletion, or creation, the transaction is rolled back and the error is re-thrown
   */
  async updateLead(
    id: number,
    data: {
      lead: LeadAttributes;
      contactDetails: LeadContactDetailAttributes[];
    }
  ): Promise<Lead | null> {
    const transaction = await this.sequelize.transaction();
    try {
      const lead = await Lead.findByPk(id, { transaction });
      if (!lead) {
        await transaction.rollback();
        return null;
      }

      await lead.update(data.lead, { transaction });

      await LeadContactDetail.destroy({ where: { leadId: id }, transaction });

      const contactDetails = data.contactDetails.map((detail) => ({
        ...detail,
        leadId: id,
      }));
      await LeadContactDetail.bulkCreate(contactDetails, { transaction });

      await transaction.commit();
      return lead;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  /**
   *  Deletes a lead and its associated contact details from the database
   *  @param id - The ID of the lead to be deleted
   *  @throws Will throw an error if the transaction fails
   */
  async deleteLead(id: number): Promise<void> {
    const transaction = await this.sequelize.transaction();
    try {
      await LeadContactDetail.destroy({ where: { leadId: id }, transaction });
      await Lead.destroy({ where: { id }, transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

export { LeadService };
