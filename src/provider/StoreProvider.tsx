/* eslint-disable react-refresh/only-export-components */
import { ShoeData } from "../types/ShoeData";
import { createContext, ReactNode, useContext, useState } from "react";

const URL = "https://shoes-store-react-backend.vercel.app";

type Response = {
  ok: boolean;
  message: string;
};

type Data = {
  name: string;
  brand: string;
  gender: string;
  price: number;
  imageURL: string;
  slug: string;
};

type StoreContext = {
  cartItems: ShoeData[];
  storeItems: ShoeData[];
  addToCart(item: ShoeData): void;
  removeItemFromCart(id: string): void;
  clearCart(): void;
  removeItemFromStore(id: string): Promise<Response>;
  updateItem(data: ShoeData): Promise<Response>;
  addItemToStore(data: Data): Promise<Response>;
};

type StoreProviderProps = {
  children: ReactNode;
};

const StoreContext = createContext<StoreContext | null>(null);

export default function StoreProvider({ children }: StoreProviderProps) {
  const [storeItems, setStoreItems] = useState<ShoeData[]>([]);
  const [cartItems, setCartItems] = useState<ShoeData[]>([]);

  function addToCart(item: ShoeData) {
    setCartItems((c) => {
      return [...c, item];
    });

    localStorage.setItem("cart-items", JSON.stringify(cartItems));
  }

  function removeItemFromCart(id: string) {
    setCartItems((c) => c.filter((ci) => ci.id !== id));
    localStorage.setItem("cart-items", JSON.stringify(cartItems));
  }

  function clearCart() {
    setCartItems([]);
    localStorage.removeItem("cart-items");
  }

  async function removeItemFromStore(id: string) {
    const deleteStatusRes = await fetch(`${URL}/delete/${id}`, {
      method: "DELETE",
    });

    const deleteStatus: Response = await deleteStatusRes.json();

    if (!deleteStatus.ok) {
      return deleteStatus;
    }

    const shoesRes = await fetch(`${URL}/shoes`);
    const shoesItems = await shoesRes.json();
    setStoreItems(shoesItems);

    return deleteStatus;
  }

  async function updateItem(data: ShoeData) {
    const { id, ...requiredData } = data;

    const updateRes = await fetch(`http://localhost:3000/shoe/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requiredData),
    });
    const updataStatus: Response = await updateRes.json();

    if (!updataStatus.ok) {
      return updataStatus;
    }

    const updatedShoesRes = await fetch(`${URL}/shoes`);
    const updatedShoes = await updatedShoesRes.json();
    setStoreItems(updatedShoes);

    return updataStatus;
  }

  async function addItemToStore(data: Data) {
    const addShoeRes = await fetch(`${URL}/addShoe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const addShoeStatus: Response = await addShoeRes.json();

    if (!addShoeStatus.ok) {
      return addShoeStatus;
    }

    const newShoesRes = await fetch(`${URL}/shoes`);
    const newShoes = await newShoesRes.json();
    setStoreItems(newShoes);

    return addShoeStatus;
  }

  return (
    <StoreContext.Provider
      value={{
        cartItems,
        storeItems,
        addToCart,
        removeItemFromCart,
        clearCart,
        removeItemFromStore,
        updateItem,
        addItemToStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error("useStore must be used within a StoreProvider");
  }

  return store;
}
