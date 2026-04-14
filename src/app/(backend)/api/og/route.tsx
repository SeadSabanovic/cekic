import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const dimensions = {
  width: 1200,
  height: 630,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title =
    searchParams.get('title')?.trim() ||
    process.env.NEXT_PUBLIC_SITE_NAME ||
    'Čekić';

  return new ImageResponse(
    <div
      tw="flex w-full h-full relative px-10"
      style={{ backgroundColor: '#f9fafb' }}
    >
      <div
        tw="flex flex-col items-start justify-between w-full p-20 relative"
        style={{
          borderLeft: '1px dashed #a4a6ab',
          borderRight: '1px dashed #a4a6ab',
        }}
      >
        <div className="flex text-xl">{process.env.NEXT_PUBLIC_SITE_NAME}</div>
        <h1 tw="text-[120px] font-bold font-geist">{title}</h1>
      </div>
    </div>,
    dimensions
  );
}
