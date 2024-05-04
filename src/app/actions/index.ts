import { promises as fs } from "fs";
import { BlogDataType } from "../components/types/blogType";
import matter from "gray-matter";
import { blogsFilesFolder } from "../constans";
import { dateFormat } from "../utils/date";
export const createBlog = async (formData: FormData) => {
  "use server";
  const title = formData.get("title") as string;
  const subTitle = formData.get("subTitle") as string;
  const content = formData.get("content") as string;
  const img = formData.get("img") as string;
  const slug = encodeURI(title);
  const fileName = `${blogsFilesFolder}\\${slug}.md`;

  const fileData = `---
slug: "${slug}"
title: "${title}"
subtitle: "${subTitle}"
date: "${new Date()}"
img: ${
    img ??
    "https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4"
  }
---


${content}
  `;

  return fs.writeFile(fileName, fileData);
};

export const getBlogsData = async (): Promise<BlogDataType[]> => {
  const files = await fs.readdir(blogsFilesFolder);

  const markdownPosts = files.filter((file) => file.endsWith(".md"));

  // Get gray-matter data from each file.
  const allFilePromise = markdownPosts.map((fileName) => {
    const fileContents = fs.readFile(`${blogsFilesFolder}${fileName}`, "utf8");
    return fileContents;
  });
  const fileContents = await Promise.all(allFilePromise);
  const posts = fileContents.map((fileContent) => {
    const matterResult = matter(fileContent);
    return {
      title: matterResult.data.title,
      date: new Date(matterResult.data.date),
      subtitle: matterResult.data.subtitle,
      img: matterResult.data.img,
      slug: matterResult.data.slug,
    } as BlogDataType;
  });
  posts.sort((a, b) => a.date.getTime() - b.date.getTime());
  return posts;
};

export const getBlogContent = async (slug: string) => {
  const file = `${blogsFilesFolder}${slug}.md`;
  const content = await fs.readFile(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
};
