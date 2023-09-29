import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';

const Main = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;
  console.log(data);
  
  return (
    <header className="App-header">
      <Banner className="course-list" title={data.title} />
      <CourseList courses={data.courses} />
    </header>
    );
}

const queryClient = new QueryClient();

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <Main />
      </div>
    </QueryClientProvider>
  );
};

export default App;
