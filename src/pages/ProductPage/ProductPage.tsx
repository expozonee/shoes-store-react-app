import "./ProductPage.css";
import { ShoeData } from "../../types/ShoeData";
import { Params, useLoaderData } from "react-router";

const URL = "https://shoes-store-react-backend.vercel.app";

export async function productLoader({ params }: { params: Params }) {
  const { id } = params;

  const shoeRes = await fetch(`${URL}/shoe/${id}`);
  const shoe = await shoeRes.json();

  return shoe;
}

export default function ProductPage() {
  const shoeData = useLoaderData() as ShoeData;
  return (
    <div className="product-page">
      <h1>{shoeData.name}</h1>
      <img src={shoeData.imageURL} alt={shoeData.name} />
      <p>{shoeData.name}</p>
      <p>Price: ${shoeData.price}</p>
      <button>Add to Cart</button>
    </div>
  );
}
