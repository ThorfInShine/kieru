'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import React, { CSSProperties } from 'react';
import { 
  Mail, 
  Trash2, 
  RefreshCw, 
  Copy, 
  Settings,
  Clock,
  User,
  AlertCircle,
  ChevronDown,
  CloudUpload,
  CheckCircle,
  Info,
  Inbox,
  Zap,
  Loader,
  ArrowLeft,
  X
} from 'lucide-react';
import { EmailItem, EmailContent, APIResponse, EmailDomain } from '@/types/email';
import { EMAIL_DOMAINS, getDefaultDomain } from '@/lib/domains';

interface EmailClientState {
  emailAddress: string;
  emails: EmailItem[];
  selectedEmail: EmailContent | null;
  loading: boolean;
  customEmail: string;
  lastSeq: number;
  emailCount: number;
  error: string | null;
  selectedDomain: string;
  showDomainDropdown: boolean;
  isRefreshing: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
  lastRefreshTime: Date | null;
  mobileView: 'inbox' | 'content';
  isMobile: boolean;
}

export default function EmailClient(): React.ReactElement {
  const [state, setState] = useState<EmailClientState>({
    emailAddress: '',
    emails: [],
    selectedEmail: null,
    loading: false,
    customEmail: '',
    lastSeq: 0,
    emailCount: 0,
    error: null,
    selectedDomain: getDefaultDomain(),
    showDomainDropdown: false,
    isRefreshing: false,
    autoRefresh: true,
    refreshInterval: 5,
    lastRefreshTime: null,
    mobileView: 'inbox',
    isMobile: false
  });

  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateState = (updates: Partial<EmailClientState>): void => {
    setState(prev => ({ ...prev, ...updates }));
  };

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      updateState({ isMobile: window.innerWidth <= 768 });
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Create particles effect
  useEffect(() => {
    const createParticles = () => {
      const particlesContainer = document.createElement('div');
      particlesContainer.className = 'particles-bg';
      particlesContainer.id = 'particles-bg';
      
      const particleCount = window.innerWidth <= 768 ? 10 : 20;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        particlesContainer.appendChild(particle);
      }
      
      document.body.appendChild(particlesContainer);
    };

    const createGlowEffect = () => {
      const glowContainer = document.createElement('div');
      glowContainer.className = 'glow-effect';
      glowContainer.id = 'glow-effect';
      document.body.appendChild(glowContainer);
    };

    if (!document.getElementById('particles-bg')) {
      createParticles();
    }
    if (!document.getElementById('glow-effect')) {
      createGlowEffect();
    }

    return () => {
      const particles = document.getElementById('particles-bg');
      const glow = document.getElementById('glow-effect');
      if (particles) particles.remove();
      if (glow) glow.remove();
    };
  }, []);

  // Copy to clipboard with notification
  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      showNotification('Email address copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
      updateState({ error: 'Failed to copy to clipboard' });
    }
  };

  // Show notification
  const showNotification = (message: string): void => {
    const notification = document.createElement('div');
    notification.className = 'kieru-notification';
    notification.innerHTML = `
      <div style="display: flex; align-items: center;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 10px;">
          <path d="m9 12 2 2 4-4"></path>
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
        ${message}
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  // Initialize email address with force new option
  const initializeEmail = useCallback(async (domain?: string, forceNew: boolean = false): Promise<void> => {
    updateState({ loading: true, error: null });
    try {
      const domainToUse = domain || state.selectedDomain;
      
      if (forceNew) {
        updateState({ 
          emailAddress: '',
          emails: [],
          selectedEmail: null,
          lastSeq: 0,
          emailCount: 0
        });
      }
      
      const url = forceNew 
        ? `/api/email?action=get_new_address&domain=${domainToUse}`
        : `/api/email?action=get_address&domain=${domainToUse}`;
      
      const response = await fetch(url);
      const result: APIResponse = await response.json();
      
      if (result.success && result.data?.email_addr) {
        updateState({ 
          emailAddress: result.data.email_addr,
          selectedDomain: domainToUse,
          lastRefreshTime: new Date()
        });
        await loadEmails();
        
        if (forceNew) {
          showNotification('New email address created successfully!');
        }
      } else {
        updateState({ error: result.error || 'Failed to initialize email' });
      }
    } catch (error) {
      console.error('Error initializing email:', error);
      updateState({ error: 'Failed to initialize email address' });
    } finally {
      updateState({ loading: false });
    }
  }, [state.selectedDomain]);

  // Load email list
  const loadEmails = async (offset: number = 0): Promise<void> => {
    try {
      const response = await fetch(`/api/email?action=get_list&offset=${offset}`);
      const result: APIResponse = await response.json();
      
      if (result.success && result.data?.list) {
        const emails: EmailItem[] = result.data.list;
        updateState({ 
          emails,
          emailCount: parseInt(result.data.count) || 0
        });
        
        if (emails.length > 0) {
          const maxSeq = Math.max(...emails.map((email: EmailItem) => parseInt(email.mail_id)));
          updateState({ lastSeq: maxSeq });
        }
      }
    } catch (error) {
      console.error('Error loading emails:', error);
      updateState({ error: 'Failed to load emails' });
    }
  };

  // Manual refresh function
  const manualRefresh = async (): Promise<void> => {
    if (state.isRefreshing) return;
    
    updateState({ isRefreshing: true, error: null });
    
    try {
      const response = await fetch(`/api/email?action=check_email&seq=${state.lastSeq}`);
      const result: APIResponse = await response.json();
      
      if (result.success && result.data?.list) {
        const newEmails: EmailItem[] = result.data.list;
        
        if (newEmails.length > 0) {
          showNotification(`${newEmails.length} new email${newEmails.length > 1 ? 's' : ''} received!`);
          
          setState((prevState: EmailClientState) => ({
            ...prevState,
            emails: [...newEmails, ...prevState.emails],
            emailCount: parseInt(result.data.count) || prevState.emailCount,
            lastSeq: Math.max(...newEmails.map((email: EmailItem) => parseInt(email.mail_id))),
            lastRefreshTime: new Date()
          }));
        } else {
          await loadEmails();
          updateState({ lastRefreshTime: new Date() });
        }
      }
    } catch (error) {
      console.error('Refresh error:', error);
      updateState({ error: 'Failed to refresh emails' });
    } finally {
      updateState({ isRefreshing: false });
    }
  };

  // Toggle auto-refresh
  const toggleAutoRefresh = (): void => {
    updateState({ autoRefresh: !state.autoRefresh });
    
    if (!state.autoRefresh) {
      showNotification('Auto-refresh enabled');
    } else {
      showNotification('Auto-refresh disabled');
    }
  };

  // Change refresh interval
  const changeRefreshInterval = (seconds: number): void => {
    updateState({ refreshInterval: seconds });
    showNotification(`Refresh interval set to ${seconds} seconds`);
  };

  // Format last refresh time
  const formatLastRefresh = (): string => {
    if (!state.lastRefreshTime) return 'Never';
    
    const now = new Date();
    const diff = Math.floor((now.getTime() - state.lastRefreshTime.getTime()) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  // Set custom email
  const setCustomEmailAddress = async (): Promise<void> => {
    if (!state.customEmail.trim()) return;
    
    updateState({ loading: true, error: null });
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'set_user',
          email_user: state.customEmail.trim(),
          domain: state.selectedDomain
        })
      });
      
      const result: APIResponse = await response.json();
      if (result.success && result.data?.email_addr) {
        updateState({ 
          emailAddress: result.data.email_addr,
          customEmail: '',
          emails: [],
          selectedEmail: null,
          lastSeq: 0,
          emailCount: 0,
          lastRefreshTime: new Date()
        });
        await loadEmails();
        showNotification('Custom email address set successfully!');
      } else {
        updateState({ error: result.error || 'Failed to set custom email' });
      }
    } catch (error) {
      console.error('Error setting custom email:', error);
      updateState({ error: 'Failed to set custom email' });
    } finally {
      updateState({ loading: false });
    }
  };

  // Fetch email content
  const fetchEmailContent = async (emailId: string): Promise<void> => {
    updateState({ loading: true, error: null });
    try {
      const response = await fetch(`/api/email?action=fetch_email&email_id=${emailId}`);
      const result: APIResponse = await response.json();
      
      if (result.success && result.data) {
        updateState({ 
          selectedEmail: result.data as EmailContent,
          mobileView: state.isMobile ? 'content' : 'inbox'
        });
      } else {
        updateState({ error: result.error || 'Failed to fetch email content' });
      }
    } catch (error) {
      console.error('Error fetching email:', error);
      updateState({ error: 'Failed to fetch email content' });
    } finally {
      updateState({ loading: false });
    }
  };

  // Delete emails
  const deleteEmails = async (emailIds: string[]): Promise<void> => {
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete_emails',
          email_ids: emailIds
        })
      });
      
      const result: APIResponse = await response.json();
      if (result.success) {
        setState((prevState: EmailClientState) => ({
          ...prevState,
          emails: prevState.emails.filter((email: EmailItem) => !emailIds.includes(email.mail_id)),
          selectedEmail: emailIds.includes(prevState.selectedEmail?.mail_id || '') ? null : prevState.selectedEmail,
          mobileView: 'inbox'
        }));
        showNotification('Email deleted successfully!');
      } else {
        updateState({ error: result.error || 'Failed to delete emails' });
      }
    } catch (error) {
      console.error('Error deleting emails:', error);
      updateState({ error: 'Failed to delete emails' });
    }
  };

  // Format date
  const formatDate = (timestamp: string): string => {
    const date = new Date(parseInt(timestamp) * 1000);
    const now = new Date();
    const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffHours < 24) {
      return date.toLocaleTimeString();
    }
    return date.toLocaleDateString();
  };

  // Initialize on mount
  useEffect(() => {
    initializeEmail(undefined, false);
  }, []);

  // Auto-refresh with new interval system
  useEffect(() => {
    if (!state.emailAddress || !state.autoRefresh) {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
      return;
    }
    
    refreshIntervalRef.current = setInterval(() => {
      manualRefresh();
    }, state.refreshInterval * 1000);

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    };
  }, [state.emailAddress, state.autoRefresh, state.refreshInterval, state.lastSeq]);

  // Modern card styles
  const cardStyle: CSSProperties = {
    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)',
    border: '1px solid rgba(37, 99, 235, 0.2)',
    borderRadius: state.isMobile ? '12px' : '16px',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
    transition: 'all 0.3s ease'
  };

  const cardHeaderStyle: CSSProperties = {
    background: 'linear-gradient(90deg, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0.05) 100%)',
    borderBottom: '1px solid rgba(37, 99, 235, 0.2)',
    padding: state.isMobile ? '16px' : '20px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const inputStyle: CSSProperties = {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(37, 99, 235, 0.3)',
    borderRadius: '8px',
    color: '#ffffff',
    padding: state.isMobile ? '12px' : '10px 14px',
    fontSize: state.isMobile ? '1rem' : '0.95rem',
    transition: 'all 0.3s ease',
    outline: 'none',
    width: '100%'
  };

  const buttonPrimaryStyle: CSSProperties = {
    background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    padding: state.isMobile ? '12px 20px' : '10px 20px',
    fontSize: state.isMobile ? '1rem' : '0.95rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)'
  };

  const buttonSecondaryStyle: CSSProperties = {
    background: 'rgba(37, 99, 235, 0.1)',
    border: '1px solid rgba(37, 99, 235, 0.3)',
    borderRadius: '8px',
    color: '#3b82f6',
    padding: state.isMobile ? '12px 20px' : '10px 20px',
    fontSize: state.isMobile ? '1rem' : '0.95rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const buttonSuccessStyle: CSSProperties = {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    padding: state.isMobile ? '12px 20px' : '10px 20px',
    fontSize: state.isMobile ? '1rem' : '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px'
  };

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: state.isMobile ? '20px 15px' : '40px 20px',
      position: 'relative',
      zIndex: 2
    }}>
      {/* Error Display */}
      {state.error && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(220, 53, 69, 0.15) 0%, rgba(220, 53, 69, 0.05) 100%)',
          border: '1px solid rgba(220, 53, 69, 0.3)',
          borderRadius: '12px',
          padding: state.isMobile ? '14px' : '18px',
          marginBottom: state.isMobile ? '16px' : '24px',
          display: 'flex',
          alignItems: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <AlertCircle style={{
            fontSize: state.isMobile ? '1.5rem' : '1.8rem',
            color: '#dc3545',
            marginRight: state.isMobile ? '12px' : '18px',
            minWidth: '24px'
          }} />
          <span style={{ 
            color: '#f8b2b8',
            fontSize: state.isMobile ? '0.9rem' : '1rem'
          }}>{state.error}</span>
        </div>
      )}

      {/* Main Header Section */}
      <div style={{ marginBottom: state.isMobile ? '30px' : '40px' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: state.isMobile ? '2.5rem' : '4rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 40px rgba(37, 99, 235, 0.5)',
            letterSpacing: state.isMobile ? '2px' : '4px',
            marginBottom: state.isMobile ? '15px' : '20px',
            animation: 'kieru-text-glow 2s ease-in-out infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: state.isMobile ? 'wrap' : 'nowrap'
          }}>
            <span style={{
              fontSize: state.isMobile ? '3rem' : '4.5rem',
              marginRight: state.isMobile ? '10px' : '20px',
              display: 'inline-block',
              background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              textShadow: '0 0 30px rgba(37, 99, 235, 0.6)'
            }}>
              消
            </span>
            <span style={{ 
              display: state.isMobile ? 'block' : 'inline',
              width: state.isMobile ? '100%' : 'auto'
            }}>
              KIERU MAIL
            </span>
          </h2>
          
          <p style={{
            fontSize: state.isMobile ? '1.1rem' : '1.3rem',
            color: '#94a3b8',
            marginBottom: '15px',
            letterSpacing: '1px',
            fontWeight: '300'
          }}>
            Temporary Email Service
          </p>
          
          <p style={{
            color: '#64748b',
            fontSize: state.isMobile ? '0.95rem' : '1.1rem',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 30px',
            padding: state.isMobile ? '0 10px' : '0'
          }}>
            Get a disposable email address instantly. Perfect for protecting your privacy and avoiding spam.
          </p>

          {/* Feature badges */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: state.isMobile ? '10px' : '20px',
            flexWrap: 'wrap',
            marginBottom: state.isMobile ? '25px' : '35px'
          }}>
            {[
              { icon: CheckCircle, color: '#10b981', text: 'No Registration' },
              { icon: '消', color: '#3b82f6', text: '100% Anonymous', isText: true },
              { icon: Clock, color: '#f59e0b', text: 'Auto-refresh' }
            ].map((feature, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
                padding: state.isMobile ? '10px 16px' : '12px 24px',
                borderRadius: '30px',
                border: '1px solid rgba(37, 99, 235, 0.2)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
              }}>
                {feature.isText ? (
                  <span style={{ 
                    color: feature.color, 
                    marginRight: state.isMobile ? '8px' : '10px', 
                    fontSize: state.isMobile ? '1rem' : '1.2rem',
                    fontWeight: 'bold'
                  }}>
                    {feature.icon}
                  </span>
                ) : (
                  <feature.icon style={{ 
                    color: feature.color, 
                    marginRight: state.isMobile ? '8px' : '10px', 
                    width: state.isMobile ? '18px' : '20px', 
                    height: state.isMobile ? '18px' : '20px' 
                  }} />
                )}
                <span style={{ 
                  color: '#e2e8f0', 
                  fontSize: state.isMobile ? '0.85rem' : '0.95rem', 
                  fontWeight: '500' 
                }}>{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Email Address Display with Refresh Controls */}
          <div style={{
            ...cardStyle,
            padding: state.isMobile ? '16px' : '24px',
            marginBottom: '30px',
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
            border: '2px solid rgba(37, 99, 235, 0.3)'
          }}>
            {/* Refresh Status Bar */}
            <div style={{
              display: 'flex',
              flexDirection: state.isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: state.isMobile ? 'stretch' : 'center',
              marginBottom: '20px',
              padding: '12px',
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              border: '1px solid rgba(37, 99, 235, 0.15)',
              gap: state.isMobile ? '12px' : '15px'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: state.isMobile ? '10px' : '15px',
                flexWrap: state.isMobile ? 'wrap' : 'nowrap',
                justifyContent: state.isMobile ? 'space-between' : 'flex-start'
              }}>
                {/* Auto-refresh toggle */}
                <button
                  onClick={toggleAutoRefresh}
                  type="button"
                  style={{
                    background: state.autoRefresh ? 'rgba(16, 185, 129, 0.2)' : 'rgba(100, 116, 139, 0.2)',
                    border: `1px solid ${state.autoRefresh ? 'rgba(16, 185, 129, 0.4)' : 'rgba(100, 116, 139, 0.4)'}`,
                    borderRadius: '6px',
                    padding: state.isMobile ? '8px 12px' : '6px 12px',
                    color: state.autoRefresh ? '#10b981' : '#64748b',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: state.isMobile ? '0.9rem' : '0.85rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Zap style={{ 
                    width: '14px', 
                    height: '14px', 
                    marginRight: '6px',
                    animation: state.autoRefresh ? 'pulse 2s infinite' : 'none'
                  }} />
                  Auto-refresh: {state.autoRefresh ? 'ON' : 'OFF'}
                </button>

                {/* Refresh interval selector */}
                {state.autoRefresh && (
                  <select
                    value={state.refreshInterval}
                    onChange={(e) => changeRefreshInterval(Number(e.target.value))}
                    style={{
                      background: 'rgba(37, 99, 235, 0.1)',
                      border: '1px solid rgba(37, 99, 235, 0.3)',
                      borderRadius: '6px',
                      padding: state.isMobile ? '8px 10px' : '6px 10px',
                      color: '#60a5fa',
                      fontSize: state.isMobile ? '0.9rem' : '0.85rem',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <option value="3">3 sec</option>
                    <option value="5">5 sec</option>
                    <option value="10">10 sec</option>
                    <option value="15">15 sec</option>
                    <option value="30">30 sec</option>
                  </select>
                )}

                {/* Last refresh time */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#64748b',
                  fontSize: state.isMobile ? '0.9rem' : '0.85rem'
                }}>
                  <Clock style={{ width: '14px', height: '14px', marginRight: '6px' }} />
                  Last refresh: {formatLastRefresh()}
                </div>
              </div>

              {/* Manual refresh button */}
              <button
                onClick={manualRefresh}
                disabled={state.isRefreshing}
                type="button"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: state.isMobile ? '10px 16px' : '8px 16px',
                  color: '#ffffff',
                  cursor: state.isRefreshing ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: state.isMobile ? '0.95rem' : '0.9rem',
                  fontWeight: '500',
                  opacity: state.isRefreshing ? 0.7 : 1,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
                  width: state.isMobile ? '100%' : 'auto'
                }}
                onMouseEnter={(e) => {
                  if (!state.isRefreshing && !state.isMobile) {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!state.isMobile) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(37, 99, 235, 0.3)';
                  }
                }}
              >
                {state.isRefreshing ? (
                  <>
                    <Loader style={{ 
                      width: '16px', 
                      height: '16px', 
                      marginRight: '8px',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Refreshing...
                  </>
                ) : (
                  <>
                    <RefreshCw style={{ 
                      width: '16px', 
                      height: '16px', 
                      marginRight: '8px'
                    }} />
                    Refresh Now
                  </>
                )}
              </button>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Mail style={{ 
                color: '#3b82f6', 
                marginRight: '12px', 
                width: state.isMobile ? '20px' : '24px', 
                height: state.isMobile ? '20px' : '24px' 
              }} />
              <span style={{ 
                color: '#94a3b8', 
                fontSize: state.isMobile ? '1rem' : '1.1rem', 
                fontWeight: '500' 
              }}>Your Temporary Email</span>
            </div>
            <div style={{
              fontSize: state.isMobile ? '1.2rem' : '1.9rem',
              fontFamily: 'ui-monospace, monospace',
              color: '#60a5fa',
              fontWeight: '600',
              marginBottom: '20px',
              wordBreak: 'break-all',
              padding: state.isMobile ? '14px' : '16px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '8px',
              border: '1px solid rgba(37, 99, 235, 0.2)',
              textAlign: 'center'
            }}>
              {state.emailAddress || (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="kieru-loading" style={{ marginRight: '10px' }}></div>
                  Loading...
                </span>
              )}
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: state.isMobile ? '12px' : '16px',
              flexDirection: state.isMobile ? 'column' : 'row'
            }}>
              <button
                onClick={() => copyToClipboard(state.emailAddress)}
                disabled={!state.emailAddress}
                type="button"
                style={{
                  ...buttonPrimaryStyle,
                  minWidth: state.isMobile ? '100%' : '140px',
                  opacity: !state.emailAddress ? 0.5 : 1,
                  cursor: !state.emailAddress ? 'not-allowed' : 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (state.emailAddress && !state.isMobile) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!state.isMobile) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.3)';
                  }
                }}
              >
                <Copy style={{ marginRight: '8px', width: '18px', height: '18px' }} />
                Copy
              </button>
              <button
                onClick={() => initializeEmail(undefined, true)}
                disabled={state.loading}
                type="button"
                style={{
                  ...buttonSecondaryStyle,
                  minWidth: state.isMobile ? '100%' : '140px',
                  opacity: state.loading ? 0.5 : 1,
                  cursor: state.loading ? 'not-allowed' : 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (!state.loading && !state.isMobile) {
                    e.currentTarget.style.background = 'rgba(37, 99, 235, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!state.isMobile) {
                    e.currentTarget.style.background = 'rgba(37, 99, 235, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <RefreshCw style={{ 
                  marginRight: '8px', 
                  width: '18px', 
                  height: '18px',
                  animation: state.loading ? 'spin 1s linear infinite' : 'none'
                }} />
                New Email
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Email Section */}
      <div style={{ 
        marginBottom: state.isMobile ? '25px' : '35px'
      }}>
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <h6 style={{
              color: '#3b82f6',
              fontSize: state.isMobile ? '1rem' : '1.1rem',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              fontWeight: '600'
            }}>
              <User style={{ 
                marginRight: state.isMobile ? '10px' : '12px', 
                width: state.isMobile ? '18px' : '20px', 
                height: state.isMobile ? '18px' : '20px' 
              }} />
              Custom Username
            </h6>
          </div>
          <div style={{ padding: state.isMobile ? '16px' : '24px' }}>
            <div style={{ 
              display: 'flex', 
              gap: '12px',
              flexDirection: state.isMobile ? 'column' : 'row'
            }}>
              <input
                type="text"
                value={state.customEmail}
                onChange={(e) => updateState({ customEmail: e.target.value })}
                placeholder="Enter custom username"
                style={{
                  ...inputStyle,
                  flex: 1
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.6)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.3)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setCustomEmailAddress();
                  }
                }}
              />
              <button
                onClick={setCustomEmailAddress}
                disabled={state.loading || !state.customEmail.trim()}
                type="button"
                style={{
                  ...buttonSuccessStyle,
                  minWidth: state.isMobile ? '100%' : '80px',
                  opacity: state.loading || !state.customEmail.trim() ? 0.5 : 1,
                  cursor: state.loading || !state.customEmail.trim() ? 'not-allowed' : 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (!state.loading && state.customEmail.trim() && !state.isMobile) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!state.isMobile) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
                  }
                }}
              >
                SET
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Email Content Area - Mobile Responsive */}
      {state.isMobile ? (
        // Mobile Layout
        <>
          {state.mobileView === 'inbox' ? (
            // Inbox View
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <h5 style={{ 
                  margin: 0, 
                  fontSize: '1.1rem',
                  color: '#e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: '600'
                }}>
                  <Inbox style={{ marginRight: '10px', color: '#3b82f6', width: '20px', height: '20px' }} />
                  Inbox
                  {state.isRefreshing && (
                    <span style={{
                      marginLeft: '10px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      fontSize: '0.8rem',
                      color: '#60a5fa',
                      animation: 'pulse 1.5s infinite'
                    }}>
                      <Loader style={{ width: '12px', height: '12px', marginRight: '4px', animation: 'spin 1s linear infinite' }} />
                    </span>
                  )}
                </h5>
                <span style={{
                  background: 'rgba(37, 99, 235, 0.2)',
                  color: '#60a5fa',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {state.emailCount} emails
                </span>
              </div>
              <div style={{ 
                maxHeight: '500px', 
                overflowY: 'auto',
                overflowX: 'hidden'
              }}>
                {state.emails.length === 0 ? (
                  <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                    <CloudUpload style={{ 
                      width: '48px', 
                      height: '48px', 
                      color: '#475569',
                      margin: '0 auto 16px'
                    }} />
                    <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '8px', fontWeight: '500' }}>
                      No emails yet
                    </p>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                      Emails will appear here automatically
                    </p>
                  </div>
                ) : (
                  <div>
                    {state.emails.map((email: EmailItem) => (
                      <div
                        key={email.mail_id}
                        onClick={() => fetchEmailContent(email.mail_id)}
                        style={{
                          padding: '16px',
                          borderBottom: '1px solid rgba(37, 99, 235, 0.1)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          background: 'transparent'
                        }}
                        onTouchStart={(e) => {
                          const element = e.currentTarget;
                          element.style.background = 'rgba(37, 99, 235, 0.08)';
                        }}
                        onTouchEnd={(e) => {
                          const element = e.currentTarget;
                          setTimeout(() => {
                            if (element) {
                              element.style.background = 'transparent';
                            }
                          }, 200);
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ 
                              color: '#60a5fa', 
                              fontSize: '0.85rem',
                              marginBottom: '4px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              fontWeight: '500'
                            }}>
                              {email.mail_from}
                            </div>
                            <div style={{ 
                              color: '#e2e8f0', 
                              fontSize: '0.95rem',
                              fontWeight: '600',
                              marginBottom: '4px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {email.mail_subject || '(No Subject)'}
                            </div>
                            <div style={{ 
                              color: '#64748b',
                              fontSize: '0.85rem',
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical' as const,
                              lineHeight: '1.4'
                            }}>
                              {email.mail_excerpt}
                            </div>
                            <div style={{ 
                              color: '#475569', 
                              fontSize: '0.75rem',
                              marginTop: '6px'
                            }}>
                              {formatDate(email.mail_timestamp)}
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteEmails([email.mail_id]);
                            }}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#64748b',
                              cursor: 'pointer',
                              padding: '8px',
                              borderRadius: '6px',
                              transition: 'all 0.3s',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginLeft: '10px'
                            }}
                            onTouchStart={(e) => {
                              const element = e.currentTarget;
                              element.style.color = '#ef4444';
                              element.style.background = 'rgba(239, 68, 68, 0.1)';
                            }}
                            onTouchEnd={(e) => {
                              const element = e.currentTarget;
                              setTimeout(() => {
                                if (element) {
                                  element.style.color = '#64748b';
                                  element.style.background = 'transparent';
                                }
                              }, 200);
                            }}
                            type="button"
                          >
                            <Trash2 style={{ width: '18px', height: '18px' }} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Email Content View
            <div style={cardStyle}>
              <div style={{
                ...cardHeaderStyle,
                position: 'relative'
              }}>
                <button
                  onClick={() => updateState({ mobileView: 'inbox', selectedEmail: null })}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#3b82f6',
                    cursor: 'pointer',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    marginRight: '12px'
                  }}
                  type="button"
                >
                  <ArrowLeft style={{ width: '20px', height: '20px', marginRight: '6px' }} />
                  Back
                </button>
                <h5 style={{ 
                  margin: 0, 
                  fontSize: '1rem',
                  color: '#e2e8f0',
                  fontWeight: '600',
                  flex: 1
                }}>
                  Email Content
                </h5>
                <button
                  onClick={() => {
                    if (state.selectedEmail) {
                      deleteEmails([state.selectedEmail.mail_id]);
                    }
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ef4444',
                    cursor: 'pointer',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  type="button"
                >
                  <Trash2 style={{ width: '18px', height: '18px' }} />
                </button>
              </div>
              <div style={{ 
                maxHeight: '500px', 
                overflowY: 'auto',
                padding: '16px'
              }}>
                {state.selectedEmail && (
                  <div>
                    <div style={{
                      borderBottom: '1px solid rgba(37, 99, 235, 0.15)',
                      paddingBottom: '16px',
                      marginBottom: '16px'
                    }}>
                      <h3 style={{
                        fontSize: '1.2rem',
                        color: '#e2e8f0',
                        marginBottom: '12px',
                        fontWeight: '600',
                        wordBreak: 'break-word'
                      }}>
                        {state.selectedEmail.mail_subject || '(No Subject)'}
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'flex-start', 
                          color: '#94a3b8', 
                          fontSize: '0.85rem' 
                        }}>
                          <User style={{ width: '16px', height: '16px', marginRight: '8px', marginTop: '2px', color: '#60a5fa', flexShrink: 0 }} />
                          <div style={{ wordBreak: 'break-all' }}>
                            <span style={{ color: '#64748b', marginRight: '6px' }}>From:</span>
                            {state.selectedEmail.mail_from}
                          </div>
                        </div>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'flex-start', 
                          color: '#94a3b8', 
                          fontSize: '0.85rem' 
                        }}>
                          <Mail style={{ width: '16px', height: '16px', marginRight: '8px', marginTop: '2px', color: '#60a5fa', flexShrink: 0 }} />
                          <div style={{ wordBreak: 'break-all' }}>
                            <span style={{ color: '#64748b', marginRight: '6px' }}>To:</span>
                            {state.selectedEmail.mail_recipient}
                          </div>
                        </div>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          color: '#94a3b8', 
                          fontSize: '0.85rem' 
                        }}>
                          <Clock style={{ width: '16px', height: '16px', marginRight: '8px', color: '#60a5fa' }} />
                          <span style={{ color: '#64748b', marginRight: '6px' }}>Date:</span>
                          {formatDate(state.selectedEmail.mail_timestamp)}
                        </div>
                      </div>
                    </div>
                    <div 
                      style={{ 
                        color: '#cbd5e1', 
                        lineHeight: '1.8',
                        fontSize: '0.9rem',
                        wordBreak: 'break-word'
                      }}
                      dangerouslySetInnerHTML={{ 
                        __html: state.selectedEmail.mail_body || state.selectedEmail.mail_excerpt 
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        // Desktop Layout
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Inbox */}
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <h5 style={{ 
                margin: 0, 
                fontSize: '1.2rem',
                color: '#e2e8f0',
                display: 'flex',
                alignItems: 'center',
                fontWeight: '600'
              }}>
                <Inbox style={{ marginRight: '12px', color: '#3b82f6', width: '24px', height: '24px' }} />
                Inbox
                {state.isRefreshing && (
                  <span style={{
                    marginLeft: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontSize: '0.85rem',
                    color: '#60a5fa',
                    animation: 'pulse 1.5s infinite'
                  }}>
                    <Loader style={{ width: '14px', height: '14px', marginRight: '6px', animation: 'spin 1s linear infinite' }} />
                    Checking...
                  </span>
                )}
              </h5>
              <span style={{
                background: 'rgba(37, 99, 235, 0.2)',
                color: '#60a5fa',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}>
                {state.emailCount} emails
              </span>
            </div>
            <div style={{ 
              maxHeight: '600px', 
              overflowY: 'auto',
              overflowX: 'hidden'
            }}>
              {state.emails.length === 0 ? (
                <div style={{ padding: '80px 20px', textAlign: 'center' }}>
                  <CloudUpload style={{ 
                    width: '56px', 
                    height: '56px', 
                    color: '#475569',
                    margin: '0 auto 20px'
                  }} />
                  <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '8px', fontWeight: '500' }}>
                    No emails yet
                  </p>
                  <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                    Emails will appear here automatically
                  </p>
                </div>
              ) : (
                <div>
                  {state.emails.map((email: EmailItem) => (
                    <div
                      key={email.mail_id}
                      onClick={() => fetchEmailContent(email.mail_id)}
                      style={{
                        padding: '18px 24px',
                        borderBottom: '1px solid rgba(37, 99, 235, 0.1)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        background: state.selectedEmail?.mail_id === email.mail_id ? 
                          'linear-gradient(90deg, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0.05) 100%)' : 'transparent',
                        borderLeft: state.selectedEmail?.mail_id === email.mail_id ? 
                          '3px solid #3b82f6' : '3px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        if (state.selectedEmail?.mail_id !== email.mail_id) {
                          e.currentTarget.style.background = 'rgba(37, 99, 235, 0.08)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (state.selectedEmail?.mail_id !== email.mail_id) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ 
                            color: '#60a5fa', 
                            fontSize: '0.9rem',
                            marginBottom: '6px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontWeight: '500'
                          }}>
                            {email.mail_from}
                          </div>
                          <div style={{ 
                            color: '#e2e8f0', 
                            fontSize: '1rem',
                            fontWeight: '600',
                            marginBottom: '6px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {email.mail_subject || '(No Subject)'}
                          </div>
                          <div style={{ 
                            color: '#64748b',
                            fontSize: '0.9rem',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical' as const,
                            lineHeight: '1.4'
                          }}>
                            {email.mail_excerpt}
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '16px' }}>
                          <span style={{ 
                            color: '#475569', 
                            fontSize: '0.8rem',
                            whiteSpace: 'nowrap'
                          }}>
                            {formatDate(email.mail_timestamp)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteEmails([email.mail_id]);
                            }}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#64748b',
                              cursor: 'pointer',
                              padding: '6px',
                              borderRadius: '6px',
                              transition: 'all 0.3s',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#ef4444';
                              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = '#64748b';
                              e.currentTarget.style.background = 'transparent';
                            }}
                            type="button"
                          >
                            <Trash2 style={{ width: '16px', height: '16px' }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Email Content */}
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <h5 style={{ 
                margin: 0, 
                fontSize: '1.2rem',
                color: '#e2e8f0',
                display: 'flex',
                alignItems: 'center',
                fontWeight: '600'
              }}>
                <Info style={{ marginRight: '12px', color: '#3b82f6', width: '24px', height: '24px' }} />
                Email Content
              </h5>
            </div>
            <div style={{ 
              maxHeight: '600px', 
              overflowY: 'auto',
              padding: '24px'
            }}>
              {state.selectedEmail ? (
                <div>
                  <div style={{
                    borderBottom: '1px solid rgba(37, 99, 235, 0.15)',
                    paddingBottom: '20px',
                    marginBottom: '20px'
                  }}>
                    <h3 style={{
                      fontSize: '1.4rem',
                      color: '#e2e8f0',
                      marginBottom: '16px',
                      fontWeight: '600'
                    }}>
                      {state.selectedEmail.mail_subject || '(No Subject)'}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        color: '#94a3b8', 
                        fontSize: '0.95rem' 
                      }}>
                        <User style={{ width: '18px', height: '18px', marginRight: '10px', color: '#60a5fa' }} />
                        <span style={{ color: '#64748b', marginRight: '8px' }}>From:</span>
                        {state.selectedEmail.mail_from}
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        color: '#94a3b8', 
                        fontSize: '0.95rem' 
                      }}>
                        <Mail style={{ width: '18px', height: '18px', marginRight: '10px', color: '#60a5fa' }} />
                        <span style={{ color: '#64748b', marginRight: '8px' }}>To:</span>
                        {state.selectedEmail.mail_recipient}
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        color: '#94a3b8', 
                        fontSize: '0.95rem' 
                      }}>
                        <Clock style={{ width: '18px', height: '18px', marginRight: '10px', color: '#60a5fa' }} />
                        <span style={{ color: '#64748b', marginRight: '8px' }}>Date:</span>
                        {formatDate(state.selectedEmail.mail_timestamp)}
                      </div>
                    </div>
                  </div>
                  <div 
                    style={{ 
                      color: '#cbd5e1', 
                      lineHeight: '1.8',
                      fontSize: '0.95rem'
                    }}
                    dangerouslySetInnerHTML={{ 
                      __html: state.selectedEmail.mail_body || state.selectedEmail.mail_excerpt 
                    }}
                  />
                </div>
              ) : (
                <div style={{ padding: '80px 20px', textAlign: 'center' }}>
                  <Mail style={{ 
                    width: '56px', 
                    height: '56px', 
                    color: '#475569',
                    margin: '0 auto 20px'
                  }} />
                  <p style={{ color: '#94a3b8', fontSize: '1.1rem', fontWeight: '500' }}>
                    Select an email to view its content
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes kieru-text-glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(37, 99, 235, 0.5);
          }
          50% {
            text-shadow: 0 0 40px rgba(37, 99, 235, 0.8);
          }
        }
      `}</style>
    </div>
  );
}