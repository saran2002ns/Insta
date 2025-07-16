
import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './components/sidebar/Create';
import Reels from './components/sidebar/Reels';
import Explore from './components/sidebar/Explore';
import Message from './components/sidebar/Message';
import Notifications from './components/sidebar/Notifications';
import Profile from './components/sidebar/Profile';
import Search from './components/sidebar/Search';
import More from './components/sidebar/More';
import StoryView from './components/sidebar/StoryView';

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home/:id" element={<Home />} />
        <Route path="/create" element={<Create/>} />
        <Route path="/reels" element={<Reels/>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/message" element={<Message/>} />
        <Route path="/notifications" element={<Notifications/>} />
        <Route path="/profile/:id" element={<Profile/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/more" element={<More/>} />
        <Route path="/storyview" element={<StoryView/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;

