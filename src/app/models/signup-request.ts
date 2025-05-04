export interface SignupRequestDTO {
  userName: string;
  email: string;
  password: string;
  nomeCompleto: string;
  filial: Set<string>;
  role: Set<string>;
}
