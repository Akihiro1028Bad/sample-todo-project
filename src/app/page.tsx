import { TodoType } from "@/types";
import Link from "next/link";

async function fetchAllTodos() {
  const res = await fetch(`http://localhost:3000/api/todo`, {
    //SSR(更新があるため)
    cache: "no-store",
  });
  const data = await res.json();
  return data.todos;
}

export default async function Home() {
  const todos = await fetchAllTodos();
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-1/2 text-center my-3 py-3 rounded-lg bg-blue-300"><Link href="/register">新規タスクを登録する</Link></div>
      {todos.map((post: TodoType) => (
        <div
          key={post.id}
          className="w-1/2 p-4 rounded-md mx-3 my-2 bg-slate-300 flex justify-center"
        >
          <div className="w-1/4">
            <div className="flex items-center my-3">
              <div className="mr-auto">
                <h2 className="mr-auto font-semibold">タスク名：{post.title}</h2>
              </div>
            </div>
            <div className="mr-auto my-1">
              <blockquote className="font-bold text-slate-700">
                {new Date(post.date).toDateString()}
              </blockquote>
            </div>
          </div>
          
          <div className="w-3/4 my-3">
            <h2>{post.content}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}