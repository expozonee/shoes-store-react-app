/* eslint-disable react-refresh/only-export-components */
import "./NewProduct.css";
import { z } from "zod";
import { ChangeEvent, useEffect, useState } from "react";
import { Form, Params, redirect, useNavigate } from "react-router-dom";
import { useUser } from "../../provider/UserProvider";

const NewProductData = z.object({
  name: z.string(),
  price: z.number().positive(),
  gender: z.enum(["male", "female"]),
  brand: z.string(),
  imageURL: z.string(),
  slug: z.string(),
});

const URL = process.env.BACKEND_URL;

export async function action({
  request,
}: {
  params?: Params;
  request: Request;
}) {
  const formData = await request.formData();

  const dataToAdd = {
    name: formData.get("name"),
    price: Number.parseFloat(formData.get("price") as string),
    gender: formData.get("gender"),
    brand: formData.get("brand"),
    imageURL: formData.get("imageURL"),
    slug: formData.get("slug"),
  };

  const allDataValid = NewProductData.safeParse(dataToAdd);

  if (!allDataValid.success) return null;

  const addShoeRes = await fetch(`${URL}/addShoe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToAdd),
  });

  const addShoeStatus = await addShoeRes.json();

  if (addShoeStatus.ok) {
    return redirect("/store");
  }

  return addShoeStatus;
}

export default function NewProduct() {
  const { isAdmin } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    gender: "",
    brand: "",
    imageURL: "",
    slug: "",
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

  useEffect(() => {
    if (!isAdmin) {
      navigate("/store");
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  return (
    <>
      <h2>Add new product</h2>
      <Form
        style={{}}
        method="post"
        action="/store/add"
        onSubmit={() => setIsLoading(true)}
        className="add-item__form"
      >
        <label htmlFor="title">Title</label>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          id="name"
          required
          value={formData.name}
        />
        <label htmlFor="title">Price</label>
        <input
          onChange={handleChange}
          type="text"
          name="price"
          id="price"
          required
          value={formData.price.toString()}
        />
        <label htmlFor="title">Gender</label>
        <select
          onChange={handleChange}
          name="gender"
          id="gender"
          required
          value={formData.gender}
        >
          <option disabled value="">
            -- Choose gender --
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label htmlFor="title">Brand</label>
        <input
          onChange={handleChange}
          type="text"
          name="brand"
          id="brand"
          required
          value={formData.brand}
        />
        <label htmlFor="title">Image</label>
        <input
          onChange={handleChange}
          type="text"
          name="imageURL"
          id="imageURL"
          required
          value={formData.imageURL}
        />
        <label htmlFor="title">Slug</label>
        <input
          onChange={handleChange}
          type="text"
          name="slug"
          id="slug"
          required
          value={formData.slug}
        />
        <button
          disabled={Object.values(formData).some((v) => v === "") || isLoading}
          type="submit"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </Form>
    </>
  );
}
