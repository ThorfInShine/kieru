import { EmailDomain } from '@/types/email';

export const EMAIL_DOMAINS: EmailDomain[] = [
  {
    value: 'grr.la',
    label: 'grr.la',
    description: 'Short and simple'
  },
  {
    value: 'sharklasers.com',
    label: 'sharklasers.com',
    description: 'Popular choice'
  },
  {
    value: 'guerrillamail.info',
    label: 'guerrillamail.info',
    description: 'Info domain'
  },
  {
    value: 'guerrillamail.biz',
    label: 'guerrillamail.biz',
    description: 'Business domain'
  },
  {
    value: 'guerrillamail.com',
    label: 'guerrillamail.com',
    description: 'Main domain'
  },
  {
    value: 'guerrillamail.de',
    label: 'guerrillamail.de',
    description: 'German domain'
  },
  {
    value: 'guerrillamail.net',
    label: 'guerrillamail.net',
    description: 'Network domain'
  },
  {
    value: 'guerrillamail.org',
    label: 'guerrillamail.org',
    description: 'Organization domain'
  },
  {
    value: 'guerrillamailblock.com',
    label: 'guerrillamailblock.com',
    description: 'Block domain'
  },
  {
    value: 'pokemail.net',
    label: 'pokemail.net',
    description: 'Pokemon themed'
  },
  {
    value: 'spam4.me',
    label: 'spam4.me',
    description: 'Short spam domain'
  }
];

export const getDefaultDomain = (): string => {
  return EMAIL_DOMAINS[0].value;
};

export const getDomainByValue = (value: string): EmailDomain | undefined => {
  return EMAIL_DOMAINS.find(domain => domain.value === value);
};