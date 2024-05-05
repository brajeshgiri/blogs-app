import Markdown from "markdown-to-jsx";
import { getBlogContent } from "@/actions";
import { dateFormat } from "@/utils/date";

const PostPage = async (props: { params: { slug: string } }) => {
  const slug = props.params.slug;
  const post = await getBlogContent(slug);
  return (
    <div>
      <div className="my-12 text-center">
        <h1 className="text-2xl text-slate-600 ">{post.data.title}</h1>
        <p className="text-slate-400 mt-2">{dateFormat(post.data.date)}</p>
        <div className="flex justify-center m-5">
          <img className="object-cover h-48 w-96" src={post.data.img} alt="" />
        </div>
      </div>

      <article className="prose">
        <Markdown>{post.content}</Markdown>
      </article>
    </div>
  );
};

export default PostPage;
