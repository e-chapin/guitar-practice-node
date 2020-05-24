// Import dependencies
import * as React from 'react';
import shortid from 'shortid';

import {
  PracticeItemInterface,
  PracticeItemFormInterface
} from './../interfaces';

const PracticeItemForm = (props: PracticeItemFormInterface) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [formState, setFormState] = React.useState('');

  // handle practice item input change
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState(event.target.value);
  }

  function handleInputEnter(event: React.KeyboardEvent) {
    if (event.key == 'Enter') {
      const newPracticeItem: PracticeItemInterface = {
        id: '',
        text: formState,
        is_completed: false
      };
      props.handlePracticeItemCreate(newPracticeItem);

      // reset ref
      if (inputRef && inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }

  return (
    <div className="practice-item-form">
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter new Practice Item"
        onChange={(event) => handleInputChange(event)}
        onKeyPress={(event) => handleInputEnter(event)}
      />
    </div>
  );
};

export default PracticeItemForm;
