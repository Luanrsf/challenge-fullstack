import React, { useEffect, useState } from "react";

import api from "../../services/api";
// import socket from "../../services/socket";
import { Container, SideBar, ContainerProducts } from "./styles";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

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

const Variants: React.FC = () => {
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [picture, setPicture] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [variants, setVariants] = useState<IVariantsDTO>();
    const history = useHistory();

    const socket = io("http://localhost:3334", {
        transports: ["websocket", "polling", "flashsocket"],
    });

    const handleUpdateVariant = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const id = localStorage.getItem("@Variant:id");
        const priceConverted = parseInt(price);
        const amountConverted = parseInt(amount);
        socket.emit(
            "UpdateVariant",
            {
                amount: amountConverted,
                name,
                picture,
                description,
                price: priceConverted,
            },
            id
        );
    };

    ////
    //inicialização dos items sem ser pelo socket
    ////

    useEffect(() => {
        const id = localStorage.getItem("@Variant:id");
        const product_id = localStorage.getItem("@Product:id");
        const token = localStorage.getItem("@Session:token");
        const headerAuthenticated = {
            headers: {
                Authorization: `Bearer + ${token}`,
            },
        };
        async function loadRequest() {
            const response = await api.get("/products", headerAuthenticated);
            const productFind = response.data.find(
                (productItem: IProducts) => productItem._id === product_id
            );
            const variantFind = productFind.variants.find(
                (variant: IVariantsDTO) => variant._id == id
            );

            setVariants(variantFind);
        }

        loadRequest();
    }, []);

    useEffect(() => {
        socket.on("GetSingleVariant", (variants: IVariantsDTO) => {
            localStorage.removeItem("@Variant:id");
            localStorage.setItem("@Variant:id", variants._id);
            setVariants(variants);
        });
    }, [, socket]);

    return (
        <Container>
            <SideBar>
                <h1>Edite a variante do produto</h1>
                <form onSubmit={(e) => handleUpdateVariant(e)}>
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
                    <button type="submit">Editar Variante</button>
                </form>
            </SideBar>
            <div>
                <ContainerProducts>
                    <div>
                        <div>
                            <img src={variants?.picture}></img>
                            <h2>{variants?.name}</h2>
                        </div>
                        <section>
                            <div>
                                <p>Em estoque:{variants?.amount}</p>
                            </div>
                            <div>
                                <p>{variants?.description}</p>
                            </div>
                            <div>
                                <p>R$: {variants?.price}</p>
                            </div>
                        </section>
                    </div>
                </ContainerProducts>
            </div>
        </Container>
    );
};

export default Variants;
