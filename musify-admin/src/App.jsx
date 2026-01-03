import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import AddSong from './pages/AddSong';
import AddAlbum from './pages/AddAlbum';
import ListAlbum from './pages/ListAlbum';
import ListSong from './pages/ListSong';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>

        {/* ✅ SINGLE Toaster with correct position */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
          }}
        />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/add-song" element={
            <ProtectedRoute requireAdmin={true}>
              <AddSong />
            </ProtectedRoute>
          } />
          <Route path="/list-songs" element={
            <ProtectedRoute requireAdmin={true}>
              <ListSong />
            </ProtectedRoute>
          } />
          <Route path="/add-album" element={
            <ProtectedRoute requireAdmin={true}>
              <AddAlbum />
            </ProtectedRoute>
          } />
          <Route path="/list-albums" element={
            <ProtectedRoute requireAdmin={true}>
              <ListAlbum />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Login />} />
          <Route path="*" element={
            <ProtectedRoute requireAdmin={true}>
              <AddSong />
            </ProtectedRoute>
          } />
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
