'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { cn } from '@/lib/utils';
import {
  FileText,
  ImageIcon,
  Video,
  Music,
  Code,
  Sparkles,
  LayoutGrid,
  Bot,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Cuboid,
  Zap,
  TrendingUp,
  CreditCard,
  Package,
} from 'lucide-react';

type ControlsProps = {
  categories: string[];
};

const iconClass = "w-5 h-5";

const categoryIcons: { [key: string]: React.ReactNode } = {
  all: <LayoutGrid className={iconClass} />,
  Текст: '📝',
  Изображения: '🖼️',
  Код: '💻',
  Видео: '🎬',
  Аудио: '🎵',
  Маркетинг: <TrendingUp className={iconClass} />,
  Специальное: <CreditCard className={iconClass} />,
  Дизайн: <Sparkles className={iconClass} />,
  Разное: <Package className={iconClass} />,
  Автоматизация: <Bot className={iconClass} />,
  Продуктивность: <Zap className={iconClass} />,
  'Бизнес и финансы': <Briefcase className={iconClass} />,
  Образование: <GraduationCap className={iconClass} />,
  Здоровье: <HeartPulse className={iconClass} />,
  '3D и моделирование': <Cuboid className={iconClass} />,
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
            <span className="text-lg">{categoryIcons[cat] || categoryIcons['all']}</span>
            <span className="capitalize">{cat === 'all' ? 'Все категории' : cat}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
