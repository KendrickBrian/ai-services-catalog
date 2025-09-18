
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { cn } from '@/lib/utils';
import {
  CreditCard,
  Package,
} from 'lucide-react';

type ControlsProps = {
  categories: string[];
  currentCategory: string;
};

const iconClass = "w-5 h-5";

const categoryIcons: { [key: string]: React.ReactNode } = {
  all: '🗂️',
  Текст: '📝',
  Изображения: '🖼️',
  Код: '💻',
  Видео: '🎬',
  Аудио: '🎵',
  Маркетинг: '📈',
  Специальное: '💳',
  Дизайн: '🎨',
  Разное: '📦',
  Автоматизация: '🤖',
  Продуктивность: '⚡️',
  'Бизнес и финансы': '💼',
  Образование: '🎓',
  Здоровье: '❤️‍🩹',
  '3D и моделирование': '🧊',
};

export default function Controls({ categories, currentCategory }: ControlsProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value === 'all') {
      params.delete('category');
    } else {
      params.set('category', value);
    }
    params.set('page', '1');
    router.push(pathname + '?' + params.toString(), {
      scroll: false,
    });
  };

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
