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
import RelationshipManager from './RelationshipManager';
import LeadContactDetail from './LeadContactDetail';

import { LeadAttributes } from '../types';

/**
 *  Lead model represents the data structure for a lead in the database
 *  It maps to the 'leads' table and defines the properties of a lead
 */
@Table({
  tableName: 'leads',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
class Lead extends Model<LeadAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @ForeignKey(() => RelationshipManager)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  relationship_manager_id!: number;

  @ForeignKey(() => LeadContactDetail)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  contact_id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  source!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  contact_message!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  additional_info!: string;

  @Column({
    type: DataType.ENUM(
      'New',
      'Contacted',
      'Qualified',
      'Disqualified',
      'Converted'
    ),
    allowNull: false,
    defaultValue: 'New',
  })
  current_status!:
    | 'New'
    | 'Contacted'
    | 'Qualified'
    | 'Disqualified'
    | 'Converted';

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  status_reason!: string;

  @Column({
    type: DataType.ENUM('Low', 'Medium', 'High'),
    allowNull: false,
    defaultValue: 'Medium',
  })
  priority!: 'Low' | 'Medium' | 'High';

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  next_follow_up!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  converted_at!: Date;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_active!: boolean;

  @BelongsTo(() => RelationshipManager, {
    foreignKey: 'relationshipManagerId',
    targetKey: 'id',
  })
  relationshipManager!: RelationshipManager;

  @BelongsTo(() => LeadContactDetail, {
    foreignKey: 'contactId',
    targetKey: 'id',
  })
  leadContactDetail!: LeadContactDetail;
}

export default Lead;
