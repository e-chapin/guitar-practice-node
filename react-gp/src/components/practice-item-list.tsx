import React, { Component } from 'react';

import PracticeItemHandler from './practice-item';

import { PracticeItemListInterface } from './../interfaces';

// PracticeItemList

const PracticeItem = (props: PracticeItemListInterface) => {
  return (
    <div className="practice-item-list">
      <ul>
        {props.items.map((item) => (
          <li key={item.id}>
            <PracticeItemHandler
              item={item}
              handlePracticeItemUpdate={props.handlePracticeItemUpdate}
              handlePracticeItemBlur={props.handlePracticeItemBlur}
              handlePracticeItemComplete={props.handlePracticeItemComplete}
              handlePracticeItemRemove={props.handlePracticeItemRemove}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PracticeItem;
