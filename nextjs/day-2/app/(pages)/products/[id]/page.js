// Task 2: Static Routes with App Router

export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

async function getProduct(id) {
  console.log("id: ", id);

  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "force-cache", // Static
  });
  return res.json();
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="page">
      <div className="header">
        <h1>Task 2: Static Product Page</h1>
        <p>Built at build time (Static Generation)</p>
      </div>
    </div>
  );
}
