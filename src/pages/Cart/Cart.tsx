import { useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useStore } from "../../provider/StoreProvider";
import "./Cart.css";

export default function Cart() {
  const { cartItems, fetchCartItems } = useStore();

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <div>
      {cartItems.map((ci) => {
        return (
          <ProductCard
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
