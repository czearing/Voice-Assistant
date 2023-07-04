import { useQuery } from '@tanstack/react-query';
import { fetchOpenAi } from '../server';
import { createPrompt } from './createPrompt';

export const useOpenAi = (input: string, enabled: boolean) => {
  const prompt = createPrompt(input);

  // Use the useQuery hook to fetch the data from the OpenAI API
  const { data, isLoading } = useQuery(['open-ai', prompt], () => fetchOpenAi(prompt), {
    enabled,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: true,
  });
  return { data, isLoading };
};
