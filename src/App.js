import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateCv from './components/Createcv';
import Home from './components/Home';
import Login from './components/login';
import Preview from './components/Preview';
import Register from './components/register';
import Error  from './components/404';

function App() {
	//const [ currentCvId, setCurrentCvId ] = useState('');
	const setCvIdfunc = (data) => {
		//setCurrentCvId(data);
		localStorage.setItem("sessionCvId", data);
	};

	

/* 	useEffect(
		() => {
			console.log(currentCvId);
			
		},
		[ setCvIdfunc ],
	);
 */
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="/create-cv" element={<CreateCv currentcvID={setCvIdfunc} />} />

				<Route path="preview" element={<Preview getcurrentCvId={setCvIdfunc} />} />

				<Route path="register" element={<Register />} />

				<Route path="login" element={<Login />} />

				<Route path="*" element={<Error />} />
			</Routes>

			{/* <Home currentcvID={setCvIdfunc} />
      <Preview currentCvId={currentCvId} /> 

      <Register />
      <Login />
      */}
		</BrowserRouter>
	);
}

export default App;
