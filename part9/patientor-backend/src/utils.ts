import { NewPatient, Gender, Diagnosis,
	EntryWithoutId, HealthCheckRating,
	SickLeave, Discharge} from './types';

const toNewPatient = (object: unknown): NewPatient => {
	if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object 
		&& 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
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

const isNumber = (number: unknown): number is number => {
	return typeof number === 'number' || number instanceof Number;
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

const parseDate = (date: unknown): string => {
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

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
	return Object.values(HealthCheckRating).map(v => v).includes(rating);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || !isHealthCheckRating(rating)) {
      throw new Error('Incorrect or missing rating: ' + rating);
  }
  return rating;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error('Incorrect or missing employer name');
  }
  return employerName;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isSickLeave = (object: { startDate: unknown, endDate: unknown}): object is SickLeave => {
	return isString(object.startDate) && isString(object.endDate);
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== 'object' || !('startDate' in object)
		|| !('endDate' in object) || !isSickLeave(object)) {
		throw new Error('Incorrect or missing sick leave values');
  }
  return object;
};

const isDischarge = (object: { date: unknown, criteria: unknown}): object is Discharge => {
	return isString(object.date) && isString(object.criteria);
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== 'object' || !('date' in object)
		|| !('criteria' in object) || !isDischarge(object)) {
		throw new Error('Incorrect or missing discharge values');
  }
  return object;
};

export const toNewPatientEntry = (object: unknown): EntryWithoutId => {
	if ( !object || typeof object !== 'object' || !('type' in object) ) {
    throw new Error('Incorrect or missing data');
  }
	let baseEntry;

	if ('description' in object && 'date' in object && 'specialist' in object ) {
		baseEntry = {
			description: parseDescription(object.description),
			date: parseDate(object.date),
			specialist: parseSpecialist(object.specialist),
		};
	} else {
		throw new Error('Incorrect or missing base data');
	}

	if ('diagnosisCodes' in object) {
		baseEntry = {
			...baseEntry,
			diagnosisCodes: parseDiagnosisCodes(object)
		};
	}

	if ('healthCheckRating' in object && object.type === 'HealthCheck') {
		return {
			...baseEntry,
			type: object.type,
			healthCheckRating: parseHealthCheckRating(Number(object.healthCheckRating)),
		};
	}

	if ('employerName' in object && object.type === 'OccupationalHealthcare') {
		if ('sickLeave' in object) {
			baseEntry = {
				...baseEntry,
				sickLeave: parseSickLeave(object.sickLeave)
			};
		}
		return {
			...baseEntry,
			type: object.type,
			employerName: parseEmployerName(object.employerName)
		};
	}

	if ('discharge' in object && object.type === 'Hospital') {
		return {
			...baseEntry,
			type: object.type,
			discharge: parseDischarge(object.discharge)
		};
	}

	throw new Error('Incorrect data: a field missing');
};

export default toNewPatient;