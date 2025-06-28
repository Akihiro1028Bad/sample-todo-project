"use client";

import { useRouter } from "next/navigation";
import React, { Fragment, useRef } from "react";

const postTodo = async ({
    title,
    content,
}: {
    title: string;
    content: string;
}) => {
    const res = fetch("http://localhost:3000/api/todo", {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return (await res).json();
};

const RegisterTodo = () => {
    const router = useRouter();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const contentRef = useRef<HTMLTextAreaElement | null>(null);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (titleRef.current && contentRef.current) {
            await postTodo({
                title: titleRef.current?.value,
                content: contentRef.current?.value,
            });

            router.push("/");
            router.refresh();
        }
    };
    return (
        <>
            <div className="w-full m-auto flex my-4">
                <div className="flex flex-col justify-center items-center m-auto">
                    <p className="text-2xl text-slate-200 font-bold p-3">
                        Todoを登録してね！
                    </p>
                    <form onSubmit={handleSubmit}>
                        <input
                            ref={titleRef}
                            placeholder="Enter Title"
                            type="text"
                            className="rounded-md px-4 w-full py-2 my-2"
                        />
                        <textarea
                            ref={contentRef}
                            placeholder="Enter Description"
                            className="rounded-md px-4 py-2 w-full my-2"
                        ></textarea>
                        <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterTodo;