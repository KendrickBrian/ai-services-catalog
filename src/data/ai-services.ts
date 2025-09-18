export type AIService = {
  id: string;
  name: string;
  category:
    | 'Текст'
    | 'Изображения'
    | 'Код'
    | 'Видео'
    | 'Аудио'
    | 'Маркетинг'
    | 'Специальное';
  secondaryCategory?: 'Код' | 'Изображения' | 'Поиск';
  description: string;
  link: string;
  dateAdded: string; // YYYY-MM-DD
  popularity: number; // In thousands, so 150 = 150K
  rating: number; // 0-5
  tags?: ('Бесплатно' | 'Есть триал')[];
  isFeatured?: boolean;
  isWantToPay?: boolean;
  image?: string; // no longer used for display
};

export const allServices: AIService[] = [
  {
    id: 'syntx-ai-bot',
    name: 'SYNTX AI Bot',
    category: 'Текст', // "Все категории" is not a category, so let's pick a primary one.
    description:
      'Универсальный AI-бот с доступом ко всем топовым нейросетям',
    link: 'https://t.me/syntxaibot?start=aff_179606810',
    dateAdded: '2024-05-20',
    popularity: 150,
    rating: 5.0,
    tags: ['Есть триал'],
    isFeatured: true,
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'Текст',
    secondaryCategory: 'Код',
    description:
      'Самый популярный AI-ассистент от OpenAI',
    link: 'https://chat.openai.com/',
    dateAdded: '2023-11-30',
    popularity: 1000,
    rating: 4.8,
    tags: ['Бесплатно'],
  },
  {
    id: 'claude-ai',
    name: 'Claude AI',
    category: 'Текст',
    secondaryCategory: 'Код',
    description: 'Мощный AI от Anthropic с большим контекстом',
    link: 'https://claude.ai/',
    dateAdded: '2024-03-12',
    popularity: 500,
    rating: 4.9,
    tags: ['Бесплатно'],
  },
  {
    id: 'google-gemini',
    name: 'Google Gemini',
    category: 'Текст',
    secondaryCategory: 'Изображения',
    description: 'AI от Google с поиском в интернете',
    link: 'https://gemini.google.com/',
    dateAdded: '2024-02-08',
    popularity: 800,
    rating: 4.6,
    tags: ['Бесплатно'],
  },
  {
    id: 'perplexity-ai',
    name: 'Perplexity AI',
    category: 'Текст',
    secondaryCategory: 'Поиск',
    description:
      'AI-поисковик с источниками информации',
    link: 'https://www.perplexity.ai/',
    dateAdded: '2024-04-10',
    popularity: 300,
    rating: 4.7,
    tags: ['Бесплатно', 'Есть триал'],
  },
  {
    id: 'bing-image-creator',
    name: 'Bing Image Creator',
    category: 'Изображения',
    description: 'Бесплатная генерация изображений от Microsoft',
    link: 'https://www.bing.com/create',
    dateAdded: '2023-10-21',
    popularity: 600,
    rating: 4.5,
    tags: ['Бесплатно'],
  },
  {
    id: 'leonardo-ai',
    name: 'Leonardo.Ai',
    category: 'Изображения',
    description:
      'Профессиональная генерация изображений',
    link: 'https://leonardo.ai/',
    dateAdded: '2024-03-01',
    popularity: 400,
    rating: 4.4,
    tags: ['Бесплатно'],
  },
  {
    id: 'playground-ai',
    name: 'Playground AI',
    category: 'Изображения',
    description: '1000 бесплатных изображений в день',
    link: 'https://playground.com/',
    dateAdded: '2024-01-15',
    popularity: 350,
    rating: 4.6,
    tags: ['Бесплатно'],
  },
  {
    id: 'ideogram-ai',
    name: 'Ideogram AI',
    category: 'Изображения',
    description: 'Генерация изображений с текстом',
    link: 'https://ideogram.ai/',
    dateAdded: '2023-12-01',
    popularity: 250,
    rating: 4.3,
    tags: ['Бесплатно'],
  },
  {
    id: 'want-to-pay',
    name: 'Виртуальная карта для оплаты',
    category: 'Специальное',
    description:
      'Оплачивайте зарубежные сервисы без ограничений',
    link: 'https://t.me/WantToPayBot?start=w17851188--KOIV0',
    dateAdded: '2024-01-01',
    popularity: 95, // not used in this card
    rating: 5.0, // not used
    isWantToPay: true,
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'Изображения',
    description:
      'Лидер в генерации изображений. Создает невероятно детализированные и художественные картинки.',
    link: 'https://www.midjourney.com/',
    dateAdded: '2023-08-15',
    popularity: 970,
    rating: 4.9,
    tags: ['Есть триал'],
  },
  {
    id: 'runwayml',
    name: 'RunwayML',
    category: 'Видео',
    description:
      'Мощный онлайн-редактор для видео с функциями на базе ИИ. Умеет генерировать видео по тексту (Gen-2).',
    link: 'https://runwayml.com/',
    dateAdded: '2024-02-10',
    popularity: 850,
    rating: 4.7,
    tags: ['Бесплатно', 'Есть триал'],
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    category: 'Аудио',
    description:
      'Сервис для генерации и клонирования голоса. Реалистичная озвучка на разных языках.',
    link: 'https://elevenlabs.io/',
    dateAdded: '2024-01-20',
    popularity: 880,
    rating: 4.8,
    tags: ['Бесплатно', 'Есть триал'],
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'Код',
    description:
      'Ваш ИИ-напарник в программировании. Автодополнение кода, целые функции и поиск ошибок.',
    link: 'https://github.com/features/copilot',
    dateAdded: '2023-06-21',
    popularity: 920,
    rating: 4.7,
    tags: ['Есть триал'],
  },
  {
    id: 'suno-ai',
    name: 'Suno AI',
    category: 'Аудио',
    description:
      'Создает полноценные песни с вокалом и музыкой по текстовому запросу. Бесплатные кредиты ежедневно.',
    link: 'https://www.suno.ai/',
    dateAdded: '2024-03-22',
    popularity: 900,
    rating: 4.6,
    tags: ['Бесплатно'],
  },
];
