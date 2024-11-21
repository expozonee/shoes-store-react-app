import "./UpdateItemForm.css";
import { Form } from "react-router-dom";
import { ChangeEvent, useState } from "react";

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
}: UpdateItemForm) {
  const [isLoading, setIsLoading] = useState(false);

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
      value: e.target.value,
    };

    setFormData((f) => {
      return {
        ...f,
        [newData.key]: newData.value,
      };
    });
  }

  return (
    <Form
      method="put"
      action={`/store/product/${id}`}
      onSubmit={() => setIsLoading(true)}
      onTransitionEnd={() => setIsLoading(false)}
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
      <label htmlFor="price">Price</label>
      <input
        onChange={handleChange}
        type="text"
        name="price"
        id="price"
        value={formData.price.toString()}
      />
      <label htmlFor="gender">Gender</label>
      <select
        onChange={handleChange}
        name="gender"
        id="gender"
        value={formData.gender}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <label htmlFor="brand">Brand</label>
      <input
        onChange={handleChange}
        type="text"
        name="brand"
        id="brand"
        value={formData.brand}
      />
      <label htmlFor="imageURL">Image</label>
      <input
        onChange={handleChange}
        type="text"
        name="imageURL"
        id="imageURL"
        value={formData.imageURL}
      />
      <label htmlFor="slug">Slug</label>
      <input
        onChange={handleChange}
        type="text"
        name="slug"
        id="slug"
        value={formData.slug}
      />
      <button disabled={isLoading} type="submit">
        {isLoading ? "Updating..." : "Submit"}
      </button>
    </Form>
  );
}
