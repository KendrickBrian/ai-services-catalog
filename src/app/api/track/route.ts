// src/app/api/track/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { handleCardClick } from '@/app/actions/telegram-actions';
import { ClickDataSchema } from '@/app/actions/telegram-schemas';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const data = {
      serviceName: searchParams.get('serviceName'),
      serviceLink: searchParams.get('serviceLink'),
    };
    
    const validatedData = ClickDataSchema.safeParse(data);

    if (validatedData.success) {
      // Не ждем ответа, чтобы не блокировать запрос пикселя
      handleCardClick(validatedData.data);
      
      // Возвращаем 1x1 прозрачный GIF
      const imageBuffer = Buffer.from(
        'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
        'base64'
      );
      
      return new NextResponse(imageBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'image/gif',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });

    } else {
      console.error('Invalid data for tracking:', validatedData.error);
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in tracking endpoint:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
