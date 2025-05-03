import React from 'react';
import TeacherList from './TeacherList';

function page() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-semibold text-gray-900">School Management System</h1>
        </div>
      </header>
      <main>
        <TeacherList />
      </main>
    </div>
  );
}

export default page;