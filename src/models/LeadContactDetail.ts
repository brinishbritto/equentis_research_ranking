import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  Default,
  BelongsTo,
} from 'sequelize-typescript';
import Lead from './Lead';
import LeadContactMethod from './LeadContactMethod';

import { LeadContactDetailAttributes } from '../types';

/**
 *  LeadContactDetail model represents the data structure for a lead's contact detail in the database
 *  It maps to the 'lead_contact_details' table and defines the properties of a lead's contact detail
 */
@Table({
  tableName: 'lead_contact_details',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
class LeadContactDetail extends Model<LeadContactDetailAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @ForeignKey(() => Lead)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  lead_id!: number;

  @ForeignKey(() => LeadContactMethod)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  lead_contact_methods_id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  value!: string;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_active!: boolean;

  @BelongsTo(() => Lead, { foreignKey: 'leadId', targetKey: 'id' })
  lead!: Lead;

  @BelongsTo(() => LeadContactMethod, {
    foreignKey: 'leadContactMethodId',
    targetKey: 'id',
  })
  leadContactMethod!: LeadContactMethod;
}

export default LeadContactDetail;
