import { Form } from "@remix-run/react";

export default function Index() {
  return (
    <div>
      <p>wock</p>
      <Form action="/auth/github" method="post">
        <button type="submit">log in with github</button>
      </Form>
    </div>
  );
}
