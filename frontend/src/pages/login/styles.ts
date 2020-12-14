import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 980px;
    background-color: #404040;
    height: 100vh;
    margin: 0 auto;
    a {
        text-decoration: none;
        color: #d9d9d9;
        margin-top: 16px;
    }
    h1 {
        color: #6d8c5e;
        font-size: 58px;
    }
    form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        input {
            width: 476px;
            height: 60px;
            background-color: #8c8c8c;
            color: #d9d9d9;
            margin-top: 16px;
            border-radius: 30px;
            box-shadow: none;
            padding: 16px;
            border: 1px solid #404040;
        }
        button {
            width: 476px;
            height: 50px;
            border-radius: 20px;
            margin-top: 32px;
            background-color: #6d8c5e;
            border: 1px solid #404040;
        }
    }
`;
