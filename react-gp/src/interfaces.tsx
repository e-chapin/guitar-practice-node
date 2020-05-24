import { Url } from 'url';
import { ReactHTML } from 'react';

// PracticeItem Interface
export interface PracticeItemInterface {
  id: string;
  text: string;
  description?: string;
  url?: Url;
  is_completed: boolean;
}

export interface PracticeItemFormInterface {
  items: PracticeItemInterface[];
  handlePracticeItemCreate: (item: PracticeItemInterface) => void;
}

export interface PracticeItemListInterface {
  items: PracticeItemInterface[];
  handlePracticeItemUpdate: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  handlePracticeItemRemove: (id: string) => void;
  handlePracticeItemComplete: (id: string) => void;
  handlePracticeItemBlur: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
}

export interface PracticeItemHandlerInterface {
  handlePracticeItemUpdate: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  item: PracticeItemInterface;

  handlePracticeItemRemove: (id: string) => void;
  handlePracticeItemComplete: (id: string) => void;
  handlePracticeItemBlur: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
}
