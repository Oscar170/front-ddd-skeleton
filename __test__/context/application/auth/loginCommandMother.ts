import { loginCommand } from "@/context/application/auth/login";

export const shortUsernameCommand = (): loginCommand => ({
  username: "som",
  password: "",
});

export const invalidFormatUsernameCommand = (): loginCommand => ({
  username: "some",
  password: "",
});

export const validCommand = (): loginCommand => ({
  username: "some@email.com",
  password: "",
});
