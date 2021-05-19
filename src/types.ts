export type Command = 'list' | 'add' | 'delete';
// export type Credential = 'netflix' | 'google' | 'web';

export type NewUserAndPw = {
  username: string;
  password: string;
};

export type CredentialType = {
  service: string;
  username: string;
  password: string;
};
