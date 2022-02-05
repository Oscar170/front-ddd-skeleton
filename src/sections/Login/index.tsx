import React, { useState } from "react";
import { hasError } from "../../context/shared/useCase";
import { container } from "../../context/workflow/index";
import Show from "../../components/utils/Show";
import { useInput } from "../../hooks/useInput";

const Login: React.FC = () => {
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
        <input type="text" value={username} onChange={setUsername} />
        <input type="password" value={password} onChange={setPassword} />
        <input type="submit" value="LOGIN" />
      </form>
      <Show
        when={Boolean(token) || error}
        fallback={<span>Waiting to login</span>}
      >
        <Show when={!error} fallback={<span>Some unexpected error</span>}>
          <span>Token: {token}</span>
        </Show>
      </Show>
    </>
  );
};

export default Login;
