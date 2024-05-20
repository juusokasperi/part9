import {
  NewPatientEntry,
  Gender,
  DiagnosisEntry,
  EntryWithoutId,
  HealthCheckRating,
  Discharge,
  SickLeave,
} from "./types";

//
// New PatientEntry validation
//

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing birthdate: " + date);
  }
  return date;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    object.name !== "" &&
    "dateOfBirth" in object &&
    object.dateOfBirth !== "" &&
    "ssn" in object &&
    object.ssn !== "" &&
    "gender" in object &&
    object.gender !== "" &&
    "occupation" in object &&
    object.occupation !== ""
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };
    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

//
// New DiagnosisEntry validation
//

const parseCode = (code: unknown): string => {
  if (!isString(code)) {
    throw new Error("Incorrect or missing code");
  }
  return code;
};

const parseLatin = (latin: unknown): string => {
  if (!isString(latin)) {
    throw new Error("Incorrect or missing latin");
  }
  return latin;
};

export const toNewDiagnosisEntry = (object: unknown): DiagnosisEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    object.name !== "" &&
    "code" in object &&
    object.code !== "" &&
    "latin" in object &&
    object.latin !== ""
  ) {
    const newEntry: DiagnosisEntry = {
      name: parseName(object.name),
      code: parseCode(object.code),
      latin: parseLatin(object.latin),
    };
    return newEntry;
  }

  if (
    "name" in object &&
    object.name !== "" &&
    "code" in object &&
    object.code !== "" &&
    !("latin" in object)
  ) {
    const newEntry: DiagnosisEntry = {
      name: parseName(object.name),
      code: parseCode(object.code),
    };
    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

//
// Validation for new entries
//

const isNumber = (num: unknown): num is number => {
  return typeof num === "number" || num instanceof Number;
};

const isHCR = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => Number(v))
    .includes(param);
};

const parseHealthCheckRating = (hcr: unknown): HealthCheckRating => {
  if (!isNumber(hcr) || !isHCR(hcr)) {
    throw new Error("Incorrect or missing healthCheckRating: " + hcr);
  }
  return hcr;
};

const parseString = (string: unknown): string => {
  if (!isString(string)) {
    throw new Error("Incorrect or missing field");
  }
  return string;
};

const parseSickLeave = (object: unknown): SickLeave | undefined => {
  if (!object || typeof object !== "object" || !("sickLeave" in object)) {
    return undefined;
  }

  const { sickLeave } = object;

  if (
    sickLeave === null ||
    typeof sickLeave !== "object" ||
    !("startDate" in sickLeave) ||
    !("endDate" in sickLeave)
  ) {
    return undefined;
  }

  return {
    startDate: parseString(sickLeave.startDate),
    endDate: parseString(sickLeave.endDate),
  };
};

const parseDiagnosisCodes = (
  object: unknown
): Array<DiagnosisEntry["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnosisEntry["code"]>;
  }

  return object.diagnosisCodes as Array<DiagnosisEntry["code"]>;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing discharge data.");
  }
  if (
    !(
      "date" in discharge &&
      "criteria" in discharge &&
      discharge.date !== "" &&
      discharge.criteria !== ""
    )
  ) {
    throw new Error("Missing info in discharge data.");
  }

  return {
    date: parseString(discharge.date),
    criteria: parseString(discharge.criteria),
  };
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object" || !("type" in object)) {
    throw new Error("Incorrect or missing data");
  }
  if (
    !(
      object.type === "HealthCheck" ||
      object.type === "Hospital" ||
      object.type === "OccupationalHealthcare"
    )
  ) {
    throw new Error("Incorrect entry type.");
  }

  if (
    !("description" in object && "date" in object && "specialist" in object) ||
    object.description === "" ||
    object.date === "" ||
    object.specialist === ""
  ) {
    throw new Error("Missing fields in the data.");
  }

  const baseEntry = {
    description: parseString(object.description),
    date: parseString(object.date),
    specialist: parseString(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object),
  };

  if (object.type === "HealthCheck") {
    if (!("healthCheckRating" in object)) {
      throw new Error("Missing healthCheckRating.");
    }
    return {
      ...baseEntry,
      type: "HealthCheck",
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    };
  } else if (object.type === "Hospital") {
    if (!("discharge" in object)) {
      throw new Error("Missing discharge.");
    }
    return {
      ...baseEntry,
      type: "Hospital",
      discharge: parseDischarge(object.discharge),
    };
  } else if (object.type === "OccupationalHealthcare") {
    if (!("employerName" in object) || object.employerName === "") {
      throw new Error("Missing employerName.");
    }
    return {
      ...baseEntry,
      type: "OccupationalHealthcare",
      employerName: parseString(object.employerName),
      sickLeave: parseSickLeave(object),
    };
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default toNewPatientEntry;
