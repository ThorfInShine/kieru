export interface EmailAddress {
  email_addr: string;
  email_timestamp: number;
  alias: string;
  alias_error: string;
  sid_token: string;
  site?: string;
  site_id?: string;
}

export interface EmailItem {
  mail_id: string;
  mail_from: string;
  mail_subject: string;
  mail_excerpt: string;
  mail_timestamp: string;
  mail_read: string;
  mail_date: string;
  att: string;
}

export interface EmailList {
  list: EmailItem[];
  count: string;
  email: string;
  alias: string;
  ts: number;
  sid_token: string;
  stats?: {
    sequence_mail: string;
    created_addresses: number;
    received_emails: string;
    total: string;
    total_per_hour: string;
  };
  auth?: {
    success: boolean;
    error_codes: string[];
  };
}

export interface EmailContent {
  mail_id: string;
  mail_from: string;
  mail_recipient: string;
  mail_subject: string;
  mail_excerpt: string;
  mail_body: string;
  mail_timestamp: string;
  mail_date: string;
  mail_read: string;
  content_type: string;
  sid_token: string;
}

export interface DeleteEmailResponse {
  deleted_ids: string[];
}

export interface APIResponse<T = any> {
  success?: boolean;
  error?: string;
  data?: T;
}

// New interface for domain
export interface EmailDomain {
  value: string;
  label: string;
  description?: string;
}