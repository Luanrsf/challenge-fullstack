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
export const RollDiv = styled.div`
    overflow: auto;
    background-color: #404040;
`;
export const ContainerProducts = styled.div`
    display: flex;
    background-color: #404040;
    height: 25vh;
    color: #d9d9d9;
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
`;

export const ContainerVariants = styled.div`
    display: grid;
    width: 70vw;
    background-color: #404040;
    height: 75vh;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 32px;
    section {
        padding: 8px;
        margin: 8px;
        background-color: #8c8c8c;
        height: 240px;
        img {
            width: 120px;
            height: 100px;
        }
        h4 {
            color: #d9d9d9;
            margin-top: 8px;
            text-decoration: none;
        }
        h3 {
            margin-top: 16px;
            color: #d9d9d9;
            text-decoration: none;
        }
    }
`;

export const IconGroup = styled.div`
    width: auto;
    height: 26px;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 8px;
    a {
        img {
            width: 22px;
            height: 22px;
        }
    }
    button {
        background-color: Transparent;
        background-repeat: no-repeat;
        border: none;
        cursor: pointer;
        overflow: hidden;
        img {
            width: 22px;
            height: 22px;
        }
    }
`;
