'use client';

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#2563eb',
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
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
        TaskFlow
      </h1>
      <p style={{ opacity: 0.9 }}>
        Localhost is working! Ready to build.
      </p>
    </main>
  );
}
