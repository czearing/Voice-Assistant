import * as React from 'react';
import { Input, Button } from '@fluentui/react-components';
import { useOpenAi } from '../utils';

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
      <h3>Name my pet</h3>
      <Input type="text" name="animal" placeholder="Enter an animal" value={animalInput} onChange={onInputChange} />
      <Button onClick={onSubmit}>Generate names</Button>
      <div>{enabled && isLoading ? '...Loading' : data}</div>
    </div>
  );
};
export default IndexPage;
