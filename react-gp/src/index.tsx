// Import dependencies
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
// Import components
import PracticeItemForm from './components/practice-item-form';
import PracticeItemList from './components/practice-item-list';
// Import interfaces
import { PracticeItemInterface } from './interfaces';

// Import styles
import './styles/styles.css';

const PracticeItemApp = () => {
  const [items, setItems] = React.useState<PracticeItemInterface[]>([]);

  useEffect(() => {
    getItems();
  }, []);

  function getItems() {
    fetch('/api/practice-item')
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        var practiceItems = JSON.parse(data);
        setItems(practiceItems);
      });
  }

  // Creating new todo item
  function handlePracticeItemCreate(item: PracticeItemInterface) {
    fetch('/api/practice-item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ item })
    }).then((response) => {
      getItems();
      return response.text();
    });
  }

  function handlePracticeItemUpdate(
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    const newPracticeItemState: PracticeItemInterface[] = [...items];
    newPracticeItemState.find(
      (item: PracticeItemInterface) => item.id === id
    )!.text = event.target.value;

    setItems(newPracticeItemState);
  }

  function handlePracticeItemRemove(id: string) {
    fetch('/api/practice-item', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then((response) => {
      getItems();
      return response.text();
    });
  }

  function handlePracticeItemComplete(id: string) {
    const newPracticeItemState: PracticeItemInterface[] = [...items];
    const practiceItem: PracticeItemInterface = newPracticeItemState.find(
      (item: PracticeItemInterface) => item.id === id
    )!;
    const is_completed: boolean = !practiceItem.is_completed;
    fetch('/api/practice-item/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, is_completed })
    }).then((response) => {
      getItems();
      return response.text();
    });
  }

  function handlePracticeItemBlur(
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    if (event.target.value.length === 0) {
      event.target.classList.add('practice-item-error');
    } else {
      event.target.classList.remove('practice-item-error');
    }

    const newPracticeItemState: PracticeItemInterface[] = [...items];
    var item = newPracticeItemState.find(
      (item: PracticeItemInterface) => item.id === id
    )!;

    if (item.text != event.target.value) {
      item.text = event.target.value;
    }

    fetch('/api/practice-item/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ item })
    }).then((response) => {
      getItems();
      return response.text();
    });
  }

  return (
    <div className="practice-item-app">
      <PracticeItemForm
        items={items}
        handlePracticeItemCreate={handlePracticeItemCreate}
      />
      <PracticeItemList
        items={items}
        handlePracticeItemUpdate={handlePracticeItemUpdate}
        handlePracticeItemRemove={handlePracticeItemRemove}
        handlePracticeItemComplete={handlePracticeItemComplete}
        handlePracticeItemBlur={handlePracticeItemBlur}
      />
    </div>
  );
}; // end PracticeItemApp

// Render the App in the DOM
const rootElement = document.getElementById('root');
render(<PracticeItemApp />, rootElement);
