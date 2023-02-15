import { Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";
import { Work, Healing, LocalHospital, Favorite } from '@mui/icons-material';

interface BaseDetails {
	diagnoses: Diagnosis[]
}

const healthRatingColor = {
  0: 'green',
  1: 'yellow',
  2: 'orange',
  3: 'red'
};

interface HealthCheckProps extends BaseDetails {
	entry: HealthCheckEntry
}

const HealthCheckDetails = ({ entry, diagnoses }: HealthCheckProps) => {
	return (
		<div key={entry.id}>
			<div>{entry.date} <LocalHospital /> <i>{entry.description}</i></div>
			<ul>
				{entry.diagnosisCodes && entry.diagnosisCodes.map((code) => (
					<li key={code}>
						{code} {diagnoses.find(d => d.code === code)?.name}
					</li>
				))}
			</ul>
			<div>
				<Favorite style={{ color: healthRatingColor[entry.healthCheckRating] }} />
			</div><br/>
			<div>diagnosed by {entry.specialist}</div>
		</div>
	);
};

interface OccupationalHealthcareProps extends BaseDetails {
	entry: OccupationalHealthcareEntry
}

const OccupationalHealthcareDetails = ({ entry, diagnoses }: OccupationalHealthcareProps) => {
	return (
		<div key={entry.id}>
			<div>{entry.date} <Work /> <b>{entry.employerName}</b></div>
			<div><i>{entry.description}</i></div>
			<ul>
				{entry.diagnosisCodes && entry.diagnosisCodes.map((code) => (
					<li key={code}>
						{code} {diagnoses.find(d => d.code === code)?.name}
					</li>
				))}
			</ul>
			{entry.sickLeave && 
				<div>
					<div><b>Sick leave</b></div>
					<div>start: {entry.sickLeave.startDate}</div>
					<div>end: {entry.sickLeave.endDate}</div>
				</div>
			}
			<br/>
			<div>diagnosed by {entry.specialist}</div>
		</div>
	);
};

interface HospitalProps extends BaseDetails {
	entry: HospitalEntry
}

const HospitalDetails = ({ entry, diagnoses }: HospitalProps) => {
	return (
		<div key={entry.id}>
			<div>{entry.date} <Healing /></div>
			<div><i>{entry.description}</i></div>
			<ul>
				{entry.diagnosisCodes && entry.diagnosisCodes.map((code) => (
					<li key={code}>
						{code} {diagnoses.find(d => d.code === code)?.name}
					</li>
				))}
			</ul>
			<div>discharged {entry.discharge.date}</div>
			<div>criteria: {entry.discharge.criteria}</div><br/>
			<div>diagnosed by {entry.specialist}</div>
		</div>
	);
};

interface EntryProps extends BaseDetails {
	entry: Entry
}

const EntryDetails = ({ entry, diagnoses }: EntryProps) => {
	const assertNever = (value: never): never => {
		throw new Error(
			`Unhandled discriminated union member: ${JSON.stringify(value)}`
		);
	};
	switch(entry.type) {
		case "HealthCheck":
			return <HealthCheckDetails entry={entry} diagnoses={diagnoses} />;
		case "OccupationalHealthcare":
				return <OccupationalHealthcareDetails entry={entry} diagnoses={diagnoses} />;
		case "Hospital":
			return <HospitalDetails entry={entry} diagnoses={diagnoses} />;
		default:
			return assertNever(entry);
	}
};

export default EntryDetails;