import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Lead validation rules
export const validateLead = [
  body('lead.name').isString().withMessage('Name must be a string'),
  body('lead.source').isString().withMessage('Source must be a string'),
  body('lead.currentStatus')
    .isIn(['New', 'Contacted', 'Qualified', 'Disqualified', 'Converted'])
    .withMessage('Invalid current status'),
  body('lead.priority')
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Invalid priority'),
  body('lead.relationship_manager_id')
    .optional()
    .isInt()
    .withMessage('Relationship Manager ID must be an integer'),
  body('lead.contact_id')
    .optional()
    .isInt()
    .withMessage('Contact ID must be an integer'),
  body('lead.contact_message')
    .optional()
    .isString()
    .withMessage('Contact message must be a string'),
  body('lead.additional_info')
    .optional()
    .isString()
    .withMessage('Additional info must be a string'),
  body('lead.status_reason')
    .optional()
    .isString()
    .withMessage('Status reason must be a string'),
  body('lead.next_follow_up')
    .optional()
    .isISO8601()
    .withMessage('Next follow-up must be a valid date'),
  body('lead.converted_at')
    .optional()
    .isISO8601()
    .withMessage('Converted at must be a valid date'),
  body('lead.is_active')
    .optional()
    .isBoolean()
    .withMessage('Is active must be a boolean'),
  body('contactDetails')
    .isArray()
    .withMessage('Contact details must be an array'),
  body('contactDetails.*.leadContactMethodsId')
    .isInt()
    .withMessage('Invalid contact method ID'),
  body('contactDetails.*.value')
    .isString()
    .withMessage('Contact detail value must be a string'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// ID validation rule
export const validateId = [
  param('id').isInt().withMessage('ID must be an integer'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
