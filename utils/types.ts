import { SchemaDefinitionProperty } from "mongoose";

export interface CreateCardPayload {
  front: string;
  back: string;
  tags: string[];
  author: string;
  date?: DateConstructor | SchemaDefinitionProperty<DateConstructor>;
}

export interface UpdateCardPayload {
  front: string;
  back: string;
  tags: string[];
}

export interface CardPayload {
  _id: string;
  front: string;
  back: string;
  tags: string[];
  author: string;
  date?: DateConstructor | SchemaDefinitionProperty<DateConstructor>;
  __v: number;
}
