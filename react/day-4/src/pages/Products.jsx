import React, { useState, useEffect } from "react";
import Error from "../components/Error";

import RenderProducts from "../components/RenderProducts";
import Loader from "../components/Loader";

const API = import.meta.env.VITE_API;
export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ status: false, message: "" });
  console.log(API);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}/products`);
        const data = await response.json();
        console.log("data", data);
        setProducts(data);
      } catch (error) {
        console.log(error);
        setError({ status: true, message: error.message });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;
  if (error.status) return <Error message={error.message} />;
  return (
    <div>
      <RenderProducts products={products} />
    </div>
  );
}
