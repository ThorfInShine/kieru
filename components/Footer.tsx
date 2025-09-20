'use client';

import React from 'react';
import { Shield, Code, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'rgba(10, 14, 26, 0.6)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(37, 99, 235, 0.2)',
      color: '#ffffff',
      textAlign: 'center',
      padding: '30px 0',
      marginTop: '50px',
      position: 'relative',
      zIndex: 2
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '15px'
        }}>
          <div style={{
            color: '#2563eb',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textShadow: '0 0 10px rgba(37, 99, 235, 0.5)',
            letterSpacing: '2px'
          }}>
            <Shield style={{ marginRight: '10px', display: 'inline' }} />
            KIERU
          </div>
        </div>
        <p style={{ 
          margin: 0, 
          color: '#999999',
          letterSpacing: '1px'
        }}>
          © {currentYear} ThorfInShine. All rights reserved.
        </p>
        <div style={{
          marginTop: '15px',
          fontSize: '0.9rem',
          color: '#666666'
        }}>
          <Code style={{ marginRight: '5px', width: '16px', height: '16px', display: 'inline' }} />
          Temporary Email Service
        </div>
        <div style={{
          marginTop: '10px',
          fontSize: '0.85rem',
          color: '#555555',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          Made with <Heart style={{ margin: '0 5px', width: '14px', height: '14px', color: '#dc3545' }} /> for privacy
        </div>
      </div>
      
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #2563eb, transparent)'
      }}></div>
    </footer>
  );
};

export default Footer;