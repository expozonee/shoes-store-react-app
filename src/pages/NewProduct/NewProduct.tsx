import { BaseSyntheticEvent, ChangeEvent, useState } from "react";
import "./NewProduct.css";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../provider/StoreProvider";

export default function NewProduct() {
  const navigate = useNavigate();
  const { addItemToStore } = useStore();
  const [formData, setFormData] = useState({
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

    const data = formData;

    const status = await addItemToStore(data);

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
        name="name"
        id="name"
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
      <label htmlFor="title">Slug</label>
      <input
        onChange={handleChange}
        type="text"
        name="slug"
        id="slug"
        value={formData.slug}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
