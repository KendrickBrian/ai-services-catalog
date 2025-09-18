
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  TrendingUp,
  CreditCard,
  Package,
} from 'lucide-react';

type ControlsProps = {
  categories: string[];
};

const iconClass = "w-5 h-5";

// Replacing most lucide icons with lightweight emojis to improve performance
const categoryIcons: { [key: string]: React.ReactNode } = {
  all: <LayoutGrid className={iconClass} />,
  Текст: '📝',
  Изображения: '🖼️',
  Код: '💻',
  Видео: '🎬',
  Аудио: '🎵',
  Маркетинг: '📈',
  Специальное: <CreditCard className={iconClass} />,
  Дизайн: '🎨',
  Разное: <Package className={iconClass} />,
  Автоматизация: '🤖',
  Продуктивность: '⚡️',
  'Бизнес и финансы': '💼',
  Образование: '🎓',
  Здоровье: '❤️‍🩹',
  '3D и моделирование': '🧊',
};

export default function Controls({ categories }: ControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === 'all' && name === 'category') {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      params.set('page', '1'); // Reset to first page on category change
      return params.toString();
    },
    [searchParams]
  );

  const handleCategoryChange = (value: string) => {
    router.push(pathname + '?' + createQueryString('category', value), {
      scroll: false,
    });
  };

  const currentCategory = searchParams.get('category') || 'all';

  const categoryOrder = [
    'all',
    'Текст',
    'Изображения',
    'Код',
    'Видео',
    'Аудио',
    'Дизайн',
    '3D и моделирование',
    'Маркетинг',
    'Продуктивность',
    'Автоматизация',
    'Бизнес и финансы',
    'Образование',
    'Здоровье',
    'Разное',
    'Специальное',
  ];

  const sortedCategories = [...categories].sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a);
    const bIndex = categoryOrder.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {sortedCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors shrink-0',
              currentCategory === cat
                ? 'bg-primary/20 text-primary-foreground'
                : 'bg-card/50 text-muted-foreground hover:bg-card/90 hover:text-white'
            )}
          >
            <span className="text-lg">{categoryIcons[cat] || '📁'}</span>
            <span className="capitalize">{cat === 'all' ? 'Все категории' : cat}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
