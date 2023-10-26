import AdminPage from './admin/Admin';
import InstructorPage from './instructor/Instructor';
import UserPage from './user/User';
import NotificationPage from './Notification';
import ProfilePage from './UserProfile';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthGuard from '../utilities/authGuard';

const Pages = () => {
  return (
    // <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/admin" element={
          <AuthGuard requiredRole={["admin"]}>
            <AdminPage />
          </AuthGuard>
        } />
        <Route path="/instructor" element={
          <AuthGuard requiredRole={["instructor"]}>
            <InstructorPage />
          </AuthGuard>
        } />
        <Route path="/notifications" element={
          <AuthGuard requiredRole={["admin", "instructor", "user"]}>
            <NotificationPage />
          </AuthGuard>
        } />
        <Route path="/profile" element={
          <AuthGuard requiredRole={["admin", "instructor", "user"]}>
            <ProfilePage />
          </AuthGuard>
        } />
        <Route path="*" element={
          <div>
            <h1>404</h1>
          </div>
        } />
      </Routes>
    // </BrowserRouter>
  );
}

export default Pages;
