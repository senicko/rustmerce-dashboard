import { useMutation } from "@tanstack/react-query";
import { useState, FormEvent } from "react";
import { ProductInsert } from "../../types/product";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(1);

  // TODO: Learn about cancellation and other things in TanStack Query.
  const addProductMutation = useMutation((product: ProductInsert) => {
    return fetch("http://localhost:8080/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  });

  // TODO: Look at Formik or other ways to handle forms in a neat way.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!price) return alert("You need to enter the price!");
    if (name.length === 0) return alert("You need to enter the name!");

    addProductMutation.mutate({ name, price });
  };

  return (
    <>
      {addProductMutation.isSuccess && <p>Product added!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            className="border"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            className="border"
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
        </div>
        <button className="btn-primary">Add</button>
      </form>
    </>
  );
};

export default CreateProduct;
