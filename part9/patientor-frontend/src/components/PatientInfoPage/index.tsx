import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { SvgIcon } from '@mui/material';
import { Male, Female, Transgender } from '@mui/icons-material';

import { Gender, Patient } from "../../types";

const PatientInfoPage = () => {
	const [patient, setPatient] = useState<Patient | null>(null);
	const id = useParams().id;

	useEffect(() => {
		if (!id)
			return;
		const fetchPatient = async () => {
			const patient = await patientService.getPatient(id);
			setPatient(patient);
		};
		fetchPatient();
	}, [id]);

	if (!patient)
		return <div>Patient not found</div>;

	const renderGenderIcon = (gender: Gender) => {
		switch (gender) {
			case "male": {
				return <SvgIcon component={Male} />;
			}
			case "female": {
				return <SvgIcon component={Female} />;
			}
			case "other": {
				return <SvgIcon component={Transgender} />;
			}
		}
	};

	return (
		<div>
			<h2>{patient.name} {renderGenderIcon(patient.gender)}</h2>
			<div>ssn: {patient.ssn}</div>
			<div>occupation: {patient.occupation}</div>
			<h3>entries</h3>
			{patient.entries.map(entry => (
				<div key={entry.id}>
					<div>{entry.date} <i>{entry.description}</i></div>
					<ul>
						{entry.diagnosisCodes && entry.diagnosisCodes.map((code, index) => (
							<li key={index}>{code}</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

export default PatientInfoPage;