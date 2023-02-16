import patients from '../../data/patients';
import { Entry, EntryWithoutId, NewPatient, NonSensitivePatient, Patient } from '../types';
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

const addPatientEntry = ( id: string, entry: EntryWithoutId ): Entry => {
	const newPatientEntry = {
		id: uuid(),
		...entry
	};

	const patient = findById(id);
	patient?.entries.push(newPatientEntry);
	return newPatientEntry;
};

export default {
  getPatients,
	findById,
	addPatient,
	addPatientEntry
};