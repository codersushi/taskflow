'use client';

export default function Home() {
  const bubbles = [
    { left: '8%', size: 6, duration: 14, delay: 0 },
    { left: '15%', size: 10, duration: 18, delay: 3 },
    { left: '24%', size: 4, duration: 12, delay: 1 },
    { left: '33%', size: 8, duration: 16, delay: 5 },
    { left: '42%', size: 5, duration: 13, delay: 2 },
    { left: '51%', size: 12, duration: 20, delay: 4 },
    { left: '60%', size: 6, duration: 15, delay: 1 },
    { left: '68%', size: 9, duration: 17, delay: 6 },
    { left: '77%', size: 4, duration: 11, delay: 2 },
    { left: '85%', size: 11, duration: 19, delay: 3 },
    { left: '92%', size: 7, duration: 14, delay: 5 },
    { left: '19%', size: 5, duration: 15, delay: 7 },
    { left: '47%', size: 7, duration: 16, delay: 8 },
    { left: '73%', size: 5, duration: 13, delay: 4 },
  ];

  return (
    <main
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        backgroundColor: '#08142b',
        backgroundImage: `
          radial-gradient(ellipse 60% 45% at 50% 4%, rgba(165, 243, 252, 0.92) 0%, rgba(34, 211, 238, 0.6) 32%, rgba(2, 132, 199, 0.25) 65%, transparent 100%),
          radial-gradient(circle at 50% 15%, #0369a1 0%, #0d2147 62%, #08142b 100%)
        `,
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        margin: 0,
        padding: '20px',
      }}
    >
      <style jsx>{`
        @keyframes swayRay {
          0%, 100% {
            transform: rotate(-14deg) translateX(0px) scaleY(1);
            opacity: 0.35;
          }
          50% {
            transform: rotate(-10deg) translateX(25px) scaleY(1.06);
            opacity: 0.55;
          }
        }

        @keyframes floatUp {
          0% {
            transform: translateY(105vh) translateX(0px);
            opacity: 0;
          }
          15% {
            opacity: 0.7;
          }
          50% {
            transform: translateY(50vh) translateX(15px);
          }
          85% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-10vh) translateX(-10px);
            opacity: 0;
          }
        }

        .sunbeam {
          position: absolute;
          top: -15%;
          width: 140px;
          height: 120vh;
          background: linear-gradient(
            180deg,
            rgba(186, 230, 253, 0.55) 0%,
            rgba(56, 189, 248, 0.18) 50%,
            transparent 100%
          );
          filter: blur(28px);
          transform-origin: top center;
          pointer-events: none;
          animation: swayRay 9s ease-in-out infinite;
        }

        .bubble {
          position: absolute;
          bottom: -20px;
          border-radius: 50%;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(255, 255, 255, 0.85),
            rgba(186, 230, 253, 0.25) 60%,
            rgba(56, 189, 248, 0.1) 100%
          );
          box-shadow: 0 0 8px rgba(125, 211, 252, 0.4);
          pointer-events: none;
          animation: floatUp linear infinite;
        }
      `}</style>

      {/* Underwater Sunbeams */}
      <div className="sunbeam" style={{ left: '28%', animationDelay: '0s' }} />
      <div className="sunbeam" style={{ left: '46%', width: '200px', animationDelay: '-3s' }} />
      <div className="sunbeam" style={{ left: '63%', width: '110px', animationDelay: '-6s' }} />

      {/* Rising Bubbles & Underwater Particles */}
      {bubbles.map((b, index) => (
        <span
          key={index}
          className="bubble"
          style={{
            left: b.left,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      {/* Main Content */}
      <div
        style={{
          zIndex: 10,
          textAlign: 'center',
          background: 'rgba(13, 33, 71, 0.4)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(186, 230, 253, 0.22)',
          padding: '32px 48px',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(8, 20, 43, 0.45)',
        }}
      >
        <h1
          style={{
            fontSize: '2.75rem',
            marginBottom: '0.5rem',
            textShadow: '0 2px 16px rgba(34, 211, 238, 0.5)',
          }}
        >
          TaskFlow
        </h1>
        <p style={{ opacity: 0.9, margin: 0 }}>
          Deep-sea theme active! Ready to build.
        </p>
      </div>
    </main>
  );
}
