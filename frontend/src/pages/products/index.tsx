import React, { useEffect, useState } from "react";

import api from "../../services/api";

import {
    Container,
    SideBar,
    ContainerProducts,
    IconGroup,
    ContainerVariants,
    RollDiv,
} from "./styles";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
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

const Products: React.FC = () => {
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [picture, setPicture] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [variantAmount, setVariantAmount] = useState("");
    const [variantName, setVariantName] = useState("");
    const [variantPicture, setVariantPicture] = useState("");
    const [variantDescription, setVariantDescription] = useState("");
    const [variantPrice, setVariantPrice] = useState("");
    const [variants, setVariants] = useState<IVariantsDTO[]>([]);
    const [product, setProduct] = useState<IProducts>();

    const history = useHistory();

    const socket = io("http://localhost:3334", {
        transports: ["websocket", "polling", "flashsocket"],
    });

    const handleUpdateProduct = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const product_id = localStorage.getItem("@Product:id");
        const priceConverted = parseInt(price);
        const amountConverted = parseInt(amount);
        socket.emit(
            "UpdateProduct",
            {
                amount: amountConverted,
                name,
                picture,
                description,
                price: priceConverted,
            },
            product_id
        );
    };

    const handleDeleteVariant = (
        id: string,
        e: { preventDefault: () => void }
    ) => {
        const product_id = localStorage.getItem("@Product:id");
        e.preventDefault();

        socket.emit("DeleteVariants", id, product_id);
    };

    const handleAddVariant = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const product_id = localStorage.getItem("@Product:id");
        const priceConverted = parseInt(variantPrice);
        const amountConverted = parseInt(variantAmount);
        socket.emit(
            "RegisterVariant",
            {
                amount: amountConverted,
                name: variantName,
                picture: variantPicture,
                description: variantDescription,
                price: priceConverted,
            },
            product_id
        );
    };
    const handleEditVariant = (
        id: string,
        e: { preventDefault: () => void }
    ) => {
        e.preventDefault();
        localStorage.setItem("@Variant:id", id);
        history.push("/products/variants");
    };
    ////
    //inicialização dos items sem ser pelo socket
    ////

    useEffect(() => {
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

            setProduct(productFind);
            setVariants(productFind.variants);
        }

        loadRequest();
    }, []);

    useEffect(() => {
        socket.on("GetVariants", (variants: IVariantsDTO[]) => {
            setVariants(variants);
        });
    }, [, socket]);
    useEffect(() => {
        socket.on("GetSingleProduct", (product: IProducts) => {
            setProduct(product);
            localStorage.setItem("@Product:id", product._id);
        });
    }, [, socket]);

    return (
        <Container>
            <SideBar>
                <h1>Edite o produto</h1>
                <form onSubmit={(e) => handleUpdateProduct(e)}>
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
                    <button type="submit">Editar Produto</button>
                </form>
                <h1>Adicione uma variante</h1>
                <form onSubmit={handleAddVariant}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nome do produto"
                        value={variantName}
                        onChange={(e) => setVariantName(e.target.value)}
                    ></input>
                    <input
                        type="text"
                        name="amount"
                        placeholder="Quantidades de unidades"
                        value={variantAmount}
                        onChange={(e) => setVariantAmount(e.target.value)}
                    ></input>
                    <input
                        type="text"
                        name="picture"
                        placeholder="Foto do produto"
                        value={variantPicture}
                        onChange={(e) => setVariantPicture(e.target.value)}
                    ></input>
                    <textarea
                        name="description"
                        placeholder="Descrição"
                        value={variantDescription}
                        onChange={(e) => setVariantDescription(e.target.value)}
                    ></textarea>
                    <input
                        type="text"
                        name="price"
                        placeholder="Preço do produto"
                        value={variantPrice}
                        onChange={(e) => setVariantPrice(e.target.value)}
                    ></input>
                    <button type="submit">Adicionar Variante</button>
                </form>
            </SideBar>
            <RollDiv>
                <ContainerProducts>
                    <div>
                        <img src={product?.picture}></img>
                        <h2>{product?.name}</h2>
                    </div>
                    <section>
                        <div>
                            <p>Em estoque:{product?.amount}</p>
                        </div>
                        <div>
                            <p>{product?.description}</p>
                        </div>
                        <div>
                            <p>R$: {product?.price}</p>
                        </div>
                    </section>
                </ContainerProducts>
                <ContainerVariants>
                    {variants.map((variant) => {
                        return (
                            <section key={variant._id}>
                                <IconGroup>
                                    <button
                                        type="button"
                                        onClick={(e) =>
                                            handleEditVariant(variant._id, e)
                                        }
                                    >
                                        <img src={editIcon}></img>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) =>
                                            handleDeleteVariant(variant._id, e)
                                        }
                                    >
                                        <img src={deleteIcon}></img>
                                    </button>
                                </IconGroup>
                                <img src={variant.picture}></img>
                                <h4>{variant.name}</h4>
                                <h3>R$: {variant.price}</h3>
                            </section>
                        );
                    })}
                </ContainerVariants>
            </RollDiv>
        </Container>
    );
};

export default Products;
