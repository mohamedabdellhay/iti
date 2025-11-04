import MainImage from "./MainImage";

export default function MainSection() {
  return (
    <section className="grid md:grid-cols-2 gap-4 p-6">
      <div className="bg-white p-6 rounded-md text-black">
        <h2 className="text-xl font-semibold mb-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
          veritatis autem necessitatibus quas modi, et repellat fugiat cum?
          Porro atque asperiores ipsum commodi aperiam iusto temporibus
          voluptates perferendis suscipit error.
        </h2>
        <p>Some text content goes here...</p>
      </div>
      <MainImage />
    </section>
  );
}
