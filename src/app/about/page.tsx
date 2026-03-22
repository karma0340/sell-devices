import StoreGallery from '@/components/StoreGallery';

export default function AboutPage() {
  return (
    <div style={{ padding: '7rem 0 4rem' }}>
      <style>{`
        @media (max-width: 600px) {
          .about-title { font-size: 2.2rem !important; }
          .about-header { margin-bottom: 3rem !important; }
          .about-p { font-size: 1rem !important; }
          .values-grid { gap: 2rem !important; }
          .about-hero { padding: 0 1rem; }
        }
      `}</style>
      <div className="container about-hero">
        <div className="about-header" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '8rem' }}>
          <span className="blue-gradient-text" style={{ fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>
            Our Story
          </span>
          <h1 className="gradient-text about-title" style={{ fontSize: '4rem', marginTop: '0.5rem', marginBottom: '2rem', lineHeight: 1.1 }}>
            Tech-First, Berlin Always.
          </h1>
          <p className="about-p" style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#888' }}>
            Founded in the heart of Berlin Mitte, Berlin Smart Devices was born from a passion 
            for the intersection of minimalist design and bleeding-edge technology. We don't just 
            sell phones; we curate the tools of the modern digital artisan.
          </p>
        </div>
      </div>

      <StoreGallery />

      <div className="container about-hero" style={{ marginTop: '5rem' }}>
        <div className="values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '6rem' }}>
          <div>
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary)', fontSize: '1.5rem' }}>The Mission</h3>
            <p style={{ color: '#888', lineHeight: '1.6', fontSize: '0.95rem' }}>
              To provide the Berlin tech community with a trusted source for verified 
              smart devices, combining the convenience of digital retail with the expert 
              touch of our local showroom.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary)', fontSize: '1.5rem' }}>The Values</h3>
            <p style={{ color: '#888', lineHeight: '1.6', fontSize: '0.95rem' }}>
              Transparency, quality, and community. We vet every device that passes through our 
              hands as if it were our own.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
