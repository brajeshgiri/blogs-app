"use client";
import { FC, FormEvent, useState } from "react";
import { ErrorMessage, SuccessMessage } from "./alertMessage";
import { useFormState } from "react-dom";

type BlogFormType = {
  onSubmit: (event: FormData) => Promise<void>;
};
const BlogForm: FC<BlogFormType> = ({ onSubmit }) => {
  const [message, setMessage] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    setError("");
    setMessage("");
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      await onSubmit(data);
      setMessage("saved successfully");
    } catch (error) {
      setError("Failed to submit the data. Please try again.");
    }
  };
  return (
    <div className="w-full">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8"
        onSubmit={onSubmitForm}
        method="post"
      >
        <h2 className="text-center text-blue-400 font-bold text-2xl uppercase mb-10">
          Add New Blog
        </h2>
        {message && <SuccessMessage />}
        {error && <ErrorMessage error={error} />}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Blog Title*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="title"
            type="text"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="subTitle"
          >
            Sub Title*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="subTitle"
            name="subTitle"
            type="text"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="img"
          >
            Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="img"
            name="img"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Details*
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="content"
            name="content"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
