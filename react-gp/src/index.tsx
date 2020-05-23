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
    debugger;
    getItems();
  }, []);

  function getItems() {
    fetch('http://localhost:3001/api/practice-items/all')
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        debugger;
        //setItems(data);
      });
  }

  // Creating new todo item
  function handlePracticeItemCreate(item: PracticeItemInterface) {
    // Prepare new todos state
    const newPracticeItemState: PracticeItemInterface[] = [...items];
    // Update new todos state
    newPracticeItemState.push(item);
    // Update todos state
    setItems(newPracticeItemState);
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
    const newPracticeItemState: PracticeItemInterface[] = items.filter(
      (item: PracticeItemInterface) => item.id !== id
    );

    setItems(newPracticeItemState);
  }

  function handlePracticeItemComplete(id: string) {
    const newPracticeItemState: PracticeItemInterface[] = [...items];

    const practiceItem: PracticeItemInterface = newPracticeItemState.find(
      (item: PracticeItemInterface) => item.id === id
    )!;

    practiceItem.isCompleted = !practiceItem.isCompleted;

    setItems(newPracticeItemState);
  }

  function handlePracticeItemBlur(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length === 0) {
      event.target.classList.add('practice-item-error');
    } else {
      event.target.classList.remove('practice-item-error');
    }
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
