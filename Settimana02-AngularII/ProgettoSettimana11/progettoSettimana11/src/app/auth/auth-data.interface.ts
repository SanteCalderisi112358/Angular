export interface AuthData {
  accessToken: string;
  user: {
    password: string;
    email: string;
    nome: string;
    cognome: string;
    id: number;
  };
}
