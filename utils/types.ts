export interface CreateCardPayload {
  front: string;
  back: string;
  tags: string[];
  author: string;
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
  __v: number;
}
