import { NewPatient, Gender } from './types';

const toNewPatient = (object: unknown): NewPatient => {
	if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object 
		&& 'gender' in object && 'occupation' in object && 'entries' in object) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
			entries: []
    };
  
    return newPatient;
  }

  throw new Error('Incorrect data: a field missing');
};

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const isSsn = (ssn: unknown): ssn is string => {
	if (typeof ssn === 'string') {
		const regex = /^\d{6}-\d{2,3}[0-9A-Z]$/;
		return regex.test(ssn);
	}
	return false;
};

const parseSsn = (ssn: unknown): string => {
  if (!isSsn(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (gender: string): gender is Gender => {
	return Object.values(Gender).map(v => v.toString()).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

export default toNewPatient;