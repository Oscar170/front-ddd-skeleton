import { UsernameValue } from "./Username";

export type LoginRepository = (username: UsernameValue) => boolean;
