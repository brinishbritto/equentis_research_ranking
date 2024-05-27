import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Default,
} from 'sequelize-typescript';

import { LeadContactMethodAttributes } from '../types';

/**
 *  LeadContactMethod model represents a table in the database that stores different contact methods associated with leads
 */
@Table({
  tableName: 'lead_contact_methods',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
class LeadContactMethod extends Model<LeadContactMethodAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  method!: string;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_active!: boolean;
}

export default LeadContactMethod;
