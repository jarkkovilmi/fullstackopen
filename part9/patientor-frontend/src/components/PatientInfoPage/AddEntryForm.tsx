import { useState, SyntheticEvent } from "react";
import { TextField, Grid, Button, Alert, RadioGroup, FormControlLabel, Radio, Box, InputLabel, Select, MenuItem, SelectChangeEvent, OutlinedInput, Checkbox, ListItemText, FormControl } from '@mui/material';
import patientService from "../../services/patients";
import { Diagnosis, Discharge, Entry, EntryType, SickLeave } from "../../types";
import axios from "axios";

interface Props {
  id: string | undefined,
	entries: Entry[],
	diagnoses: Diagnosis[],
	setEntries: React.Dispatch<React.SetStateAction<Entry[] | null>>
}

const AddEntryForm = ({ id, setEntries, entries, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);

  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [employerName, setEmployerName] = useState('');

  const [sickLeave, setSickLeave] = useState<SickLeave>({ startDate: '', endDate: '' });
  const [discharge, setDischarge] = useState<Discharge>({ date: '', criteria: '' });

	const [error, setError] = useState<string>();
	const [entryType, setEntryType] = useState<EntryType | undefined>(undefined);

	const entryFormStyle = { 
		borderWidth: "2px",
		borderStyle: "dashed",
		marginTop: "10px",
		padding: "10px",
		borderRadius: "10px"
	};

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
		if (typeof entryType === undefined)
			return;
		let newEntry;
		if (entryType === "HealthCheck") {
			newEntry = {
				description,
				date,
				specialist,
				diagnosisCodes: diagnosisCodes,
				type: entryType,
				healthCheckRating: Number(healthCheckRating)
			};	
		} else if (entryType === "OccupationalHealthcare") {
			newEntry = {
				description,
				date,
				specialist,
				diagnosisCodes: diagnosisCodes,
				type: entryType,
				employerName,
				sickLeave 
			};	
		} else if (entryType === "Hospital") {
			newEntry = {
				description,
				date,
				specialist,
				diagnosisCodes: diagnosisCodes,
				type: entryType,
				discharge
			};	
		} else { 
			return;
		}

		if (typeof id === 'string')
			try {
				const entry = await patientService.createPatientEntry(id, newEntry);
				setEntries(entries.concat(entry));
				initStates();
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

	const initStates = () => {
		setDescription('');
		setDate('');
		setSpecialist('');
		setDiagnosisCodes([]);
	
		setHealthCheckRating('');
		setEmployerName('');
	
		setSickLeave({ startDate: '', endDate: '' });
		setDischarge({ date: '', criteria: '' });
	
		setError(undefined);
		setEntryType(undefined);
	};

	const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
		const value = event.target.value;
		setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
	};
	
  return (
    <div style={entryFormStyle}>
			<h3>Add new entry</h3>
			{error && <Alert severity="error" variant="filled">{error}</Alert>}
			<RadioGroup
				row
        aria-labelledby="radio-buttons-group-label"
        name="radio-buttons-group"
				onChange={(event) => setEntryType(event.target.value as EntryType)}
      >
        <FormControlLabel 
					value="HealthCheck"
					control={<Radio />}
					label="Health Check" />
        <FormControlLabel
					value="OccupationalHealthcare"
					control={<Radio />}
					label="Occupational Healthcare" />
        <FormControlLabel
					value="Hospital"
					control={<Radio />}
					label="Hospital" />
      </RadioGroup>
      {entryType && 
			<form onSubmit={addEntry}>
        <TextField
					variant="standard"
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
					style={{ marginTop: 16 }}
					variant="standard"
					type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
					variant="standard"
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
				<FormControl sx={{ marginTop: 2, width: 300 }}>
					<InputLabel>Diagnosis Codes</InputLabel>
					<Select
						multiple
						value={diagnosisCodes}
						onChange={handleChange}
						input={<OutlinedInput label="Diagnosis Codes" />}
						renderValue={(selected) => selected.join(', ')}
					>
						{diagnoses.map((diagnose) => (
							<MenuItem key={diagnose.code} value={diagnose.code}>
								<Checkbox checked={diagnosisCodes.indexOf(diagnose.code) > -1} />
								<ListItemText primary={diagnose.code} secondary={diagnose.name} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
				{entryType === "HealthCheck" &&
					<TextField
						variant="standard"
						label="Health Check Rating"
						fullWidth
						type="number"
						InputProps={{ inputProps: { min: 0, max: 3 } }}
						value={healthCheckRating}
						onChange={({ target }) => setHealthCheckRating(target.value)}
					/>
				}
				{entryType === "OccupationalHealthcare" &&
					<>
						<TextField
							variant="standard"
							label="Employer name"
							fullWidth
							type="text"
							value={employerName}
							onChange={({ target }) => setEmployerName(target.value)}
						/>
						<Box style={{ marginTop: 10 }}>
							<InputLabel style={{ marginTop: 10 }}>Sick leave</InputLabel>
							<Box style={{ marginLeft: 10 }} >
								<InputLabel >start date:</InputLabel>
								<TextField
									variant="standard"
									type="date"
									fullWidth
									value={sickLeave.startDate}
									onChange={({ target }) => setSickLeave(
										{ ...sickLeave, startDate: target.value }
									)}
								/>
								<InputLabel style={{ marginTop: 10}}>end date:</InputLabel>
								<TextField
									variant="standard"
									type="date"
									fullWidth
									value={sickLeave.endDate}
									onChange={({ target }) => setSickLeave(
										{ ...sickLeave, endDate: target.value }
									)}
								/>
							</Box>
						</Box>
					</>
				}
				{entryType === "Hospital" &&
					<>
						<Box style={{ marginTop: 10 }}>
							<InputLabel style={{ marginTop: 10 }}>Discharge</InputLabel>
							<Box style={{ marginLeft: 10 }} >
								<TextField
									variant="standard"
									label="Criteria"
									fullWidth
									type="text"
									value={discharge.criteria}
									onChange={({ target }) => setDischarge(
										{ ...discharge, criteria: target.value }
									)}
								/>
								<InputLabel style={{ marginTop: 10}}>Date:</InputLabel>
								<TextField
									variant="standard"
									type="date"
									fullWidth
									value={discharge.date}
									onChange={({ target }) => setDischarge(
										{ ...discharge, date: target.value }
									)}
								/>
							</Box>
						</Box>
					</>
				}
        <Grid 
					style={{
						display: "flex", justifyContent: "space-between", paddingTop: "15px"
					}}
				>
          <Grid item >
            <Button color="secondary" variant="contained"
							type="button" onClick={() => initStates()}>
              Cancel
            </Button>
          </Grid>
          <Grid item >
            <Button type="submit"variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>}
    </div>
  );
};

export default AddEntryForm;