import { useLoaderData } from "react-router";
import ProductCard from "../ProductCard/ProductCard";
import ProductsContainer from "../ProductsContainer/ProductsContainer";
import "./StoreProducts.css";
import { ShoeData } from "../../types/ShoeData";

const URL = "https://shoes-store-react-backend.vercel.app";

export async function storeLoader() {
  const shoesDataRes = await fetch(`${URL}/shoes`);
  const shoesData: ShoeData[] = await shoesDataRes.json();

  return shoesData;
}

export default function StoreProducts() {
  const data = useLoaderData() as ShoeData[];
  console.log(data);

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
            />
          );
        })}
      </ProductsContainer>
    </div>
  );
}
