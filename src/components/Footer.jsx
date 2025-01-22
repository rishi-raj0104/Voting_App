import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-blue-500 text-white shadow-md p-4 ">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-6 md:px-10">
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} My Website. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
