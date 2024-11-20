import { User } from "../types/User";

const USERS = [
  {
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
  {
    email: "user@example.com",
    password: "user123",
    role: "user",
  },
];

export function verifyUser(email: string, password: string) {
  let msg: {
    ok: boolean;
    error: {
      [key: string]: string;
    };
    user: User | undefined;
  } = {
    ok: false,
    error: {},
    user: undefined,
  };

  if (!email) {
    msg = {
      ...msg,
      ok: false,
      error: {
        ...msg.error,
        email: "Email is required",
      },
    };

    return msg;
  }

  if (!password) {
    msg = {
      ...msg,
      ok: false,
      error: {
        ...msg.error,
        password: "Email is required",
      },
    };

    return msg;
  }

  const desiredUser = USERS.find((u) => u.email === email);

  if (!desiredUser) {
    return {
      ...msg,
      ok: false,
      error: {
        ...msg.error,
        notFound: "User not found",
      },
    };
  }

  const checkPassword = desiredUser.password === password;

  if (!checkPassword) {
    return {
      ...msg,
      ok: false,
      error: {
        incorrectPassword: "Password is incorrect",
      },
    };
  }

  return {
    ok: true,
    error: {},
    user: {
      email: desiredUser.email,
      role: desiredUser.role,
    },
  };
}
