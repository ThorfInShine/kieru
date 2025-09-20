// app/about/page.tsx
'use client';

import React from 'react';
import { 
  Shield, 
  Lock, 
  Globe, 
  Zap, 
  Mail, 
  RefreshCw, 
  Clock, 
  UserX,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Server,
  Trash2,
  Eye,
  EyeOff,
  Info,
  Key,
  Database,
  Cpu,
  Settings
} from 'lucide-react';

const AboutPage = () => {
  const features = [
    {
      icon: <Shield className="w-10 h-10" />,
      title: 'Privacy Protection',
      description: 'Complete anonymity with no registration required'
    },
    {
      icon: <Clock className="w-10 h-10" />,
      title: 'Instant Generation',
      description: 'Create temporary email addresses instantly'
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: 'Multiple Domains',
      description: 'Choose from various domain options'
    },
    {
      icon: <RefreshCw className="w-10 h-10" />,
      title: 'Auto-Refresh',
      description: 'Real-time inbox updates every 10 seconds'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Generate Address',
      description: 'Click to instantly create a temporary email address',
      icon: <Mail className="w-5 h-5" />
    },
    {
      number: '02', 
      title: 'Copy & Use',
      description: 'Copy the address and use it for any online service',
      icon: <Globe className="w-5 h-5" />
    },
    {
      number: '03',
      title: 'Receive Emails',
      description: 'Emails appear in your inbox automatically',
      icon: <Server className="w-5 h-5" />
    },
    {
      number: '04',
      title: 'Read & Delete',
      description: 'View email content and delete when done',
      icon: <Eye className="w-5 h-5" />
    },
    {
      number: '05',
      title: 'Stay Anonymous',
      description: 'Your privacy remains protected throughout',
      icon: <EyeOff className="w-5 h-5" />
    }
  ];

  return (
    <div style={{ 
      maxWidth: '1000px', 
      margin: '0 auto', 
      padding: '40px 20px',
      position: 'relative',
      zIndex: 2
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#2563eb',
          textShadow: '0 0 20px rgba(37, 99, 235, 0.4)',
          letterSpacing: '2px',
          marginBottom: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Info style={{ marginRight: '15px' }} />
          About KIERU
        </h1>
        <p style={{ 
          color: '#cccccc', 
          fontSize: '1.1rem',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          fontWeight: '500'
        }}>
          Advanced Temporary Email Service Technology
        </p>
      </div>
      
      {/* Main Description - HAKAI Style Card */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          background: '#2563eb',
          padding: '15px 20px',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Shield style={{ marginRight: '12px', color: 'white' }} />
          <h5 style={{ 
            margin: 0, 
            fontSize: '1.1rem',
            color: 'white',
            fontWeight: '600'
          }}>
            What is KIERU?
          </h5>
        </div>
        <div style={{
          background: 'rgba(30, 35, 45, 0.95)',
          padding: '25px',
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px',
          border: '1px solid rgba(37, 99, 235, 0.2)',
          borderTop: 'none'
        }}>
          <p style={{ 
            fontSize: '1rem', 
            lineHeight: '1.8',
            color: '#cccccc',
            marginBottom: '20px'
          }}>
            KIERU (消える - "to disappear" in Japanese) is a cutting-edge temporary email service designed to protect 
            your privacy in the digital age. It provides instant, disposable email addresses that shield your real 
            identity from spam, marketing campaigns, and potential data breaches. With zero registration requirements 
            and complete anonymity, KIERU ensures your personal information remains truly personal.
          </p>
          
          {/* Key Capabilities Box */}
          <div style={{
            background: 'rgba(37, 99, 235, 0.1)',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid rgba(37, 99, 235, 0.2)'
          }}>
            <h6 style={{ 
              color: '#3b82f6', 
              marginBottom: '15px', 
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Zap style={{ marginRight: '10px' }} />
              Key Capabilities
            </h6>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <ul style={{ color: '#999', margin: 0, lineHeight: '1.8', fontSize: '0.9rem', paddingLeft: '20px' }}>
                <li>Instant email generation</li>
                <li>No registration needed</li>
                <li>Multiple domain options</li>
              </ul>
              <ul style={{ color: '#999', margin: 0, lineHeight: '1.8', fontSize: '0.9rem', paddingLeft: '20px' }}>
                <li>Real-time inbox updates</li>
                <li>Custom username support</li>
                <li>Zero data retention</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Core Features - Title */}
      <h2 style={{
        color: '#2563eb',
        textAlign: 'center',
        fontSize: '1.8rem',
        fontWeight: 'bold',
        textShadow: '0 0 15px rgba(37, 99, 235, 0.4)',
        marginBottom: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Settings style={{ marginRight: '12px' }} />
        Core Features
      </h2>

      {/* Features Grid - HAKAI Style */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '20px',
        marginBottom: '40px'
      }}>
        {features.map((feature, index) => (
          <div 
            key={index}
            style={{
              background: 'rgba(30, 35, 45, 0.95)',
              borderRadius: '12px',
              border: '1px solid rgba(37, 99, 235, 0.2)',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(37, 99, 235, 0.3)';
              e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.2)';
            }}
          >
            <div style={{
              padding: '25px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 20px',
                background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)'
              }}>
                {feature.icon}
              </div>
              <h5 style={{ 
                color: '#ffffff', 
                marginBottom: '12px',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>
                {feature.title}
              </h5>
              <p style={{ 
                color: '#999', 
                fontSize: '0.9rem',
                lineHeight: '1.5',
                margin: 0
              }}>
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Technical Implementation - HAKAI Style */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          background: '#2563eb',
          padding: '15px 20px',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Cpu style={{ marginRight: '12px', color: 'white' }} />
          <h5 style={{ 
            margin: 0, 
            fontSize: '1.1rem',
            color: 'white',
            fontWeight: '600'
          }}>
            Technical Implementation
          </h5>
        </div>
        <div style={{
          background: 'rgba(30, 35, 45, 0.95)',
          padding: '25px',
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px',
          border: '1px solid rgba(37, 99, 235, 0.2)',
          borderTop: 'none'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div>
              <h6 style={{ 
                color: '#3b82f6', 
                marginBottom: '15px', 
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center'
              }}>
                <ChevronRight style={{ marginRight: '8px' }} />
                Service Architecture
              </h6>
              <ul style={{ color: '#999', lineHeight: '1.8', fontSize: '0.9rem', paddingLeft: '20px' }}>
                <li><strong style={{ color: '#ccc' }}>Email Generation:</strong> Instant random address creation</li>
                <li><strong style={{ color: '#ccc' }}>MX Records:</strong> Configured for email reception</li>
                <li><strong style={{ color: '#ccc' }}>API Integration:</strong> RESTful API for operations</li>
                <li><strong style={{ color: '#ccc' }}>Real-time Updates:</strong> WebSocket connections</li>
                <li><strong style={{ color: '#ccc' }}>Data Purging:</strong> Automatic cleanup system</li>
              </ul>
            </div>
            <div>
              <h6 style={{ 
                color: '#3b82f6', 
                marginBottom: '15px', 
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Shield style={{ marginRight: '8px' }} />
                Privacy Features
              </h6>
              <ul style={{ color: '#999', lineHeight: '1.8', fontSize: '0.9rem', paddingLeft: '20px' }}>
                <li><strong style={{ color: '#ccc' }}>No Registration:</strong> Complete anonymity</li>
                <li><strong style={{ color: '#ccc' }}>No Cookies:</strong> Minimal tracking footprint</li>
                <li><strong style={{ color: '#ccc' }}>SSL Encryption:</strong> Secure connections</li>
                <li><strong style={{ color: '#ccc' }}>Auto-deletion:</strong> Temporary data storage</li>
                <li><strong style={{ color: '#ccc' }}>No Logs:</strong> Zero activity logging</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Usage Steps - HAKAI Style */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          background: '#2563eb',
          padding: '15px 20px',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <RefreshCw style={{ marginRight: '12px', color: 'white' }} />
          <h5 style={{ 
            margin: 0, 
            fontSize: '1.1rem',
            color: 'white',
            fontWeight: '600'
          }}>
            Step-by-Step Usage Guide
          </h5>
        </div>
        <div style={{
          background: 'rgba(30, 35, 45, 0.95)',
          padding: '25px',
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px',
          border: '1px solid rgba(37, 99, 235, 0.2)',
          borderTop: 'none'
        }}>
          {steps.map((step, index) => (
            <div 
              key={index} 
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(37, 99, 235, 0.05)',
                padding: '18px',
                borderRadius: '10px',
                border: '1px solid rgba(37, 99, 235, 0.2)',
                marginBottom: index < steps.length - 1 ? '15px' : 0,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(37, 99, 235, 0.08)';
                e.currentTarget.style.transform = 'translateX(3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(37, 99, 235, 0.05)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <div style={{
                minWidth: '50px',
                height: '50px',
                background: 'linear-gradient(45deg, #2563eb, #3b82f6)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '18px',
                boxShadow: '0 3px 10px rgba(37, 99, 235, 0.3)'
              }}>
                <span style={{
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {step.number}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <h6 style={{
                  color: '#ffffff',
                  fontSize: '1rem',
                  marginBottom: '5px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {React.cloneElement(step.icon, { 
                    style: { marginRight: '8px', color: '#3b82f6', fontSize: '0.9rem' }
                  })}
                  {step.title}
                </h6>
                <p style={{
                  color: '#999',
                  fontSize: '0.85rem',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Privacy Warning - HAKAI Style */}
      <div style={{
        background: 'rgba(37, 99, 235, 0.1)',
        border: '2px solid rgba(37, 99, 235, 0.3)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', alignItems: 'start' }}>
          <AlertCircle style={{ 
            fontSize: '2rem', 
            color: '#3b82f6', 
            marginRight: '15px',
            minWidth: '24px',
            marginTop: '2px'
          }} />
          <div>
            <h6 style={{ 
              color: '#3b82f6', 
              marginBottom: '10px',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}>
              Privacy & Security Notice
            </h6>
            <p style={{ 
              color: '#999', 
              marginBottom: 0,
              fontSize: '0.9rem',
              lineHeight: '1.6'
            }}>
              KIERU is designed with privacy as its core principle. We don't store personal information, 
              track users, or sell data. All temporary emails are automatically deleted after a short period. 
              This service is perfect for protecting your identity online while maintaining full functionality 
              for receiving important emails and confirmations.
            </p>
          </div>
        </div>
      </div>
      
      {/* Perfect For Section - HAKAI Style */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          background: '#2563eb',
          padding: '15px 20px',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <CheckCircle style={{ marginRight: '12px', color: 'white' }} />
          <h5 style={{ 
            margin: 0, 
            fontSize: '1.1rem',
            color: 'white',
            fontWeight: '600'
          }}>
            Perfect For
          </h5>
        </div>
        <div style={{
          background: 'rgba(30, 35, 45, 0.95)',
          padding: '25px',
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px',
          border: '1px solid rgba(37, 99, 235, 0.2)',
          borderTop: 'none'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
            {[
              'Online shopping without spam',
              'Testing website registrations',
              'Downloading resources safely',
              'Avoiding marketing emails',
              'Protecting personal inbox',
              'Anonymous communications'
            ].map((useCase, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 15px',
                  background: 'rgba(40, 167, 69, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(40, 167, 69, 0.3)'
                }}
              >
                <CheckCircle style={{ 
                  color: '#28a745', 
                  marginRight: '10px',
                  minWidth: '18px',
                  width: '18px',
                  height: '18px'
                }} />
                <span style={{ color: '#ccc', fontSize: '0.9rem' }}>{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* FAQ Section - HAKAI Style */}
      <div>
        <div style={{
          background: '#2563eb',
          padding: '15px 20px',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Info style={{ marginRight: '12px', color: 'white' }} />
          <h5 style={{ 
            margin: 0, 
            fontSize: '1.1rem',
            color: 'white',
            fontWeight: '600'
          }}>
            Frequently Asked Questions
          </h5>
        </div>
        <div style={{
          background: 'rgba(30, 35, 45, 0.95)',
          padding: '25px',
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px',
          border: '1px solid rgba(37, 99, 235, 0.2)',
          borderTop: 'none'
        }}>
          {[
            {
              q: 'How long do emails stay in the inbox?',
              a: 'Emails are temporarily stored and automatically deleted after a period to ensure privacy.'
            },
            {
              q: 'Can I send emails from KIERU?',
              a: 'KIERU is designed for receiving emails only to maintain anonymity and prevent abuse.'
            },
            {
              q: 'Is KIERU really free?',
              a: 'Yes, KIERU is completely free with no hidden charges or premium features.'
            },
            {
              q: 'Do I need to register or provide personal information?',
              a: 'No registration required. KIERU works instantly without any personal information.'
            }
          ].map((faq, index) => (
            <div 
              key={index}
              style={{
                marginBottom: index < 3 ? '20px' : 0,
                padding: '15px',
                background: 'rgba(37, 99, 235, 0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(37, 99, 235, 0.15)'
              }}
            >
              <h6 style={{ 
                color: '#3b82f6', 
                marginBottom: '8px',
                fontSize: '0.95rem',
                fontWeight: 'bold'
              }}>
                Q: {faq.q}
              </h6>
              <p style={{ 
                color: '#999', 
                margin: 0,
                fontSize: '0.9rem',
                lineHeight: '1.5'
              }}>
                A: {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;