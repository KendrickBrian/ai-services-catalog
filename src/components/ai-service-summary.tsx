import { summarizeAIService } from '@/ai/flows/summarize-ai-services';

type AIServiceSummaryProps = {
  description: string;
};

export default async function AIServiceSummary({
  description,
}: AIServiceSummaryProps) {
  try {
    const { summary } = await summarizeAIService({ description });
    return <p>{summary}</p>;
  } catch (error) {
    console.error('Failed to get summary:', error);
    // Fallback to showing a truncated version of the full description
    return <p>{description.slice(0, 100)}...</p>;
  }
}
