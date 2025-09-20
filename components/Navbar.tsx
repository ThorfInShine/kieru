'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, Info } from 'lucide-react';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav style={{
      backdropFilter: 'blur(20px)',
      padding: '16px 24px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo - Text Only */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          padding: '8px 15px',
          borderRadius: '20px'
        }}>
          <div>
            <div style={{
              fontSize: '2rem',
              fontWeight: '900',
              color: '#2563eb',
              letterSpacing: '5px',
              fontFamily: 'Orbitron, monospace',
              lineHeight: '1',
              marginBottom: '3px',
              background: 'linear-gradient(45deg, #2563eb, #3b82f6, #2563eb)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'kieru-text-glow 2s ease-in-out infinite'
            }}>
              KIERU
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: '#999999',
              fontWeight: '500',
              letterSpacing: '3px',
              fontFamily: 'Rajdhani, sans-serif',
              textTransform: 'uppercase',
              opacity: 0.8
            }}>
              テンポラリーメール v2.0
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }} className="desktop-menu">
          <Link
            href="/"
            style={{
              color: pathname === '/' ? '#2563eb' : '#ffffff',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              padding: '14px 28px',
              borderRadius: '30px',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              background: pathname === '/' ? 
                'linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(59, 130, 246, 0.1))' : 
                'transparent',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '1.05rem',
              border: pathname === '/' ? 
                '2px solid rgba(37, 99, 235, 0.4)' : 
                '2px solid transparent',
              position: 'relative',
              overflow: 'hidden',
              textShadow: pathname === '/' ? 
                '0 0 10px rgba(37, 99, 235, 0.5)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (pathname !== '/') {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(59, 130, 246, 0.05))';
                e.currentTarget.style.color = '#2563eb';
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (pathname !== '/') {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <Home style={{ marginRight: '12px', width: '20px', height: '20px' }} />
            Home
          </Link>

          <Link
            href="/about"
            style={{
              color: pathname === '/about' ? '#2563eb' : '#ffffff',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              padding: '14px 28px',
              borderRadius: '30px',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              background: pathname === '/about' ? 
                'linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(59, 130, 246, 0.1))' : 
                'transparent',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '1.05rem',
              border: pathname === '/about' ? 
                '2px solid rgba(37, 99, 235, 0.4)' : 
                '2px solid transparent',
              position: 'relative',
              overflow: 'hidden',
              textShadow: pathname === '/about' ? 
                '0 0 10px rgba(37, 99, 235, 0.5)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (pathname !== '/about') {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(59, 130, 246, 0.05))';
                e.currentTarget.style.color = '#2563eb';
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (pathname !== '/about') {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <Info style={{ marginRight: '12px', width: '20px', height: '20px' }} />
            About
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'rgba(37, 99, 235, 0.1)',
            border: '2px solid rgba(37, 99, 235, 0.4)',
            borderRadius: '12px',
            padding: '10px',
            color: '#2563eb',
            cursor: 'pointer'
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(13, 17, 23, 0.98)',
          borderTop: '1px solid rgba(37, 99, 235, 0.3)',
          padding: '20px',
          backdropFilter: 'blur(10px)'
        }} className="mobile-menu">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'block',
              padding: '15px',
              color: pathname === '/' ? '#2563eb' : '#ffffff',
              textDecoration: 'none',
              borderRadius: '10px',
              marginBottom: '10px',
              background: pathname === '/' ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
              transition: 'all 0.3s ease'
            }}
          >
            <Home style={{ marginRight: '10px', width: '18px', height: '18px', display: 'inline' }} />
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'block',
              padding: '15px',
              color: pathname === '/about' ? '#2563eb' : '#ffffff',
              textDecoration: 'none',
              borderRadius: '10px',
              background: pathname === '/about' ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
              transition: 'all 0.3s ease'
            }}
          >
            <Info style={{ marginRight: '10px', width: '18px', height: '18px', display: 'inline' }} />
            About
          </Link>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-button {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;