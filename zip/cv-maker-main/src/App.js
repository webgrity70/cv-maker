import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateCv from './components/Createcv';
import Home from './components/Home';
import Login from './components/login';
import Preview from './components/Preview';
import Register from './components/register';

function App() {
  const [currentCvId, setCurrentCvId] = useState('');

  const setCvIdfunc = (data) =>{
    setCurrentCvId(data)
    
  }

   useEffect(()=>{
    console.log(currentCvId);
  },[setCvIdfunc]);
 
  return (
    <>
      <BrowserRouter>
	  	<Routes>
          <Route path="/" element={<Home />}></Route>

		  <Route path="/create-cv" element={<CreateCv currentcvID={setCvIdfunc} />}></Route>        
        
          <Route path="preview" element={<Preview currentCvId={currentCvId} />}></Route>

          
          <Route path="register" element={<Register />}></Route>
      
          
          <Route path="login" element={<Login />}></Route>


		  </Routes>
      
      </BrowserRouter>
       {/* <Home currentcvID={setCvIdfunc} />
      <Preview currentCvId={currentCvId} /> 

      <Register />
      <Login />
      */}
    </>
  );
}

export default App;