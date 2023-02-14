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

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

const addPatient = ( patient: NewPatient ): Patient => {
	const newPatient = {
		id: uuid(),
		...patient
	};

	patients.push(newPatient);
	return newPatient;
};

export default {
  getPatients,
	addPatient,
	findById
};