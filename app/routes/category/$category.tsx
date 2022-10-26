import { useParams } from "@remix-run/react";

export default function Category() {
  const params = useParams();
  return (
    <section className="flex-1">
      <h1 className="text-3xl font-bold">{params.category}</h1>
    </section>
  );
}
