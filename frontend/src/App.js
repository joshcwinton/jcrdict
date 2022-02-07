import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import {Outlet, Route, Routes} from 'react-router-dom';

import GlobalNav from './components/GlobalNav';
import WordForm from './components/WordForm';
import WordList from './components/WordList';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<WordForm />} />
        <Route path="words" element={<WordList />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div>
      <GlobalNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
