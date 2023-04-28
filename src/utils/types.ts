import { Types } from "mongoose";

export interface CreateCardPayload {
  front: string;
  back: string;
  tags: string[];
  author: string;
  date?: Date;
}

export interface UpdateCardPayload {
  front: string;
  back: string;
  tags: string[];
}

export interface CardPayload {
  _id: Types.ObjectId;
  front: string;
  back: string;
  tags: string[];
  author: string;
  date?: Date;
}
