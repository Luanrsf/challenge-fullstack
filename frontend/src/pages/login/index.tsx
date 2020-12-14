import React, { useEffect, useState } from "react";

import api from "../../services/api";

import { Container } from "./styles";
import { Link, useHistory } from "react-router-dom";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    async function handleLogin(e: { preventDefault: () => void }) {
        e.preventDefault();
        try {
            const response = await api.post("/sessions", { email, password });
            if (response.statusText == "Created") {
                const { token, user } = response.data;
                localStorage.setItem("@Session:token", token);
                localStorage.setItem("@Session:user", JSON.stringify(user));

                history.push("/dashboard");
            }
        } catch (err) {
            console.log(err);
            return alert("Email ou senha incorretos");
        }
    }

    return (
        <Container>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    name="email"
                    placeholder="Insira seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                    type="text"
                    name="password"
                    placeholder="Insira sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button type="submit">Entrar</button>
            </form>
            <Link to="/register">Cadastrar-se</Link>
        </Container>
    );
};

export default Login;
