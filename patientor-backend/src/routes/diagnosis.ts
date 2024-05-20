import express from "express";
import diagnosisService from "../services/diagnosisService";
import { toNewDiagnosisEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diagnosisService.getEntries());
});

router.post("/", (req, res) => {
  try {
    const newDiagnosisEntry = toNewDiagnosisEntry(req.body);
    const addedDiagnosis = diagnosisService.addDiagnosis(newDiagnosisEntry);

    res.json(addedDiagnosis);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
