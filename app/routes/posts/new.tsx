import { ActionArgs, json } from "@remix-run/node";
import { useForm } from "@conform-to/react";
import {} from "@conform-to/zod";
import { Form, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { getCategories } from "~/models/category.server";

const schema = z.object({
  title: z
    .string()
    .min(20, "A title for your post is required.")
    .max(100, "Your title is too long, please shorten it."),
  body: z
    .string()
    .min(100, "A body for this post is required.")
    .max(10_000, "Your post is too long, try asking it in a different way."),
});

export async function loader() {
  const categories = await getCategories();
  return json({ categories });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
}

export default function New() {
  const { categories } = useLoaderData<typeof loader>();

  const form = useForm({
    validate({ submission }) {
      const result = schema.safeParse(submission.value);

      if (result.success) {
        return [];
      }

      return;
    },
  });

  return (
    <section className="w-full px-2 xl:px-0">
      <h1 className="text-3xl font-bold">Post a new question</h1>
      <Form method="post" action="." className="flex flex-col mt-4">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          autoFocus
          className="block w-full mt-1 mb-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <label htmlFor="body">Question</label>
        <textarea
          name="body"
          id="body"
          rows={10}
          cols={40}
          placeholder="What's on your mind?"
          required
          className="block w-full mt-1 mb-4 border-gray-300 rounded-md shadow-sm resize-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <label htmlFor="categories">Choose a category</label>
        <select
          name="category"
          id="category"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          {categories.map(({ id, name }) => (
            <option key={id} value={name.toLowerCase()}>
              {name}
            </option>
          ))}
        </select>
        <button className="px-3 py-2 mt-4 ml-auto text-white duration-150 bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-blue-400">
          Post question
        </button>
      </Form>
    </section>
  );
}
