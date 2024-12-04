export type Inputs = {
  userName: string;
  userEmail: string;
  age: string;
};

export interface ReceiveUserList {
  id: string;
  userName: string;
  userEmail: string;
  age: string;
}

export interface UpdateUserList {
  userName: string;
  userEmail: string;
  age: string;
}
