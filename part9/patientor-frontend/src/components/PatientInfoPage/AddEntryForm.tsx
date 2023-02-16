import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button, Alert } from '@mui/material';
import patientService from "../../services/patients";
import { Entry, HealthCheckEntryFormValues } from "../../types";
import axios from "axios";

interface Props {
  id: string | undefined,
	entries: Entry[],
	setEntries: React.Dispatch<React.SetStateAction<Entry[] | null>>
}

const AddEntryForm = ({ id, setEntries, entries }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
	const [error, setError] = useState<string>();

	const entryFormStyle = { 
		borderWidth: "2px",
		borderStyle: "dashed",
		marginTop: "10px",
		padding: "10px",
		borderRadius: "10px"
	};

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
		const newEntry: HealthCheckEntryFormValues = {
			type: "HealthCheck",
			description,
			date,
			specialist,
			healthCheckRating: Number(healthCheckRating),
			diagnosisCodes: [diagnosisCodes]
		};
		if (typeof id === 'string')
			try {
				const entry = await patientService.createPatientEntry(id, newEntry);
				setEntries(entries.concat(entry));
			} catch (e: unknown) {
				if (axios.isAxiosError(e)) {
					if (e?.response?.data && typeof e?.response?.data === "string") {
						const message = e.response.data.replace('Something went wrong. Error: ', '');
						console.error(message);
						setError(message);
					} else {
						setError("Unrecognized axios error");
					}
				} else {
					console.error("Unknown error", e);
					setError("Unknown error");
				}
			}
  };

  return (
    <div style={entryFormStyle}>
			<h3>New HealthCheck entry</h3>
			{error && <Alert severity="error" variant="filled">{error}</Alert>}
      <form onSubmit={addEntry}>
        <TextField
					variant="standard"
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
					variant="standard"
          label="Date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
					variant="standard"
          label="Specialist"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
					variant="standard"
          label="Health Check Rating"
          fullWidth
					type="number"
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />
        <TextField
					variant="standard"
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        <Grid style={
					{ display: "flex", justifyContent: "space-between", paddingTop: "15px" }
				}>
          <Grid item >
            <Button type="submit"variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;