import StoreGallery from '@/components/StoreGallery';

export default function AboutPage() {
  return (
    <div style={{ padding: '8rem 0' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '8rem' }}>
          <span className="blue-gradient-text" style={{ fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Our Story
          </span>
          <h1 className="gradient-text" style={{ fontSize: '4rem', marginTop: '0.5rem', marginBottom: '2rem' }}>
            Tech-First, <br />Berlin Always.
          </h1>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#888' }}>
            Founded in the heart of Berlin Mitte, Berlin Smart Devices was born from a passion 
            for the intersection of minimalist design and bleeding-edge technology. We don't just 
            sell phones; we curate the tools of the modern digital artisan.
          </p>
        </div>
      </div>

      <StoreGallery />

      <div className="container" style={{ marginTop: '8rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '6rem' }}>
          <div>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)', fontSize: '1.8rem' }}>The Mission</h3>
            <p style={{ color: '#888', lineHeight: '1.6' }}>
              To provide the Berlin tech community with a trusted source for verified 
              smart devices, combining the convenience of digital retail with the expert 
              touch of our local showroom.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)', fontSize: '1.8rem' }}>The Values</h3>
            <p style={{ color: '#888', lineHeight: '1.6' }}>
              Transparency, quality, and community. We vet every device that passes through our 
              hands as if it were our own.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
