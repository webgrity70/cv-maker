import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
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
			<header className="header container">
				<nav>
					<Link className='navItem' to="/login">Login</Link>
					<Link className='navItem' to="/regiter">Register</Link>
				</nav>
				<div className='profile'>
					<div className='profileImg'></div>
					<div className='dropDown'>
						<ul>
							<li>
								<button className=''>Cv Lists</button>								
							</li>
							<li><button className=''>Logout</button></li>
						</ul>
					</div>
				</div>
			</header>
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="/create-cv" element={<CreateCv currentcvID={setCvIdfunc} />} />

				<Route path="preview" element={<Preview getcurrentCvId={setCvIdfunc} />} />

				<Route path="register" element={<Register />} />

				<Route path="login" element={<Login />} />

				<Route path="*" element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
