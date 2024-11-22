/* eslint-disable react-refresh/only-export-components */
import "./ProductPage.css";
import { useState } from "react";
import { ShoeData } from "../../types/ShoeData";
import { Params, useLoaderData } from "react-router";
import { useUser } from "../../provider/UserProvider";
import { useStore } from "../../provider/StoreProvider";
import UpdateItemForm from "../../components/UpdateItemForm/UpdateItemForm";

const URL = "https://shoes-store-react-backend.vercel.app";

export async function productLoader({ params }: { params: Params }) {
  const { id } = params;
  const shoeRes = await fetch(`${URL}/shoe/${id}`);
  const shoe = await shoeRes.json();

  if (!shoe) throw new Error("Product not found");

  return shoe;
}

export async function updateProductAction({
  params,
  request,
}: {
  params: Params;
  request: Request;
}) {
  const { id } = params;
  const formData = await request.formData();
  const data = {
    name: formData.get("name"),
    price: +formData.get("price")!,
    gender: formData.get("gender"),
    brand: formData.get("brand"),
    imageURL: formData.get("imageURL"),
    slug: formData.get("slug"),
  };

  const updateRes = await fetch(`${URL}/shoe/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const updataStatus: Response = await updateRes.json();

  if (!updataStatus.ok) {
    return updataStatus;
  }

  return updataStatus;
}

export default function ProductPage() {
  const [isUpdate, setIsUpdate] = useState(false);
  const { isAdmin } = useUser();
  const { addToCart, cartItems, removeItemFromCart } = useStore();
  const shoeData = useLoaderData() as ShoeData;

  function handleCartAdd(isInCart: boolean) {
    if (isInCart) {
      removeItemFromCart(shoeData.id);
    } else {
      const productToAdd = {
        id: shoeData.id,
        imageURL: shoeData.imageURL,
        brand: shoeData.brand,
        price: shoeData.price,
        name: shoeData.name,
        gender: shoeData.gender,
        slug: shoeData.slug,
      };

      addToCart(productToAdd);
    }
  }

  return (
    <div className="product-page">
      <div className="title-image__container">
        <h2>{shoeData.name}</h2>
        <img src={shoeData.imageURL} alt={shoeData.name} />
      </div>
      <div>
        <p className="price">Price: ${shoeData.price}</p>
        <button
          onClick={() => {
            handleCartAdd(
              cartItems.some((i: ShoeData) => i.id === shoeData.id)
            );
          }}
        >
          {cartItems.some((ci) => ci.id === shoeData.id)
            ? "Remove from cart"
            : "Add to Cart"}
        </button>
        {isAdmin && (
          <button onClick={() => setIsUpdate(!isUpdate)}>Update Product</button>
        )}
      </div>

      {isUpdate && isAdmin && (
        <div style={{ width: "100%", margin: "0 auto" }}>
          <UpdateItemForm
            id={shoeData.id}
            name={shoeData.name}
            price={shoeData.price}
            gender={shoeData.gender}
            brand={shoeData.brand}
            imageURL={shoeData.imageURL}
            slug={shoeData.slug}
          />
        </div>
      )}
    </div>
  );
}
