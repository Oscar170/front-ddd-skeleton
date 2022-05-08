import { useState } from "react";
import { hasError } from "@/context/shared/useCase";
import { useInput } from "@/hooks/useInput";
import { useContainer } from "@/hooks/useContainer";
import Match, { Case } from "@/components/flow/Match";
import Show from "@/components/flow/Show";

const hasTryLogged = (token: string | undefined, error: boolean) => {
  return Boolean(token) || error;
};

const Login: React.FC = () => {
  const container = useContainer();
  const [username, setUsername] = useInput("");
  const [password, setPassword] = useInput("");
  const [error, setError] = useState(false);
  const [token, setToken] = useState<string>();

  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const login = await container.get("login");
    const [err, token] = await login({
      username,
      password,
    });

    setError(Boolean(err));
    if (hasError(err, token)) {
      console.error(err);
      return;
    }

    setToken(token);
  };

  return (
    <>
      <form onSubmit={handleSubmitLogin}>
        <div>
          <label htmlFor="username-field">Username</label>
          <input
            id="username-field"
            type="text"
            name="username"
            value={username}
            onChange={setUsername}
          />
        </div>
        <div>
          <label htmlFor="password-field">Password</label>
          <input
            id="password-field"
            type="password"
            name="password"
            value={password}
            onChange={setPassword}
          />
        </div>
        <button type="submit">LOGIN</button>
      </form>
      <Show
        when={hasTryLogged(token, error)}
        fallback={<span data-testid="login-waiting">Waiting to login</span>}
      >
        <Match>
          <Case when={error}>
            <span data-testid="login-error">Some unexpected error</span>
          </Case>
          <Case when={!error}>
            <span data-testid="login-success">Token: {token}</span>
          </Case>
        </Match>
      </Show>
    </>
  );
};

export default Login;
