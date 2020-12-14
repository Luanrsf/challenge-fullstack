import React, { useEffect, useState } from "react";

import api from "../../services/api";
// import socket from "../../services/socket";
import { Container, SideBar, ContainerProducts, IconGroup } from "./styles";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import { off } from "process";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";

interface IVariantsDTO {
    _id: string;
    amount: string;
    name: string;
    picture: string;
    description: string;
    price: string;
}
interface IProducts {
    _id: string;
    amount: string;
    name: string;
    picture: string;
    description: string;
    price: string;
    variants: IVariantsDTO[];
}
interface ProductsIdLess {
    amount: string;
    name: string;
    picture: string;
    description: string;
    price: string;
}

const Dashboard: React.FC = () => {
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [picture, setPicture] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [products, setProducts] = useState<IProducts[]>([]);
    const [product, setProduct] = useState<ProductsIdLess>();
    const history = useHistory();

    const socket = io("http://localhost:3334", {
        transports: ["websocket", "polling", "flashsocket"],
    });

    const handleAddProducts = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        socket.emit("RegisterProducts", {
            amount,
            name,
            picture,
            description,
            price,
        });
        setProduct({
            amount,
            name,
            picture,
            description,
            price,
        });
    };

    const handleDeleteProduct = (
        id: string,
        e: { preventDefault: () => void }
    ) => {
        e.preventDefault();
        socket.emit("DeleteProducts", id);
    };

    useEffect(() => {
        localStorage.removeItem("@Product:id");
        const token = localStorage.getItem("@Session:token");
        const headerAuthenticated = {
            headers: {
                Authorization: `Bearer + ${token}`,
            },
        };
        api.get("/products", headerAuthenticated).then((response) => {
            setProducts(response.data);
        });
    }, []);
    const handleEditProduct = (
        id: string,
        e: { preventDefault: () => void }
    ) => {
        e.preventDefault();
        localStorage.setItem("@Product:id", id);
        history.push("/products");
    };
    useEffect(() => {
        socket.on("GetProducts", (product: IProducts[]) => {
            setProducts(product);
        });
    }, [, product, socket]);

    return (
        <Container>
            <SideBar>
                <h1>Cadastre um produto</h1>
                <form onSubmit={handleAddProducts}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nome do produto"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                    <input
                        type="text"
                        name="amount"
                        placeholder="Quantidades de unidades"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    ></input>
                    <input
                        type="text"
                        name="picture"
                        placeholder="Foto do produto"
                        value={picture}
                        onChange={(e) => setPicture(e.target.value)}
                    ></input>
                    <textarea
                        name="description"
                        placeholder="Descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <input
                        type="text"
                        name="price"
                        placeholder="Preço do produto"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    ></input>
                    <button type="submit">Adicionar Produto</button>
                </form>
            </SideBar>
            <ContainerProducts>
                {products.map((product) => {
                    return (
                        <section key={product._id}>
                            <IconGroup>
                                <button
                                    type="button"
                                    onClick={(e) =>
                                        handleEditProduct(product._id, e)
                                    }
                                >
                                    <img src={editIcon}></img>
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) =>
                                        handleDeleteProduct(product._id, e)
                                    }
                                >
                                    <img src={deleteIcon}></img>
                                </button>
                            </IconGroup>
                            <img src={product.picture}></img>
                            <h4>{product.name}</h4>
                            <h3>R$:{product.price}</h3>
                        </section>
                    );
                })}
            </ContainerProducts>
        </Container>
    );
};

export default Dashboard;
