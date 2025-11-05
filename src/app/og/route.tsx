import { ImageResponse } from '@vercel/og';
export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Dickfos Brothers';
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          background: '#0B0B0C',
          color: 'white',
          padding: '64px',
        }}
      >
        <div style={{ fontSize: 28, color: '#A78BFA', marginBottom: 12 }}>Resemblance • Dickfos Brothers</div>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

