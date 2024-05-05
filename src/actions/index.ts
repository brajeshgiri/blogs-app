"use server";

import { promises as fs } from "fs";
import { BlogDataType } from "@/components/types/blogType";
import matter from "gray-matter";
import { actionStates, blogsFilesFolder } from "@/constants";

export const getAllBlogsData = async (): Promise<BlogDataType[]> => {
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

export async function onFormPostAction(prevState: any, formData: FormData) {
  // Process the data
  const title = formData.get("title") as string;
  const subTitle = formData.get("subTitle") as string;
  const content = formData.get("content") as string;
  const img = formData.get("img") as string;
  const slug = encodeURI(title.replace(/[^a-zA-Z0-9]/g, "-"));
  const fileName = `${blogsFilesFolder}\\${slug}.md`;

  const fileData = `---
slug: "${slug}"
title: "${title}"
subtitle: "${subTitle}"
date: "${new Date()}"
img: ${
    img
      ? img
      : "https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4"
  }
---


${content}
  `;
  try {
    await fs.writeFile(fileName, fileData);
    return { message: actionStates.Success };
  } catch (error: any) {
    console.error("Error on post a blog: ", error.message);
    return { message: actionStates.Failed };
  }
}
