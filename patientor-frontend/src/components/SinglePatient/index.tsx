import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import axios from "axios";
import { Diagnosis, Patient, Entry, EntryFormValues } from "../../types";
import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuItem,
  Box,
  Button,
  Typography,
  SvgIcon,
} from "@mui/material";
import TransgenderIcon from "@mui/icons-material/Transgender";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";

import AddEntryModal from "../AddEntryModal";

interface Props {
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry; diagnoses: Diagnosis[] }> = ({
  entry,
  diagnoses,
}) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

const SinglePatient = ({ diagnoses }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [entryType, setEntryType] = useState<string>("");
  const [error, setError] = useState<string>();

  const openModal = (type: string): void => {
    setAnchorEl(null);
    setEntryType(type);
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const id = useParams().id;

  // The menu thingies
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  if (!id) {
    return null;
  }

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      void (await patientService.addEntry(id, values));
      fetchPatient();
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const [patient, setPatient] = useState<Patient>();
  const fetchPatient = async () => {
    const patientData = await patientService.getPatient(id);
    setPatient(patientData);
    return;
  };
  useEffect(() => {
    void fetchPatient();
  }, []);

  if (patient) {
    return (
      <Box>
        <Box paddingTop={2}>
          <Typography variant="h4">
            {patient.name}
            {patient.gender === "female" && (
              <SvgIcon fontSize="large" component={FemaleIcon} />
            )}
            {patient.gender === "male" && (
              <SvgIcon fontSize="large" component={MaleIcon} />
            )}
            {patient.gender === "other" && (
              <SvgIcon fontSize="large" component={TransgenderIcon} />
            )}
          </Typography>
        </Box>
        <Box>
          Social security number: {patient.ssn}
          <br />
          Occupation: {patient.occupation}
        </Box>

        {patient.entries && patient.entries.length > 0 && (
          <Box style={{ marginTop: 15, marginBottom: 15 }}>
            <Typography variant="h5">Entries</Typography>
            {patient.entries.map((entry) => (
              <EntryDetails
                key={entry.id}
                entry={entry}
                diagnoses={diagnoses}
              />
            ))}
          </Box>
        )}

        <AddEntryModal
          modalOpen={modalOpen}
          onClose={closeModal}
          onSubmit={submitNewEntry}
          entryType={entryType}
          error={error}
          diagnoses={diagnoses}
        />

        <Button
          variant="contained"
          id="entryButton"
          aria-controls={open ? "entryMenu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Add Entry
        </Button>
        <Menu
          id="entryMenu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => openModal("HealthCheck")}>
            Health Check
          </MenuItem>
          <MenuItem onClick={() => openModal("Hospital")}>
            Hospital Entry
          </MenuItem>
          <MenuItem onClick={() => openModal("OccupationalHealthcare")}>
            Occupational Healthcare
          </MenuItem>
        </Menu>
      </Box>
    );
  }

  return null;
};

export default SinglePatient;
