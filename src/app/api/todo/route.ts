import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.$connect();
    } catch (err) {
        return Error("DB接続に失敗しました");
    } finally {
    }
}

// Todo取得
export const GET = async (req: Request) => {
    try {
        await main();
        const todos = await prisma.todo.findMany();
        return NextResponse.json({ message: "success", todos }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

// Todoの作成
export const POST = async (req: Request) => {
    try {
        const { title, content } = await req.json();

        await main();
        const todo = await prisma.todo.create({ data: { title, content } });
        return NextResponse.json({ message: "success", todo }, { status: 201 });
    } catch (err) {
        console.error("POST /api/todo failed:", err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};