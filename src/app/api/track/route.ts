// src/app/api/track/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { handleCardClick } from '@/app/actions/telegram-actions';
import { ClickDataSchema } from '@/app/actions/telegram-schemas';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const validatedData = ClickDataSchema.safeParse(data);

    if (validatedData.success) {
      // Дожидаемся отправки уведомления в Telegram
      await handleCardClick(validatedData.data);
      
      // Возвращаем успешный ответ
      return NextResponse.json({ success: true }, { status: 200 });

    } else {
      console.error('Invalid data for tracking:', validatedData.error);
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in tracking endpoint:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
