/* eslint-disable react-refresh/only-export-components */
import "./ProductPage.css";
import { ShoeData } from "../../types/ShoeData";
import { Params, useLoaderData } from "react-router";
import { useUser } from "../../provider/UserProvider";
import UpdateItemForm from "../../components/UpdateItemForm/UpdateItemForm";
import { useState } from "react";

const URL = "https://shoes-store-react-backend.vercel.app";

export async function productLoader({ params }: { params: Params }) {
  const { id } = params;

  const shoeRes = await fetch(`${URL}/shoe/${id}`);
  const shoe = await shoeRes.json();

  return shoe;
}

export default function ProductPage() {
  const [isUpdate, setIsUpdate] = useState(false);
  const { isAdmin } = useUser();

  const shoeData = useLoaderData() as ShoeData;
  return (
    <div className="product-page">
      {isUpdate ? (
        isAdmin ? (
          <UpdateItemForm
            id={shoeData.id}
            name={shoeData.name}
            price={shoeData.price}
            gender={shoeData.gender}
            brand={shoeData.brand}
            imageURL={shoeData.imageURL}
            slug={shoeData.slug}
            setUpdate={setIsUpdate}
          />
        ) : (
          <>
            <h1>{shoeData.name}</h1>
            <img src={shoeData.imageURL} alt={shoeData.name} />
            <p>{shoeData.name}</p>
            <p>Price: ${shoeData.price}</p>
            <button>Add to Cart</button>
            <button onClick={() => setIsUpdate(true)}>Update Product</button>
          </>
        )
      ) : (
        <>
          <h1>{shoeData.name}</h1>
          <img src={shoeData.imageURL} alt={shoeData.name} />
          <p>{shoeData.name}</p>
          <p>Price: ${shoeData.price}</p>
          <button>Add to Cart</button>
          <button onClick={() => setIsUpdate(true)}>Update Product</button>
        </>
      )}
    </div>
  );
}
