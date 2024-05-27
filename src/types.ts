// Interface representing the attributes of a relationship manager
export interface RelationshipManagerAttributes {
  id: number;
  name: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

// Interface representing the attributes of a lead contact method
export interface LeadContactMethodAttributes {
  id: number;
  method: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

// Interface representing the attributes of lead contact details
export interface LeadContactDetailAttributes {
  id: number;
  leadId: number;
  leadContactMethodId: number;
  value: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

// Interface representing the attributes of a lead
export interface LeadAttributes {
  id: number;
  relationship_manager_id?: number | null;
  name: string;
  source: string;
  contact_id?: number | null;
  contact_message?: string | null;
  additional_info?: string | null;
  current_status:
    | 'New'
    | 'Contacted'
    | 'Qualified'
    | 'Disqualified'
    | 'Converted';
  status_reason?: string | null;
  priority: 'Low' | 'Medium' | 'High';
  next_follow_up?: Date | null;
  converted_at?: Date | null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
}
