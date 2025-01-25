import React from 'react';
import RatingComponent from './RatingComponent';  // مسیر به کامپوننت ریتینگ

const TestPage = () => {
  return (
    <div style={{ padding: '20px' }}>
    <h2>Test Page - Rating Component</h2>

    {/* برای صفحه آزمون */}
    {/* <RatingComponent serviceId="1" type="exam" /> */}

    
     {/* <RatingComponent serviceId="53"  />  */}

    {/* برای صفحه دوره */}
     <RatingComponent serviceId="53" /> 
     {/* <RatingComponent serviceId="43" type="article" />  */}
  </div>
  );
};

export default TestPage;


