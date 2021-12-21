import { useState, useRef  } from 'react';
import { getDatabase, ref, set } from "firebase/database";
import { getStorage, ref as sref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from './firebase/firebase';
import { Editor } from '@tinymce/tinymce-react';
import {useNavigate } from "react-router-dom";


const initialValue = {
	profileimg: '',
	firstname: '',
	lastname: '',
	email: '',
	phone: '',
	address: '',
	zipcode: '',
	city: '',
	birthdate: {
		birthday: 28,
		birthmonth: 10,
		birthyear: 1993,
	},
	placeofbirth: '',
	gender: 'male',
	nationality: '',
	martial: '',
	linkedin: '',
	summary: '',
	skill: '',
	experience: '',
	education: '',
	certificate: ''
};

const CreateCv = ({currentcvID}) => {
	const [ data, setData ] = useState(initialValue);
	const [profileUrl,setProfileUrl] = useState('');

	const handleInputChange = (e) => {
		//const name = e.target.name
		//const value = e.target.value
		const { name, value } = e.target;

		setData({
			...data,
			[name]: value,
		});
	};


	const profileImgUploadHandler = (e) =>{
		let reader = new FileReader();
    	let file = e.target.files[0];

		reader.onloadend = () => {
			setData({
				...data,
				profileimg : reader.result
			});
		}

		reader.readAsDataURL(file);
		setProfileUrl(file)

	}

	 const imageUploadToServer = (file) =>{
		const storage = getStorage();
		const storageRef = sref(storage, `images/${file.name}`);

		const uploadTask = uploadBytesResumable(storageRef, file);

		// Register three observers:
		// 1. 'state_changed' observer, called any time the state changes
		// 2. Error observer, called on failure
		// 3. Completion observer, called on successful completion
		uploadTask.on('state_changed', 
		(snapshot) => {
			// Observe state change events such as progress, pause, and resume
			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			//console.log('Upload is ' + progress + '% done');
			switch (snapshot.state) {
			case 'paused':
				console.log('Upload is paused');
				break;
			case 'running':
				console.log('Upload is running');
				break;
			}
		}, 
		(error) => {
			// Handle unsuccessful uploads
			console.log(error)
		}, 
		() => {
			// Handle successful uploads on complete
			// For instance, get the download URL: https://firebasestorage.googleapis.com/...
			getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
				console.log('File available at', downloadURL);
				window.location.href = '/preview';
			});
		}
		);

	}


	function clearAllFields(){
		setData(initialValue)
	}
	

	const handleInputChangeLavel1 = (e) => {
		//const name = e.target.name
		//const value = e.target.value
		const { name, value } = e.target;

		setData({
			...data,
			birthdate: {
				...data.birthdate,
				[name]: value,
			},
		});
	};

	const saveData = (e) =>{
		e.preventDefault();
		setData({...data},[data.summary = summaryRef.current.getContent(),data.skill = skillyRef.current.getContent()]);
		const db = getDatabase();
		currentcvID('cv'+new Date().getTime());
		set(ref(db, 'cv'+new Date().getTime() ), {
			...data
		})
		.then(() => {
			alert('data saved');
				

		})
		.catch((error) => {
			console.log(error);
		})

		
		
	}

	const summaryRef = useRef(null);
	const skillyRef = useRef(null);
	const expRef = useRef(null);
	const eduRef = useRef(null);
	const certRef = useRef(null);




	return (
		<div className="container">
			<form className="formWrpr" onSubmit={saveData} id="cvForm" >
				<div className="row">
					<div className="col-3" >
						<label className="uploadProfileImg" style={{backgroundImage: `url(${data.profileimg})`}}>
							<input type="file"  name="profileimg" className="fileInput"  onChange={profileImgUploadHandler} />
						</label>
					</div>
					<div className="col-9">
						<div className="inputWrpr">
							<label className="label">First Name</label>
							<input
								type="text"
								className="form-control"
								name="firstname"
								value={data.firstname}
								onChange={handleInputChange}
							/>
						</div>
						<div className="inputWrpr">
							<label className="label">Last Name</label>
							<input
								type="text"
								className="form-control"
								name="lastname"
								value={data.lastname}
								onChange={handleInputChange}
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-6">
						<div className="inputWrpr">
							<label className="label">Email Address</label>
							<input
								type="email"
								className="form-control"
								name="email"
								value={data.email}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="col-6">
						<div className="inputWrpr">
							<label className="label">Phone Number</label>
							<input
								type="text"
								className="form-control"
								name="phone"
								value={data.phone}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="col-12">
						<div className="inputWrpr">
							<label className="label">Address</label>
							<input
								type="text"
								className="form-control"
								name="address"
								value={data.address}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="col-6">
						<div className="inputWrpr">
							<label className="label">Zip Code</label>
							<input
								type="text"
								className="form-control"
								name="zipcode"
								value={data.zipcode}
								onChange={handleInputChange}
							/>
						</div>
					</div>

					<div className="col-6">
						<div className="inputWrpr">
							<label className="label">City / Town</label>
							<input
								type="text"
								className="form-control"
								name="city"
								value={data.city}
								onChange={handleInputChange}
							/>
						</div>
					</div>

					<div className="col-6">
						<div className="row">
							<div className="col-12">
								<label>Date of Birth</label>
							</div>
							<div className="col-3">
								<div className="inputWrpr">
									<select
										className="form-control"
										name="birthday"
										value={data.birthdate.birthday}
										onChange={handleInputChangeLavel1}
									>
										<option value="0">Day</option>
										<option value="01">1</option>
										<option value="02">2</option>
										<option value="03">3</option>
										<option value="04">4</option>
										<option value="05">5</option>
										<option value="06">6</option>
										<option value="07">7</option>
										<option value="08">8</option>
										<option value="09">9</option>
										<option value="10">10</option>
										<option value="11">11</option>
										<option value="12">12</option>
										<option value="13">13</option>
										<option value="14">14</option>
										<option value="15">15</option>
										<option value="16">16</option>
										<option value="17">17</option>
										<option value="18">18</option>
										<option value="19">19</option>
										<option value="20">20</option>
										<option value="21">21</option>
										<option value="22">22</option>
										<option value="23">23</option>
										<option value="24">24</option>
										<option value="25">25</option>
										<option value="26">26</option>
										<option value="27">27</option>
										<option value="28">28</option>
										<option value="29">29</option>
										<option value="30">30</option>
										<option value="31">31</option>
									</select>
								</div>
							</div>
							<div className="col-6">
								<div className="inputWrpr">
									<select
										className="form-control"
										name="birthmonth"
										value={data.birthdate.birthmonth}
										onChange={handleInputChangeLavel1}
									>
										<option value="0">Month</option>
										<option value="01">January</option>
										<option value="02">February</option>
										<option value="03">March</option>
										<option value="04">April</option>
										<option value="05">May</option>
										<option value="06">June</option>
										<option value="07">July</option>
										<option value="08">August</option>
										<option value="09">September</option>
										<option value="10">October</option>
										<option value="11">November</option>
										<option value="12">December</option>
									</select>
								</div>
							</div>
							<div className="col-3">
								<div className="inputWrpr">
									<select
										className="form-control"
										name="birthyear"
										value={data.birthdate.birthyear}
										onChange={handleInputChangeLavel1}
									>
										<option value="2004">2004</option>
										<option value="2003">2003</option>
										<option value="2002">2002</option>
										<option value="2001">2001</option>
										<option value="2000">2000</option>
										<option value="1999">1999</option>
										<option value="1998">1998</option>
										<option value="1997">1997</option>
										<option value="1996">1996</option>
										<option value="1995">1995</option>
										<option value="1994">1994</option>
										<option value="1993">1993</option>
										<option value="1992">1992</option>
										<option value="1991">1991</option>
										<option value="1990">1990</option>
										<option value="1989">1989</option>
										<option value="1988">1988</option>
										<option value="1987">1987</option>
										<option value="1986">1986</option>
										<option value="1985">1985</option>
										<option value="1984">1984</option>
										<option value="1983">1983</option>
										<option value="1982">1982</option>
										<option value="1981">1981</option>
										<option value="1980">1980</option>
										<option value="1979">1979</option>
										<option value="1978">1978</option>
										<option value="1977">1977</option>
										<option value="1976">1976</option>
										<option value="1975">1975</option>
										<option value="1974">1974</option>
										<option value="1973">1973</option>
										<option value="1972">1972</option>
										<option value="1971">1971</option>
										<option value="1970">1970</option>
										<option value="1969">1969</option>
										<option value="1968">1968</option>
										<option value="1967">1967</option>
										<option value="1966">1966</option>
										<option value="1965">1965</option>
										<option value="1964">1964</option>
										<option value="1963">1963</option>
										<option value="1962">1962</option>
										<option value="1961">1961</option>
										<option value="1960">1960</option>
										<option value="1959">1959</option>
										<option value="1958">1958</option>
										<option value="1957">1957</option>
										<option value="1956">1956</option>
										<option value="1955">1955</option>
										<option value="1954">1954</option>
										<option value="1953">1953</option>
										<option value="1952">1952</option>
										<option value="1951">1951</option>
										<option value="1950">1950</option>
										<option value="1949">1949</option>
										<option value="1948">1948</option>
										<option value="1947">1947</option>
										<option value="1946">1946</option>
										<option value="1945">1945</option>
										<option value="1944">1944</option>
										<option value="1943">1943</option>
									</select>
								</div>
							</div>
						</div>
					</div>
					<div className="col-6">
						<div className="inputWrpr">
							<label className="label">Place of birth</label>
							<input
								type="text"
								className="form-control"
								name="placeofbirth"
								value={data.placeofbirth}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="col-6">
						<div className="inputWrpr">
							<label className="label">Gender</label>
							<select
								className="form-control"
								name="gender"
								onChange={handleInputChange}
								value={data.gender}
							>
								<option value="male">Male</option>
								<option value="female">Female</option>
							</select>
						</div>
					</div>
					<div className="col-6">
						<div className="inputWrpr">
							<label className="label">Nationality</label>
							<input
								type="text"
								className="form-control"
								name="nationality"
								value={data.nationality}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="col-6">
						<div className="inputWrpr">
							<label className="label">Martial Status</label>
							<input
								type="text"
								className="form-control"
								name="martial"
								value={data.martial}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="col-6">
						<div className="inputWrpr">
							<label className="label">Linkedin Link</label>
							<input
								type="text"
								className="form-control"
								name="linkedin"
								value={data.linkedin}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="col-12">
						<div className="inputWrpr">
							<label>Summary</label>
							<Editor
								onInit={(evt, editor) => summaryRef.current = editor}
								initialValue={data.summary}
								init={{
								height: 170,
								menubar: false,
								plugins: [
									'advlist autolink lists link charmap print preview anchor',
									'searchreplace visualblocks code fullscreen',
									'insertdatetime  table paste wordcount'
								],
								toolbar: 'undo redo | formatselect | ' +
								'bold italic backcolor |  ' +
								' | bullist numlist   | ' +
								'removeformat | help',
								content_style: 'body { font-family:Poppins,Arial,sans-serif; font-size:14px }'
								}}
							/>
						</div>

					</div>
					<div className="col-12">
						<div className="inputWrpr">
							<label>Skill</label>
							<Editor
								onInit={(evt, editor) => skillyRef.current = editor}
								initialValue={data.skill}
								init={{
								height: 170,
								menubar: false,
								plugins: [
									'advlist autolink lists link charmap print preview anchor',
									'searchreplace visualblocks code fullscreen',
									'insertdatetime  table paste wordcount'
								],
								toolbar: 'undo redo | formatselect | ' +
								'bold italic backcolor |  ' +
								' | bullist numlist   | ' +
								'removeformat | help',
								content_style: 'body { font-family:Poppins,Arial,sans-serif; font-size:14px }'
								}}
							/>
						</div>

					</div>

					<div className="col-12">
						<div className="inputWrpr">
							<label>Experience</label>
							<Editor
								onInit={(evt, editor) => expRef.current = editor}
								initialValue={data.experience}
								init={{
								height: 170,
								menubar: false,
								plugins: [
									'advlist autolink lists link charmap print preview anchor',
									'searchreplace visualblocks code fullscreen',
									'insertdatetime  table paste wordcount'
								],
								toolbar: 'undo redo | formatselect | ' +
								'bold italic backcolor |  ' +
								' | bullist numlist   | ' +
								'removeformat | help',
								content_style: 'body { font-family:Poppins,Arial,sans-serif; font-size:14px }'
								}}
							/>
						</div>

					</div>

					<div className="col-12">
						<div className="inputWrpr">
							<label>Education</label>
							<Editor
								onInit={(evt, editor) => eduRef.current = editor}
								initialValue={data.education}
								init={{
								height: 170,
								menubar: false,
								plugins: [
									'advlist autolink lists link charmap print preview anchor',
									'searchreplace visualblocks code fullscreen',
									'insertdatetime  table paste wordcount'
								],
								toolbar: 'undo redo | formatselect | ' +
								'bold italic backcolor |  ' +
								' | bullist numlist   | ' +
								'removeformat | help',
								content_style: 'body { font-family:Poppins,Arial,sans-serif; font-size:14px }'
								}}
							/>
						</div>

					</div>



					<div className="col-12">
						<div className="inputWrpr">
							<label>Certificate</label>
							<Editor
								onInit={(evt, editor) => certRef.current = editor}
								initialValue={data.certificate}
								init={{
								height: 170,
								menubar: false,
								plugins: [
									'advlist autolink lists link charmap print preview anchor',
									'searchreplace visualblocks code fullscreen',
									'insertdatetime  table paste wordcount'
								],
								toolbar: 'undo redo | formatselect | ' +
								'bold italic backcolor |  ' +
								' | bullist numlist   | ' +
								'removeformat | help',
								content_style: 'body { font-family:Poppins,Arial,sans-serif; font-size:14px }'
								}}
							/>
						</div>

					</div>


                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
				</div>
			</form>
		</div>
	);
};

export default CreateCv;