/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
  try {
		const { name, dateOfBirth, ssn, gender, occupation } = req.body;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		const addedPatient = patientService.addPatient({
			name,
			dateOfBirth,
			ssn,
			gender,
			occupation
		});
		res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;