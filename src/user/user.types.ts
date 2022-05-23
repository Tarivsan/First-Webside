export type User = {
    _id: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    resetPasswordCode?: string;
  };
  
  export type CreateUserPayload = Pick<
    User,
    "email" | "password" | "resetPasswordCode"
  >;
  export type UpdateUserPayload = Partial<CreateUserPayload>;
  export type PublicUser = Pick<User, "_id" | "email">;
  export type PrivateUser = Omit<User, "password">;
  