import "./ProductsContainer.css";
import { ReactNode } from "react";

export default function ProductsContainer({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="products__container">{children}</div>;
}
