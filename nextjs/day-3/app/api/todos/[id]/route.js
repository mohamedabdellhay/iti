import { NextResponse } from "next/server";
import { getTaskById, updateTask, deleteTask } from "@/app/lib/todo.server";

export async function GET(request, context) {
  const { id } = await context.params;

  try {
    const todo = await getTaskById(id);

    if (!todo) {
      return NextResponse.json(
        { error: `Task with ID ${id} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    console.error(`API Route Error (GET /api/todos/${id}):`, error.message);

    if (error.message.includes("Invalid task ID format")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        error: "Failed to fetch single ToDo item due to a server error.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request, context) {
  const { id } = await context.params;

  try {
    const data = await request.json();

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "Request body is empty. Please provide fields to update." },
        { status: 400 }
      );
    }

    const updatedTask = await updateTask(id, data);

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error(`API Route Error (PATCH /api/todos/${id}):`, error.message);

    if (error.message.includes("Task not found")) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    if (
      error.message.includes("validation failed") ||
      error.message.includes("Invalid task ID format")
    ) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        error: "Failed to update ToDo item due to a server error.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  const { id } = await context.params;

  try {
    await deleteTask(id);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`API Route Error (DELETE /api/todos/${id}):`, error.message);

    if (error.message.includes("Task not found")) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    if (error.message.includes("Invalid task ID format")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        error: "Failed to delete ToDo item due to a server error.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
