import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

export const SideBar = styled.div`
    display: flex;
    width: 30vw;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h1 {
        text-align: center;
    }
    form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        textarea {
            width: 290px;
            height: 100px;
            background-color: #d9d9d9;
            color: #8c8c8c;
            margin-top: 16px;
            border-radius: 10px;
            box-shadow: none;
            padding: 16px;
            border: 1px solid #d9d9d9;
            outline: none;
            resize: none;
        }
        input {
            width: 290px;
            height: 30px;
            background-color: #d9d9d9;
            color: #8c8c8c;
            margin-top: 16px;
            border-radius: 10px;
            box-shadow: none;
            padding: 16px;
            border: 1px solid #d9d9d9;
        }
        button {
            width: 200px;
            height: 30px;
            border-radius: 20px;
            margin-top: 32px;
            background-color: #6d8c5e;
            border: 1px solid #404040;
        }
    }
`;
export const ContainerProducts = styled.div`
    display: flex;
    background-color: #404040;
    height: 100vh;
    color: #d9d9d9;
    width: 70vw;
    div {
        div {
            padding: 16px;
            display: flex;
            flex-direction: column;

            img {
                width: 300px;
            }
        }
        section {
            display: flex;
            flex-direction: column;
            justify-content: center;
            div {
                display: flex;
                flex-direction: row;
                p {
                    padding: 0 8px;
                }
            }
        }
    }
`;
