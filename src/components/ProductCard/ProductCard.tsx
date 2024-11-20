import "./ProductCard.css";
import { Link } from "react-router-dom";
import { useUser } from "../../provider/UserProvider";
import { useStore } from "../../provider/StoreProvider";
import { ShoeData } from "../../types/ShoeData";

type ProductCardProps = {
  id: string;
  imageURL: string;
  brand: string;
  title: string;
  price: number;
  slug: string;
  gender: string;
};

export default function ProductCard({
  id,
  imageURL,
  brand,
  price,
  title: name,
  ...rest
}: ProductCardProps) {
  const { isAdmin } = useUser();
  const { removeItemFromStore, addToCart, cartItems, removeItemFromCart } =
    useStore();

  function handleCartAdd(isInCart: boolean) {
    if (isInCart) {
      removeItemFromCart(id);
    } else {
      const productToAdd = {
        id,
        imageURL,
        brand,
        price,
        name,
        ...rest,
      };

      addToCart(productToAdd);
    }
  }

  return (
    <div className="product-card">
      <div className="image__container">
        <img src={imageURL} alt="Shoe Image" className="product-card__image" />
      </div>
      <div className="product__details">
        <h2 className="product-card__title">{name}</h2>
        <p className="product-card__brand">Brand: {brand}</p>
        <p className="product-card__price">Price: ${price}</p>
        <Link to={`/store/product/${id}`}>
          <button className="product-card__button">View Product</button>
        </Link>
        <button
          onClick={() => {
            handleCartAdd(cartItems.some((i: ShoeData) => i.id === id));
          }}
        >
          {cartItems.some((i: ShoeData) => i.id === id)
            ? "Remove from cart"
            : "Add to cart"}
        </button>
      </div>
      {isAdmin && (
        <button
          style={{ backgroundColor: "red" }}
          onClick={() => {
            removeItemFromStore(id);
          }}
        >
          Remove
        </button>
      )}
    </div>
  );
}
