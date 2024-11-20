import { Link } from "react-router-dom";
import "./ProductCard.css";

type ProductCardProps = {
  id: string;
  imageURL: string;
  brand: string;
  title: string;
  price: number;
};

export default function ProductCard({
  id,
  imageURL,
  brand,
  price,
  title,
}: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="image__container">
        <img src={imageURL} alt="Shoe Image" className="product-card__image" />
      </div>
      <div className="product__details">
        <h2 className="product-card__title">{title}</h2>
        <p className="product-card__brand">Brand: {brand}</p>
        <p className="product-card__price">Price: ${price}</p>
        <Link to={`/store/product/${id}`}>
          <button className="product-card__button">View Product</button>
        </Link>
      </div>
    </div>
  );
}
