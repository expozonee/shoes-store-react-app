import { ReactNode } from "react";
import "./ProductsContainer.css";

export default function ProductsContainer({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="products__container">{children}</div>;
}
