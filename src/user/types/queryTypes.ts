export type User = {
  _id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  resetPasswordCode?: string;
};


export type UserIdentification = {
    _id?: string;
    email?: string;
  };

  export type ListFiltr = {
    limit?: number | 0;
    offset?: number | 0;
    sort?: {
      email?: -1 | 1;
      createdAt?: -1 | 1;
    };
  };
  