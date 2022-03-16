import fs from "fs";
import grayMatter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export function getAllPosts() {
  const allPostsFileNames = fs.readdirSync("./_posts");

  const posts = allPostsFileNames.map((fileName) => {
    const fileContent = fs.readFileSync(`./_posts/${fileName}`, "utf-8");

    const { content, data: metadata } = grayMatter(fileContent);

    const HTMLContent = remark()
      .use(remarkHtml)
      .processSync(content)
      .toString();

    return {
      metadata: {
        ...metadata,
        slug: fileName.replace(".md", ""),
      },
      content: HTMLContent,
    };
  });

  return posts;
}
