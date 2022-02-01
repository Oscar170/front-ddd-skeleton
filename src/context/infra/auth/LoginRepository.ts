import { LoginRepository } from "../../domain/auth/LoginRepository";

export const loginRepository: LoginRepository = () => Math.random() > 0.5;
