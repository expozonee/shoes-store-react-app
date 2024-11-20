import { useNavigate } from "react-router";
import { useStore } from "../../provider/StoreProvider";
import "./UpdateItemForm.css";
import { BaseSyntheticEvent, ChangeEvent, useState } from "react";

type UpdateItemForm = {
  id: string;
  name: string;
  price: number;
  gender: string;
  brand: string;
  imageURL: string;
  slug: string;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UpdateItemForm({
  id,
  name,
  price,
  gender,
  brand,
  imageURL,
  slug,
  setUpdate,
}: UpdateItemForm) {
  const { updateItem } = useStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: id,
    name,
    price,
    gender,
    brand,
    imageURL,
    slug,
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

    const status = await updateItem(formData);

    if (status.ok) {
      setUpdate(false);
      navigate(`/store/product/${id}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="update-item__form">
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
