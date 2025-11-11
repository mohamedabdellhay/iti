import { NextResponse } from "next/server";
import { getAll, createTask } from "@/app/lib/todo.server";

export async function GET() {
  try {
    const todos = await getAll();

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.error("API Route Error (GET /api/todos):", error.message);

    return NextResponse.json(
      {
        error: "Failed to fetch ToDos from the database.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const task = await request.json();
    const newTask = await createTask(task);
    return NextResponse.json(newTask, { status: 200 });
  } catch (error) {
    console.error("API Route Error (POST /api/todos):", error.message);

    return NextResponse.json(
      {
        error: "Failed to add task from the database.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
