import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes, useParams } from "react-router-dom";
import { Button, Divider, Container, Typography, SvgIcon } from '@mui/material';
import { Male, Female, Transgender } from '@mui/icons-material';

import { apiBaseUrl } from "./constants";
import { Gender, Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";

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
		</div>
	);
};

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);
  
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patient/:id" element={<PatientInfoPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
