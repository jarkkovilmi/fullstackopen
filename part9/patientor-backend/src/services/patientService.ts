import patients from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Array<NonSensitivePatient> => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
  }));
};

const addPatient = ( patient: NewPatient ): Patient => {
	const newPatient = {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		id: uuid(),
		...patient
	};

	patients.push(newPatient);
	return newPatient;
};

export default {
  getPatients,
	addPatient
};