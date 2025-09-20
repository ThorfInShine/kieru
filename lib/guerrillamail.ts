import axios, { AxiosResponse } from 'axios';
import { EmailAddress, EmailList, EmailContent, DeleteEmailResponse } from '@/types/email';

const API_BASE_URL = 'https://api.guerrillamail.com/ajax.php';

interface APIParams {
  [key: string]: string | number;
}

class GuerrillaMailAPI {
  private sidToken: string | null = null;
  private currentSite: string = 'guerrillamail.com';

  async apiCall<T = any>(functionName: string, params: APIParams = {}): Promise<T> {
    try {
      const requestParams: APIParams = {
        f: functionName,
        site: this.currentSite,
        ...params
      };

      if (this.sidToken) {
        requestParams.sid_token = this.sidToken;
      }

      const response: AxiosResponse<T> = await axios.get(API_BASE_URL, {
        params: requestParams,
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // Update sid_token if returned
      if ((response.data as any).sid_token) {
        this.sidToken = (response.data as any).sid_token;
      }

      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to communicate with email service');
    }
  }

  setSite(site: string): void {
    this.currentSite = site;
  }

  getSite(): string {
    return this.currentSite;
  }

  async getEmailAddress(lang: string = 'en', domain?: string): Promise<EmailAddress> {
    if (domain) {
      this.setSite(domain);
    }
    return await this.apiCall<EmailAddress>('get_email_address', { lang });
  }

  async setEmailUser(emailUser: string, lang: string = 'en', domain?: string): Promise<EmailAddress> {
    if (domain) {
      this.setSite(domain);
    }
    return await this.apiCall<EmailAddress>('set_email_user', { 
      email_user: emailUser, 
      lang 
    });
  }

  async checkEmail(seq: number = 0): Promise<EmailList> {
    return await this.apiCall<EmailList>('check_email', { seq: seq.toString() });
  }

  async getEmailList(offset: number = 0): Promise<EmailList> {
    return await this.apiCall<EmailList>('get_email_list', { offset: offset.toString() });
  }

  async fetchEmail(emailId: string): Promise<EmailContent> {
    return await this.apiCall<EmailContent>('fetch_email', { email_id: emailId });
  }

  async deleteEmails(emailIds: string[]): Promise<DeleteEmailResponse> {
    const params: APIParams = {};
    emailIds.forEach((id, index) => {
      params[`email_ids[${index}]`] = id;
    });
    return await this.apiCall<DeleteEmailResponse>('del_email', params);
  }

  async forgetMe(emailAddr: string): Promise<boolean> {
    return await this.apiCall<boolean>('forget_me', { email_addr: emailAddr });
  }

  getSidToken(): string | null {
    return this.sidToken;
  }

  setSidToken(token: string): void {
    this.sidToken = token;
  }
}

export default new GuerrillaMailAPI();