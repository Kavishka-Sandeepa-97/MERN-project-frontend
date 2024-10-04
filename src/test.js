import React, { useState } from 'react';

function App() {
  const [x, setX] = useState(0);

  console.log("fuck")

  const handleClick = () => {
     // Line 1
    setX((prevX) => prevX + 1);
    // Call method after the two setX calls
    
  };
   
  console.log('Component re-rendered with xxxxxxxxxxxx:', x);

  const someMethod = () => {
    console.log('Value of x inside someMethod:', x); // This prints the "old" value of x
  };

  someMethod();

  

  return (
    <div>
      <p>Current value of x: {x}</p>
      <button onClick={handleClick}>Increase X Twice</button>
    </div>
  );
}

export default App;
