import Image from "next/image";
export const revalidate = 6000; //60*60*60 // one hour

export async function getStaticPaths() {
  const posts = await fetch("https://fakestoreapi.com/products").then((res) =>
    res.json()
  );

  const ides = posts.map((product) => ({
    params: { id: product.id },
  }));

  return { ides, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const { id } = await params;
  const product = await fetch(`https://fakestoreapi.com/products/${id}`).then(
    (res) => res.json()
  );

  return {
    props: { product },
    // Next.js will invalidate the cache when a
    // request comes in, at most once every 60 seconds.
    revalidate: revalidate,
  };
}

export default async function ProductPage({ product }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex gap-6">
          {product?.image && (
            <Image
              width={400}
              height={400}
              src={product.image}
              alt={product.title}
              className="w-64 h-64 object-contain border rounded"
            />
          )}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
              {product.title}
            </h2>

            <p className="text-lg text-gray-700">{product.description}</p>
            <p className="mt-4 text-xl font-semibold text-indigo-600">
              ${product.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
