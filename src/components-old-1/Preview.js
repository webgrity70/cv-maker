import ReactToPdf from 'react-to-pdf'
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue} from "firebase/database";

const printRef = React.createRef();
const options = {
    orientation: 'landscape',
    unit: 'in',
    format: [4,2]
};





const Preview = ({currentCvId}) => {
	const [fetcheData, setFetchedData] = useState(null); 
	const [isDataloaded, setIsDataLoaded] = useState(false);
	const [cvid,setCVid] = useState('');

	useEffect(()=>{
		setCVid(currentCvId)
	},[currentCvId]);



	useEffect(()=>{
		//console.log(cvid);
		if(cvid!==''){
			const db = getDatabase();
			const fetchdataRef = ref(db, `/${cvid}`);  
			onValue(fetchdataRef, (snapshot) => {
				const data = snapshot.val();
				setFetchedData(data);
				//console.log(data)
			})
		}
	},[cvid]);


	useEffect(()=>{
		if (fetcheData!==null){ setIsDataLoaded(true); console.log(fetcheData ) };
	},[fetcheData])





	

	
	return (
		<>
			{isDataloaded &&
			<div className="container a4 preview" ref={printRef}  options={options} >
				<div className="row">
					<div className="col-4">
						<div className="name">
							<h2>{fetcheData.firstname} {fetcheData.lastname}</h2>
						</div>
						<img src="images/dummy-image.jpg" className="profileImg img-fluid" alt="" />
						<br/>
						<br/>
						<h3>General Info</h3>
						<hr />
						<p><strong>DOB:</strong> {fetcheData.birthdate.birthday}.{fetcheData.birthdate.birthmonth}.{fetcheData.birthdate.birthyear}</p>

						<p><strong>Place of Birth: </strong>{fetcheData.placeofbirth}</p>

						<p><strong>Nationality:</strong> {fetcheData.nationality}</p>

						<p><strong>Martial: </strong>{fetcheData.martial}</p>

						<p><strong>Linkedin: </strong>{fetcheData.linkedin}</p>
						<br/>

						<h3>Contact</h3>
						<hr />
						<p>
							<strong className="d-block">Address:</strong> {fetcheData.address}
									</p>
						<br />
						<p>
							<strong className="d-block">Phone:</strong> {fetcheData.phone}
									</p>
						<br />
						<p>
							<strong className="d-block">Email:</strong>{fetcheData.email}
									</p>
						<br />
						<h3>Languages</h3>
						<hr />
						<p>Englisgh</p>
						<p>Bengali</p>
						<p>Hindi</p>
					</div>
					<div className="col-8">
						<h3>Summary</h3>
						<hr />
						<div dangerouslySetInnerHTML={{__html:fetcheData.summary}} ></div>
						<br />

						<h3>Skill Highlights</h3>
						<hr />
						<div dangerouslySetInnerHTML={{__html:fetcheData.skill}} ></div>
						<br/>

						<h3>Experience</h3>
						<hr />
						<div dangerouslySetInnerHTML={{__html:fetcheData.experience}} ></div>
						<br/>

						<h3>Education</h3>
						<hr />
						<div dangerouslySetInnerHTML={{__html:fetcheData.education}} ></div>
						<br/>

						<h3>Certificate</h3>
						<hr />
						<div dangerouslySetInnerHTML={{__html:fetcheData.certificate}} ></div>
						<br/>
					</div>
				</div>
			</div>
			}
			{isDataloaded &&
			<div className="printBtnWrpr text-center">
				<ReactToPdf  targetRef={printRef} filename="yourcv.pdf" >
					{({toPdf}) => (
						<button onClick={toPdf} className="btn btn-primary">Print</button>
					)}
				</ReactToPdf>
				
			</div>
			}
		</>
	);
};
export default Preview;