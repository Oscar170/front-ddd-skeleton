import { login } from "../../application/auth/login";
import { loginRepository } from "../../infra/auth/LoginRepository";

export default login(loginRepository);
