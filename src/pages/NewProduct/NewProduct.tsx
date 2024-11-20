import { BaseSyntheticEvent, ChangeEvent, useState } from "react";
import "./NewProduct.css";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../provider/StoreProvider";

export default function NewProduct() {
  const navigate = useNavigate();
  const { addItemToStore } = useStore();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: 0,
    gender: "",
    brand: "",
    imageURL: "",
    slug: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const newData = {
      key: e.target.id,
      value: e.target.id === "price" ? +e.target.value : e.target.value,
    };

    setFormData((f) => {
      return {
        ...f,
        [newData.key]: newData.value,
      };
    });
  }

  async function handleSubmit(e: BaseSyntheticEvent) {
    e.preventDefault();

    const status = await addItemToStore(formData);

    if (status.ok) {
      navigate(`/store`);
    }
  }

  return (
    <form
      style={{
        margin: "0 auto",
      }}
      onSubmit={handleSubmit}
      className="update-item__form"
    >
      <label htmlFor="title">Title</label>
      <input
        onChange={handleChange}
        type="text"
        name="title"
        id="title"
        value={formData.name}
      />
      <label htmlFor="title">Price</label>
      <input
        onChange={handleChange}
        type="text"
        name="price"
        id="price"
        value={formData.price.toString()}
      />
      <label htmlFor="title">Gender</label>
      <select
        onChange={handleChange}
        name="gender"
        id="gender"
        value={formData.gender}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <label htmlFor="title">Brand</label>
      <input
        onChange={handleChange}
        type="text"
        name="brand"
        id="brand"
        value={formData.brand}
      />
      <label htmlFor="title">Image</label>
      <input
        onChange={handleChange}
        type="text"
        name="imageURL"
        id="imageURL"
        value={formData.imageURL}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
