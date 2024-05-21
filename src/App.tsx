import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import Login from './components/Login';
import NewsList from './components/NewsList';
import Navbar from './components/Navbar';
import { NotFoundView } from './views/NotFoundView';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/news" element={isAuthenticated ? <NewsList/> : <Login/>}></Route>
        <Route path="*" element={<NotFoundView />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
