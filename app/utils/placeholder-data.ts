export type PostData = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

export const postData: PostData[] = [
  {
    id: 1,
    title: "記事タイトル1",
    content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique, aliquam! Distinctio eaque molestias ipsam dolorem quibusdam, fugiat, accusamus natus, dolore repudiandae necessitatibus voluptatum porro similique veniam nam excepturi cumque enim.",
    author: "Alice",
    date: "2025年04月08日",
  },
  {
    id: 2,
    title: "記事タイトル2",
    content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique, aliquam! Distinctio eaque molestias ipsam dolorem quibusdam, fugiat, accusamus natus, dolore repudiandae necessitatibus voluptatum porro similique veniam nam excepturi cumque enim.",
    author: "Bob",
    date: "2025年04月09日",
  },
  {
    id: 3,
    title: "記事タイトル3",
    content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique, aliquam! Distinctio eaque molestias ipsam dolorem quibusdam, fugiat, accusamus natus, dolore repudiandae necessitatibus voluptatum porro similique veniam nam excepturi cumque enim.",
    author: "Charlie",
    date: "2025年04月10日",
  }
];