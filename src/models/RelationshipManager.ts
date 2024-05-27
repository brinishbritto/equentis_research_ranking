import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Default,
} from 'sequelize-typescript';

import { RelationshipManagerAttributes } from '../types';

/**
 *  Defines the RelationshipManager model for the database
 */
@Table({
  tableName: 'relationship_managers',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
class RelationshipManager extends Model<RelationshipManagerAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    unique: true,
  })
  phone!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_active!: boolean;
}

export default RelationshipManager;
