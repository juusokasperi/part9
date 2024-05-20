import { useState, SyntheticEvent } from "react";

import {
  TextField,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Select,
  Grid,
  Button,
  Box,
  SelectChangeEvent,
} from "@mui/material";

import { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

import { EntryFormValues, HealthCheckRating, Diagnosis } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  entryType: string;
  diagnoses: Diagnosis[];
}

interface HealthCheckRatingOption {
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.keys(
  HealthCheckRating
)
  .filter((key) => isNaN(Number(key)))
  .map((key) => ({
    value: HealthCheckRating[key as keyof typeof HealthCheckRating],
    label: key,
  }));

const AddEntryForm = ({ onCancel, onSubmit, entryType, diagnoses }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);

  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const [dischargeDate, setDischargeDate] = useState<Dayjs | null>(null);
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState<Dayjs | null>(null);
  const [sickLeaveEnd, setSickLeaveEnd] = useState<Dayjs | null>(null);

  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    const value = event.target.value as number;
    setHealthCheckRating(value as HealthCheckRating);
  };

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    setDiagnosisCodes(event.target.value as string[]);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const type = entryType;
    const dateString = date ? date.format("YYYY-MM-DD") : "";
    const dischargeDateString = dischargeDate
      ? dischargeDate.format("YYYY-MM-DD")
      : "";
    const sickLeaveStartString = sickLeaveStart
      ? sickLeaveStart.format("YYYY-MM-DD")
      : "";
    const sickLeaveEndString = sickLeaveEnd
      ? sickLeaveEnd.format("YYYY-MM-DD")
      : "";
    if (type === "HealthCheck") {
      onSubmit({
        description,
        date: dateString,
        specialist,
        diagnosisCodes,
        healthCheckRating,
        type,
      });
    }
    if (type === "Hospital") {
      onSubmit({
        description,
        date: dateString,
        specialist,
        diagnosisCodes,
        discharge: {
          date: dischargeDateString,
          criteria: dischargeCriteria,
        },
        type,
      });
    }
    if (type === "OccupationalHealthcare") {
      if (
        sickLeaveStartString &&
        sickLeaveEndString &&
        sickLeaveStartString !== "" &&
        sickLeaveEndString !== ""
      ) {
        onSubmit({
          description,
          date: dateString,
          specialist,
          diagnosisCodes,
          employerName,
          sickLeave: {
            startDate: sickLeaveStartString,
            endDate: sickLeaveEndString,
          },
          type: "OccupationalHealthcare",
        });
        return;
      }
      onSubmit({
        description,
        date: dateString,
        specialist,
        diagnosisCodes,
        employerName,
        type: "OccupationalHealthcare",
      });
    }
  };

  if (
    entryType !== "Hospital" &&
    entryType !== "OccupationalHealthcare" &&
    entryType !== "HealthCheck"
  ) {
    return null;
  }

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <DatePicker
          disablePast
          label="Date"
          value={date}
          format="YYYY-MM-DD"
          onChange={(newValue: Dayjs | null) => setDate(newValue)}
        />

        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <InputLabel id="diagnosisCodes">Diagnosis codes</InputLabel>
        <Select
          labelId="diagnosisCodes"
          id="diagnosis"
          multiple
          fullWidth
          value={diagnosisCodes}
          onChange={handleDiagnosisCodesChange}
          input={<OutlinedInput label="Code" />}
        >
          {diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code} {d.name}
            </MenuItem>
          ))}
        </Select>

        {entryType === "HealthCheck" && (
          <Box>
            <InputLabel style={{ marginTop: 20 }}>
              Health Check Rating
            </InputLabel>
            <Select
              label="Health Check Rating"
              fullWidth
              value={healthCheckRating}
              onChange={onHealthCheckRatingChange}
            >
              {healthCheckRatingOptions.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )}
        {entryType === "Hospital" && (
          <Box>
            <InputLabel style={{ marginTop: 20 }}>Discharge</InputLabel>
            <DatePicker
              label="Date"
              value={dischargeDate}
              disablePast
              format="YYYY-MM-DD"
              onChange={(newValue: Dayjs | null) => setDischargeDate(newValue)}
            />
            <TextField
              label="Criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </Box>
        )}
        {entryType === "OccupationalHealthcare" && (
          <Box>
            <TextField
              label="Employer name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>Sickleave</InputLabel>
            <DatePicker
              label="Start date"
              value={sickLeaveStart}
              disablePast
              format="YYYY-MM-DD"
              onChange={(newValue: Dayjs | null) => setSickLeaveStart(newValue)}
            />
            <DatePicker
              label="End date"
              value={sickLeaveEnd}
              disablePast
              format="YYYY-MM-DD"
              onChange={(newValue: Dayjs | null) => setSickLeaveEnd(newValue)}
            />
          </Box>
        )}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
