import Card from "./Card";
export default function RenderCards() {
  const arr = [0, 1, 2];
  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 ">
        {arr.map((ele) => (
          <Card key={ele} />
        ))}
      </section>
    </>
  );
}
