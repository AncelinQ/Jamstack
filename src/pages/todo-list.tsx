import { FC } from 'react';
import useSWR from 'swr';
import { Todo } from '../types/api';
import lambdaFetcher from '../utils/lambda-fetcher';

const TodoListPage: FC = () => {
  const { data } = useSWR<Todo[], Error>('/todos', lambdaFetcher);

  if (typeof data === 'undefined') {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
};

export default TodoListPage;
