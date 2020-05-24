import React, { Component } from 'react';
import { PracticeItemHandlerInterface } from './../interfaces';

// PracticeItemComponent

const PracticeItemHandler = (props: PracticeItemHandlerInterface) => {
  return (
    <div className="practice-item item">
      <div onClick={() => props.handlePracticeItemComplete(props.item.id)}>
        {props.item.is_completed ? (
          <span className="practice-item-checked">✔</span>
        ) : (
          <span className="practice-item-unchecked" />
        )}
      </div>
      <div className="practice-item-input-wrapper">
        <input
          type="text"
          value={props.item.text}
          onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
            props.handlePracticeItemBlur(event, props.item.id)
          }
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            props.handlePracticeItemUpdate(event, props.item.id)
          }
        />
      </div>

      <div
        className="item-remove"
        onClick={() => props.handlePracticeItemRemove(props.item.id)}
      >
        x
      </div>
    </div>
  );
};

export default PracticeItemHandler;
