import React from 'react'
import Sidebar from "./Sidebar";
import Navbar from './Navbar';
// import { Sidebar } from 'lucide-react';

const DashBoardLayout = ({ children, activeMenu }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeMenu={activeMenu} />
      <div className="flex">
        {/* Sidebar (hidden on small screens) */}
        <div className="max-[1080px]:hidden">
          <Sidebar activeMenu={activeMenu} />
        </div>
        <div className='grow mx-5'>{children}</div>

        {/* Main Content */}
        {/* <main className="flex-1 mx-5 py-4">
          {children}
        </main> */}
      </div>
    </div>
  );
};

export default DashBoardLayout;
