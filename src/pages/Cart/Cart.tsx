/* eslint-disable react-hooks/exhaustive-deps */
import "./Cart.css";
import { useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useStore } from "../../provider/StoreProvider";

export default function Cart() {
  const { cartItems, fetchCartItems } = useStore();

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="card__container">
      {cartItems.map((ci) => {
        return (
          <ProductCard
            key={ci.id}
            id={ci.id}
            imageURL={ci.imageURL}
            price={ci.price}
            gender={ci.gender}
            title={ci.name}
            brand={ci.brand}
            slug={ci.slug}
          />
        );
      })}
    </div>
  );
}
