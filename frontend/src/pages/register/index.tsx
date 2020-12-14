import React, { useEffect, useState } from "react";

import api from "../../services/api";

import { Container } from "./styles";
import { Link, useHistory } from "react-router-dom";

const Register: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleRegister = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const response = await api.post("/users/register", {
                name,
                email,
                password,
            });
            if (response.statusText == "Created") {
                alert("Conta criada com sucesso, basta logar");
                history.push("/");
            }
        } catch (err) {
            console.log(err);
            return alert("Email ja existente");
        }
    };

    return (
        <Container>
            <h1>Cadastro</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    name="name"
                    placeholder="Insira seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></input>
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
            <Link to="/">Voltar</Link>
        </Container>
    );
};

export default Register;
