"use client";
import { useMutation, useQuery } from "convex/react"; // Ensure correct import
import { useState } from "react";
import { api } from "/Users/aahilali/Desktop/HackMITConvex/convex/_generated/api.js"; // This will work after running `npx convex dev`

export default function Home() {
  const [text, setText] = useState("");
  const createTodo = useMutation(api.todos.createTodo);
  const todos = useQuery(api.todos.getTodos);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col gap-4">
          {todos?.map((todo) => (
            <div key={todo._id}>{todo.text}</div> // Use _id as the key and text to display the todo
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createTodo({ text }); // Create a todo using the mutation
            setText(""); // Clear the input field after submission
          }}
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="text-black"
            placeholder="Enter a todo"
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </main>
  );
}