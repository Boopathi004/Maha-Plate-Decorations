export default function WhatsAppButton() {
  const whatsappUrl = 'https://wa.me/916369961564?text=Hi%2C%20I%20would%20like%20to%20inquire%20about%20your%20plate%20decoration%20services.';
  const instagramUrl = 'https://www.instagram.com/maha_platings?igsh=MXhtODNxZmo3b3lmdA==';

  return (
    <>
      {/* Instagram Floating Button */}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="instagram-float-btn"
        aria-label="Follow us on Instagram"
        title="Follow us on Instagram"
      >
        <span className="ig-ring ig-ring-1" />
        <span className="ig-ring ig-ring-2" />

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="26"
          height="26"
          className="ig-icon"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
        <span className="ig-tooltip">Follow us on Instagram!</span>
      </a>

      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="whatsapp-float-btn"
        aria-label="Chat on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <span className="wa-ring wa-ring-1" />
        <span className="wa-ring wa-ring-2" />

        <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
          <path d="M12.031 2c-5.524 0-10 4.48-10 10 0 1.77.462 3.497 1.343 5.03l-1.43 5.228 5.344-1.4c1.488.813 3.162 1.24 4.887 1.24 5.524 0 10-4.48 10-10v-.002c-.001-5.518-4.477-9.998-10-9.998zm6.096 14.145c-.254.717-1.472 1.405-2.023 1.482-.552.077-1.077.29-3.527-.692-2.951-1.183-4.838-4.183-4.985-4.381-.148-.198-1.197-1.595-1.197-3.042 0-1.448.755-2.158 1.025-2.453.271-.295.59-.368.786-.368.197 0 .393.002.564.01.178.009.418-.068.656.505.242.583.829 2.025.9 2.172.072.148.12.32.02.52-.098.197-.148.32-.295.495-.148.175-.313.39-.446.52-.148.148-.303.31-.13.606.172.296.766 1.262 1.64 2.04.1.09.28.25.4.35.34.28.52.17.71-.05.19-.22.82-.96.93-1.29.11-.33.22-.27.37-.17.15.1.95.45 1.86.9.91.45 1.06.67 1.14.8.08.13.08.77-.18 1.49z" />
        </svg>
        <span className="wa-tooltip">Chat with us!</span>
      </a>

      <style>{`
        #instagram-float-btn {
          position: fixed;
          bottom: 104px;
          right: 28px;
          z-index: 9000;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 24px rgba(220, 35, 102, 0.45);
          text-decoration: none;
          animation: waBounceIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both 2.3s;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
        }
        #instagram-float-btn:hover {
          transform: scale(1.12) translateY(-4px);
          box-shadow: 0 12px 32px rgba(220, 35, 102, 0.55);
        }
        #instagram-float-btn:hover .ig-tooltip {
          opacity: 1;
          transform: translateX(-8px);
        }
        #instagram-float-btn:hover .ig-icon {
          animation: igIconWiggle 0.5s ease-in-out;
        }

        #whatsapp-float-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9000;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #25D366;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 24px rgba(37, 211, 102, 0.45);
          text-decoration: none;
          animation: waBounceIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both 2.6s;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
        }
        #whatsapp-float-btn:hover {
          transform: scale(1.12) translateY(-4px);
          box-shadow: 0 12px 32px rgba(37, 211, 102, 0.55);
        }
        #whatsapp-float-btn:hover .wa-tooltip {
          opacity: 1;
          transform: translateX(-8px);
        }

        /* Pulsing rings */
        .wa-ring, .ig-ring {
          position: absolute;
          border-radius: 50%;
          opacity: 0;
          inset: 0;
          pointer-events: none;
        }
        .wa-ring {
          border: 2px solid #25D366;
        }
        .ig-ring {
          border: 2px solid #dc2743;
        }

        .wa-ring-1 {
          animation: waRingPulse 2s ease-out infinite 3s;
        }
        .wa-ring-2 {
          animation: waRingPulse 2s ease-out infinite 3.5s;
        }
        .ig-ring-1 {
          animation: waRingPulse 2s ease-out infinite 2.5s;
        }
        .ig-ring-2 {
          animation: waRingPulse 2s ease-out infinite 3s;
        }

        /* Tooltips */
        .wa-tooltip, .ig-tooltip {
          position: absolute;
          right: calc(100% + 12px);
          top: 50%;
          transform: translateY(-50%) translateX(0px);
          background: #1a1a1a;
          color: #fff;
          font-size: 0.72rem;
          font-weight: 600;
          font-family: system-ui, sans-serif;
          white-space: nowrap;
          padding: 6px 12px;
          border-radius: 8px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .wa-tooltip::after, .ig-tooltip::after {
          content: '';
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          border: 5px solid transparent;
          border-left-color: #1a1a1a;
        }

        @keyframes waBounceIn {
          from { opacity: 0; transform: scale(0.3); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes waRingPulse {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes igIconWiggle {
          0%, 100% { transform: rotate(0); }
          25% { transform: rotate(-12deg); }
          75% { transform: rotate(12deg); }
        }
      `}</style>
    </>
  );
}
