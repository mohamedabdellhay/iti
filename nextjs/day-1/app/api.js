const fetchProduct = async (id) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return { status: 500, message: "Server Error" };
  console.log(res);

  const product = await res.json();
  return { status: 200, product };
};

export { fetchProduct };
