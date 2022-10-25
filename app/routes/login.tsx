import { Form } from "@remix-run/react";

export default function Login() {
  return (
    <section className="w-full text-center">
      <h1 className="mt-16 text-2xl font-bold">Log in to Not Remix Answers</h1>
      <Form action="/auth/github" method="post" className="mt-6">
        <button
          type="submit"
          className="px-5 py-2 text-white duration-150 bg-gray-900 rounded-md hover:bg-gray-800"
        >
          Log in with Github
        </button>
      </Form>
    </section>
  );
}
