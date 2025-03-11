
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '../utils/supabase';
import { Skeleton } from "@/components/ui/skeleton";

interface Todo {
  id: number;
  title: string;
  completed?: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTodos = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('todos').select('*');

        if (error) {
          console.error('Error fetching todos:', error.message);
          setError(error.message);
          return;
        }

        if (data) {
          setTodos(data);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    getTodos();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-red-500">Error Loading Todos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <p>Please make sure Supabase is properly configured.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : todos.length > 0 ? (
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li key={todo.id} className="p-2 border rounded">
                  {todo.title}
                </li>
              ))}
            </ul>
          ) : (
            <p>No todos found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
