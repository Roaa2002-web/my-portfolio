// src/app/page.js
import React, { Suspense } from 'react';
import Main from '../components/Main';
import WebDevelopment from '../components/WebDevelopment'; // استيراد مكون تطوير الويب
import Contact from '../components/Contact'; // استيراد مكون الاتصال

const HomePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Main />
      <WebDevelopment />
      <Contact /> 
    </Suspense>
  );
};

export default HomePage;
