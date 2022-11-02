import { conform, parse, useFieldset, useForm } from "@conform-to/react";
import { formatError, validate } from "@conform-to/zod";
import { ActionArgs, json, redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import { z } from "zod";
import { getCategories } from "~/models/category.server";
import { createQuestion } from "~/models/question.server";
import { authenticator } from "~/services/auth.server";

const schema = z.object({
  title: z
    .string({
      required_error: "A title for your post is required.",
    })
    .min(20, { message: "Your title must be at minimum 20 characters long" })
    .max(100, { message: "Your title is too long, please shorten it." }),
  body: z
    .string()
    .min(100, "A body for this post is required.")
    .max(10_000, "Your post is too long, try asking it in a different way."),
  category: z.string(),
});

export async function loader() {
  const categories = await getCategories();
  return json({ categories });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const submission = parse<z.infer<typeof schema>>(formData);
  const user = await authenticator.isAuthenticated(request);
  invariant(user?.id, "Not authenticated");

  try {
    switch (submission.type) {
      case "validate":
      case "submit":
        const data = schema.parse(submission.value);
        if (submission.type === "submit") {
          await createQuestion({
            title: data.title,
            body: data.body,
            category: data.category,
            profile_id: user?.id,
          });

          return redirect("/");
        }

        break;
    }
  } catch (error) {
    submission.error.push(...formatError(error));
  }

  return json({
    ...submission,
  });
}

export default function New() {
  const { categories } = useLoaderData<typeof loader>();
  const state = useActionData<typeof action>();
  const transition = useTransition();

  const submitting = transition.state === "submitting";

  const form = useForm<z.infer<typeof schema>>({
    initialReport: "onBlur",
    state,
    onValidate({ formData }) {
      return validate(formData, schema);
    },
  });

  const { title, body, category } = useFieldset(form.ref, form.config);

  return (
    <section className="w-full px-2 xl:px-0">
      <h1 className="text-3xl font-bold">Post a new question</h1>
      <Form
        method="post"
        action="."
        className="flex flex-col mt-4"
        {...form.props}
      >
        <fieldset>
          <legend>{form.error}</legend>
          <div>
            <label
              id="title"
              htmlFor="title"
              className="after:content-['*'] after:text-red-600 mr-4"
            >
              Title
            </label>
            <span id="titleError" className="text-sm text-red-600">
              {title.error}
            </span>
          </div>
          <input
            {...conform.input(title.config)}
            type="text"
            name="title"
            id="title"
            required
            autoFocus
            aria-required
            aria-invalid={title?.error !== "" ? "true" : "false"}
            aria-labelledby="title"
            aria-describedby="titleError"
            className="block w-full mt-1 mb-4 border-gray-300 rounded-md shadow-sm resize-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <div>
            <label
              id="body"
              htmlFor="body"
              className="after:content-['*'] after:text-red-600 mr-4"
            >
              Question
            </label>
            <span id="bodyError" className="text-sm text-red-600">
              {body.error}
            </span>
          </div>
          <textarea
            name="body"
            id="body"
            rows={10}
            cols={40}
            placeholder="What's on your mind?"
            required
            aria-required
            aria-invalid={body?.error !== "" ? "true" : "false"}
            aria-labelledby="body"
            aria-describedby="bodyError"
            className="block w-full mt-1 mb-4 border-gray-300 rounded-md shadow-sm resize-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...conform.textarea(body.config)}
          />
          <label htmlFor="categories">Choose a category</label>
          <select
            {...conform.select(category.config)}
            name="category"
            id="category"
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            {categories.map(({ id, name }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>
        </fieldset>
        <button className="px-3 py-2 mt-4 ml-auto text-white duration-150 bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-blue-400">
          {submitting ? "Creating your question" : "Post question"}
        </button>
      </Form>
    </section>
  );
}
