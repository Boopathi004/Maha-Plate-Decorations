import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide loader after the progress bar animation completes (2s) + fade-out time
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      id="page-loader"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #78350f 0%, #92400e 40%, #b45309 70%, #78350f 100%)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        animation: visible ? 'none' : 'loaderFadeOut 0.8s cubic-bezier(0.77,0,0.175,1) forwards',
      }}
    >
      {/* Decorative floating orbs */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '-5%',
        width: 350,
        height: 350,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '-5%',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Loader content */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Logo icon */}
        <div style={{
          width: 110,
          height: 110,
          borderRadius: '50%',
          border: '3px solid rgba(251,191,36,0.6)',
          boxShadow: '0 0 30px rgba(251,191,36,0.2)',
          margin: '0 auto 24px auto',
          overflow: 'hidden',
          animation: 'loaderLogoFadeUp 1.2s forwards 0.2s',
          opacity: 0,
        }}>
          <img
            src="/images/logo.jpg"
            alt="Maha Plate Designing"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Brand name */}
        <div style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: '2.2rem',
          fontWeight: 700,
          color: '#fef3c7',
          letterSpacing: '-0.01em',
          lineHeight: 1.1,
          marginBottom: 6,
          animation: 'loaderLogoFadeUp 1.2s forwards 0.4s',
          opacity: 0,
        }}>
          Maha Plate
        </div>

        {/* Subtitle */}
        <div style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: '0.65rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.22em',
          color: 'rgba(251,191,36,0.85)',
          marginBottom: 28,
          animation: 'loaderLogoFadeUp 1.2s forwards 0.6s',
          opacity: 0,
        }}>
          Designing
        </div>

        {/* Progress bar */}
        <div style={{
          width: 160,
          height: 2,
          background: 'rgba(255,255,255,0.15)',
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 99,
        }}>
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: 0,
            background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
            borderRadius: 99,
            animation: 'loaderProgress 2s cubic-bezier(0.4,0,0.2,1) forwards 0.3s',
          }} />
        </div>

        {/* Tagline */}
        <div style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: '0.7rem',
          color: 'rgba(254,243,199,0.5)',
          marginTop: 16,
          letterSpacing: '0.08em',
          animation: 'loaderLogoFadeUp 1.2s forwards 0.8s',
          opacity: 0,
        }}>
          Tradition · Elegance · Blessings
        </div>
      </div>

      <style>{`
        @keyframes loaderLogoFadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
          from {
            opacity: 0;
            transform: translateY(20px);
          }
        }
        @keyframes loaderProgress {
          to { width: 100%; }
        }
        @keyframes loaderFadeOut {
          to { opacity: 0; pointer-events: none; }
        }
      `}</style>
    </div>
  );
}
