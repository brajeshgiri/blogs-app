import { FormEvent } from "react";
import BlogForm from "../components/blogForm";
import { createBlog } from "../actions";

export default function NewBlog() {
  async function onSubmit(formData: FormData) {
    "use server";

    try {
      createBlog(formData);
    } catch (ex) {}
  }

  return <BlogForm onSubmit={onSubmit} />;
}
