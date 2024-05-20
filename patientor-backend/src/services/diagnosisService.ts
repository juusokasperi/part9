import diagnosisData from "../../data/diagnoses.ts";
import { DiagnosisEntry } from "../types";

console.log(diagnosisData, "diagnosisData imported");

const getEntries = (): DiagnosisEntry[] => {
  return diagnosisData;
};

const addDiagnosis = (entry: DiagnosisEntry): DiagnosisEntry => {
  diagnosisData.push(entry);
  return entry;
};

export default {
  getEntries,
  addDiagnosis,
};
