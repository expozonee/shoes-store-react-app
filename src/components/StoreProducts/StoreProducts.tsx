/* eslint-disable react-refresh/only-export-components */
import "./StoreProducts.css";
import { ShoeData } from "../../types/ShoeData";
import ProductCard from "../ProductCard/ProductCard";
import { redirect, useLoaderData } from "react-router";
import ProductsContainer from "../ProductsContainer/ProductsContainer";

const URL = "https://shoes-store-react-backend.vercel.app";

export async function storeLoader() {
  const shoesDataRes = await fetch(`${URL}/shoes`);
  const shoesData: ShoeData[] = await shoesDataRes.json();

  return shoesData;
}

export async function removeProductAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const id = formData.get("id");

  const deleteStatusRes = await fetch(`${URL}/delete/${id}`, {
    method: "DELETE",
  });

  const deleteStatus: Response = await deleteStatusRes.json();

  if (deleteStatus.ok) {
    const cartItems = localStorage.getItem("cart-items");

    if (cartItems) {
      const cartItemsData = JSON.parse(cartItems) as ShoeData[];
      const dataToAdd = cartItemsData.filter((ci) => ci.id !== id);
      localStorage.setItem("cart-items", JSON.stringify(dataToAdd));
    }

    return redirect("/store");
  }

  return deleteStatus;
}

export default function StoreProducts() {
  const data = useLoaderData() as ShoeData[];

  return (
    <div>
      <ProductsContainer>
        {data.map((s) => {
          return (
            <ProductCard
              key={s.id}
              id={s.id}
              imageURL={s.imageURL}
              brand={s.brand}
              title={s.name}
              price={s.price}
              slug={s.slug}
              gender={s.gender}
              cart
            />
          );
        })}
      </ProductsContainer>
    </div>
  );
}
