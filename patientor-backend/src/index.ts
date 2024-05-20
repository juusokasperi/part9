import express from "express";
import diagnosisRouter from "./routes/diagnosis";
import pingRouter from "./routes/ping";
import patientsRouter from "./routes/patients";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.use("/api/ping", pingRouter);
app.use("/api/diagnoses", diagnosisRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
