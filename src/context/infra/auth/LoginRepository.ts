import { Either } from "@/utils/Either";
import { LoginRepository } from "../../domain/auth/LoginRepository";
import { Token } from "../../domain/auth/Token";

export const loginRepository: LoginRepository = () =>
  Promise.resolve(
    Either.of((crypto.randomUUID ? crypto.randomUUID() : "") as Token)
  );
