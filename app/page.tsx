'use client';

import EmailClient from '@/components/EmailClient';
import React, { useEffect } from 'react';

export default function Home(): React.ReactElement {
  useEffect(() => {
    // Create animated particles
    const createAnimatedParticles = () => {
      const container = document.getElementById('animated-particles');
      if (!container) {
        const particlesDiv = document.createElement('div');
        particlesDiv.id = 'animated-particles';
        particlesDiv.className = 'particles-bg';
        
        for (let i = 0; i < 30; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.animationDelay = Math.random() * 10 + 's';
          particle.style.animationDuration = (Math.random() * 5 + 10) + 's';
          particlesDiv.appendChild(particle);
        }
        
        document.body.appendChild(particlesDiv);
      }
    };

    createAnimatedParticles();

    return () => {
      const particles = document.getElementById('animated-particles');
      if (particles) particles.remove();
    };
  }, []);

  return (
    <main>
      <EmailClient />
    </main>
  );
}