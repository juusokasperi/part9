import patientData from "../../data/patients.ts";
import {
  NonSensitivePatientEntry,
  NewPatientEntry,
  PatientEntry,
  EntryWithoutId,
  Entry,
} from "../types";
import { v1 as uuid } from "uuid";

const getPatient = (id: string): PatientEntry | undefined => {
  return patientData.find((patient) => patient.id === id);
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
  const patient = patientData.find((patient) => patient.id === patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }

  const newEntry = {
    ...entry,
    id: uuid(),
  };

  patient.entries.push(newEntry);
  return newEntry;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patientData.push(newPatientEntry);
  return newPatientEntry;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getNonSensitiveEntries,
  addDiagnosis,
  addPatient,
  getPatient,
  addEntry,
};
