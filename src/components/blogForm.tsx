"use client";
import { FC, useRef } from "react";
import { ErrorMessage, SuccessMessage } from "./alertMessage";
import { useFormState, useFormStatus } from "react-dom";
import { onFormPostAction } from "@/actions";
import { actionStates } from "@/constants";

const initialState = {
  message: "",
};
const BlogForm: FC<{}> = () => {
  const ref = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(onFormPostAction, initialState);
  const onSubmit = async (formData: FormData) => {
    try {
      await formAction(formData);
      ref.current?.reset();
    } catch (error) {}
  };
  return (
    <div className="w-full">
      <form
        ref={ref}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8"
        action={onSubmit}
      >
        <h2 className="text-center text-blue-400 font-bold text-2xl uppercase mb-10">
          Add New Blog
        </h2>
        {state.message === actionStates.Success && <SuccessMessage />}
        {state.message === actionStates.Failed && (
          <ErrorMessage
            error={"Something went wrong, Please try again later"}
          />
        )}

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
          aria-disabled={pending}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
