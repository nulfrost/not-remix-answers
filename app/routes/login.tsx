import { Form } from "@remix-run/react";

export default function Login() {
  return (
    <Form action="/auth/github" method="post">
      <button type="submit">log in with github</button>
    </Form>
  );
}
