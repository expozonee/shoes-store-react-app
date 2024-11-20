/* eslint-disable react-refresh/only-export-components */
import ProductCard from "../ProductCard/ProductCard";
import ProductsContainer from "../ProductsContainer/ProductsContainer";
import "./StoreProducts.css";
import { ShoeData } from "../../types/ShoeData";
import { useStore } from "../../provider/StoreProvider";
import { useEffect } from "react";

const URL = "https://shoes-store-react-backend.vercel.app";

export async function storeLoader() {
  const shoesDataRes = await fetch(`${URL}/shoes`);
  const shoesData: ShoeData[] = await shoesDataRes.json();

  return shoesData;
}

export default function StoreProducts() {
  const { storeItems, getShoes } = useStore();

  useEffect(() => {
    getShoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeItems]);

  return (
    <div>
      <ProductsContainer>
        {storeItems.map((s) => {
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
            />
          );
        })}
      </ProductsContainer>
    </div>
  );
}
