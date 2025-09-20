import React from 'react';

interface KieruIconProps {
  size?: number;
  className?: string;
  animated?: boolean;
  glowEffect?: boolean;
  variant?: 'default' | 'small' | 'large';
}

const KieruIcon: React.FC<KieruIconProps> = ({ 
  size = 32, 
  className = '', 
  animated = false,
  glowEffect = false,
  variant = 'default'
}) => {
  const iconStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: variant === 'large' ? '15px' : '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #2563eb, #3b82f6, #1d4ed8)',
    color: 'white',
    fontWeight: 'bold',
    fontSize: `${size/2.5}px`,
    fontFamily: 'Orbitron, monospace',
    textShadow: '0 0 10px rgba(0,0,0,0.5)',
    border: variant === 'large' ? 
      '3px solid rgba(37, 99, 235, 0.4)' : 
      '2px solid rgba(37, 99, 235, 0.3)',
    boxShadow: glowEffect ? 
      `0 0 ${size/2}px rgba(37, 99, 235, 0.4), inset 0 0 ${size/4}px rgba(37, 99, 235, 0.1)` : 
      '0 4px 15px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    filter: glowEffect ? 
      `drop-shadow(0 0 ${size/3}px #2563eb) drop-shadow(0 0 ${size/6}px #3b82f6) brightness(1.1)` : 
      'brightness(1.05)',
    animation: animated ? 'kieru-float 3s ease-in-out infinite' : 'none',
    backdropFilter: 'blur(5px)'
  };

  const wrapperStyle: React.CSSProperties = {
    display: 'inline-block',
    position: 'relative',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer'
  };

  return (
    <div 
      className={`kieru-icon-wrapper ${className}`} 
      style={wrapperStyle}
    >
      <div style={iconStyle} className="kieru-icon">
        消 {/* Japanese character meaning "disappear/vanish" */}
      </div>
      
      {/* Rotating Glow Ring */}
      {glowEffect && (
        <div style={{
          position: 'absolute',
          top: '-8px',
          left: '-8px',
          right: '-8px',
          bottom: '-8px',
          borderRadius: variant === 'large' ? '20px' : '17px',
          background: `conic-gradient(from 0deg, transparent 0deg, #2563eb 90deg, transparent 180deg, #3b82f6 270deg, transparent 360deg)`,
          animation: 'kieru-rotate 4s linear infinite',
          zIndex: -1,
          opacity: 0.7,
          filter: 'blur(2px)'
        }}></div>
      )}
      
      {/* Inner glow effect */}
      {animated && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '8px',
          height: '8px',
          background: '#2563eb',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'kieru-pulse-dot 2s ease-in-out infinite',
          boxShadow: '0 0 15px #2563eb'
        }}></div>
      )}
    </div>
  );
};

export default KieruIcon;