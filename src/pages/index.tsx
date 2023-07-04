import * as React from 'react';
import { Input, Button } from '@fluentui/react-components';
import { useQuery } from '@tanstack/react-query';
import { fetchOpenAi } from '../server';

const createPrompt = (response: string) => `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${response}
Names:`;

const useOpenAi = (input: string, enabled: boolean) => {
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

const IndexPage = () => {
  const [animalInput, setAnimalInput] = React.useState('');
  const [animalQuery, setAnimalQuery] = React.useState('');
  const [enabled, setEnabled] = React.useState(false);

  const { data, isLoading } = useOpenAi(animalQuery, enabled);

  const onSubmit = React.useCallback(() => {
    setAnimalQuery(animalInput);
    setEnabled(true);
  }, [animalInput]);

  const onInputChange = React.useCallback(ev => {
    setAnimalInput(ev.target.value);
  }, []);

  return (
    <div>
      <img src="/dog.png" />
      <h3>Name my pet</h3>
      <Input type="text" name="animal" placeholder="Enter an animal" value={animalInput} onChange={onInputChange} />
      <Button onClick={onSubmit}>Generate names</Button>
      <div>{enabled && isLoading ? '...Loading' : data}</div>
    </div>
  );
};
export default IndexPage;
