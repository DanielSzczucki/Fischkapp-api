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
  _id: string;
  front: string;
  back: string;
  tags: string[];
  author: string;
  date?: Date;
}
