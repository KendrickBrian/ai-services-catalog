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
  description: string;
  link: string;
  image: string;
  dateAdded: string; // YYYY-MM-DD
  popularity: number; // 0-100
  tags?: string[];
  isFeatured?: boolean;
  isWantToPay?: boolean;
};

export const allServices: AIService[] = [
  {
    id: 'syntx-ai-bot',
    name: 'SYNTX',
    category: 'Текст',
    description:
      'Ультимативный Telegram-бот, который объединяет в себе лучшие нейросети: GPT-4o, Midjourney, Kandinsky, Stable Diffusion, Suno и другие. Предоставляет щедрый бесплатный пробный период для тестирования всех возможностей. Идеальное решение для тех, кто хочет попробовать всё и сразу.',
    link: 'https://t.me/syntxaibot?start=aff_179606810',
    image: '12',
    dateAdded: '2024-05-20',
    popularity: 100,
    tags: ['GPT-4o', 'Midjourney', 'Suno', 'DALL-E 3'],
    isFeatured: true,
  },
  {
    id: 'want-to-pay',
    name: 'Купить онлайн-карту',
    category: 'Специальное',
    description:
      'Нужна карта для оплаты зарубежных сервисов? Wanttopay поможет вам выпустить виртуальную карту Visa или Mastercard за пару минут. Пополняйте с российских карт и оплачивайте любые подписки.',
    link: 'https://t.me/WantToPayBot?start=w17851188--KOIV0',
    image: '11',
    dateAdded: '2024-01-01',
    popularity: 95,
    isWantToPay: true,
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'Текст',
    description:
      'Оригинальный и самый известный чат-бот от OpenAI. Умеет писать тексты, отвечать на вопросы, программировать и многое другое. Бесплатная версия GPT-3.5 доступна всем, а платные тарифы открывают доступ к GPT-4o с расширенными возможностями.',
    link: 'https://chat.openai.com/',
    image: '1',
    dateAdded: '2023-11-30',
    popularity: 98,
    tags: ['Текст', 'Диалог', 'OpenAI'],
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'Изображения',
    description:
      'Лидер в генерации изображений по текстовому запросу. Создает невероятно детализированные и художественные картинки. Работает через Discord. Есть ограниченный бесплатный триал, который периодически возобновляют.',
    link: 'https://www.midjourney.com/',
    image: '2',
    dateAdded: '2023-08-15',
    popularity: 97,
    tags: ['Изображения', 'Арт', 'Discord'],
  },
  {
    id: 'runwayml',
    name: 'RunwayML',
    category: 'Видео',
    description:
      'Мощный онлайн-редактор для видео с функциями на базе ИИ. Умеет генерировать видео по тексту (Gen-2), удалять фон, добавлять эффекты и многое другое. Предлагает бесплатный тариф с ограниченным количеством кредитов.',
    link: 'https://runwayml.com/',
    image: '4',
    dateAdded: '2024-02-10',
    popularity: 85,
    tags: ['Видео', 'Gen-2', 'Редактор'],
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    category: 'Аудио',
    description:
      'Сервис для генерации и клонирования голоса. Позволяет создавать реалистичную озвучку на разных языках и с разными акцентами. Есть бесплатный план, который отлично подходит для знакомства с технологией.',
    link: 'https://elevenlabs.io/',
    image: '5',
    dateAdded: '2024-01-20',
    popularity: 88,
    tags: ['Аудио', 'Голос', 'Озвучка'],
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'Код',
    description:
      'Ваш ИИ-напарник в программировании. Интегрируется в VS Code и другие редакторы, предлагает автодополнение кода, целые функции и помогает находить ошибки. Бесплатен для студентов и мейнтейнеров опенсорс-проектов.',
    link: 'https://github.com/features/copilot',
    image: '3',
    dateAdded: '2023-06-21',
    popularity: 92,
    tags: ['Код', 'Разработка', 'GitHub'],
  },
  {
    id: 'suno-ai',
    name: 'Suno AI',
    category: 'Аудио',
    description:
      'Создает полноценные песни с вокалом и музыкой по текстовому запросу. Просто опишите жанр, тему и настроение, и Suno сгенерирует трек. Бесплатные кредиты начисляются ежедневно.',
    link: 'https://www.suno.ai/',
    image: '9',
    dateAdded: '2024-03-22',
    popularity: 90,
    tags: ['Музыка', 'Аудио', 'Песни'],
  },
  {
    id: 'kandinsky',
    name: 'Kandinsky',
    category: 'Изображения',
    description:
      'Нейросеть от Сбера для генерации изображений. Отлично понимает запросы на русском языке и разбирается в российских культурных реалиях. Доступна бесплатно на разных платформах.',
    link: 'https://www.sberbank.com/promo/kandinsky',
    image: '8',
    dateAdded: '2023-10-05',
    popularity: 80,
    tags: ['Изображения', 'Сбер', 'Русский язык'],
  },
  {
    id: 'copy-ai',
    name: 'Copy.ai',
    category: 'Маркетинг',
    description:
      'Инструмент для маркетологов и копирайтеров. Помогает генерировать тексты для постов в соцсетях, email-рассылок, рекламных объявлений и описаний продуктов. Есть бесплатный план с ограничением по словам.',
    link: 'https://www.copy.ai/',
    image: '6',
    dateAdded: '2023-09-01',
    popularity: 75,
    tags: ['Копирайтинг', 'Маркетинг', 'Текст'],
  },
  {
    id: 'perplexity-ai',
    name: 'Perplexity AI',
    category: 'Текст',
    description:
      'Разговорный поисковик, который дает прямые ответы на вопросы со ссылками на источники. Отличная альтернатива обычному Google. Бесплатная версия очень функциональна.',
    link: 'https://www.perplexity.ai/',
    image: '7',
    dateAdded: '2024-04-10',
    popularity: 89,
    tags: ['Поиск', 'Ответы', 'Исследования'],
  },
  {
    id: 'leonardo-ai',
    name: 'Leonardo.Ai',
    category: 'Изображения',
    description:
      'Платформа для создания игровых ассетов и арта с помощью ИИ. Предлагает множество моделей, обученных на разных стилях. Ежедневно начисляются бесплатные токены для генерации.',
    link: 'https://leonardo.ai/',
    image: '10',
    dateAdded: '2024-03-01',
    popularity: 86,
    tags: ['Изображения', 'Геймдев', 'Арт'],
  },
];
