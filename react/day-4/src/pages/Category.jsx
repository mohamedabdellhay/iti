import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import RenderProducts from "../components/RenderProducts";
import Loader from "../components/Loader";
const API = import.meta.env.VITE_API;

export default function Category() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ status: false, message: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}products`);
        console.log(`${API}products`);

        const data = await response.json();
        console.log("data", data);
        const categoryProducts = data.filter((ele) => ele.category === slug);
        setProducts(categoryProducts);
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
    <div className="px-8 py-10">
      <h1>{slug}</h1>
      <RenderProducts products={products} />
    </div>
  );
}
