import { Box, SvgIcon } from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

const HospitalEntry: React.FC<{ entry: Entry; diagnoses: Diagnosis[] }> = ({
  entry,
  diagnoses,
}) => (
  <Box
    style={{
      border: "2px solid black",
      borderRadius: 5,
      padding: 5,
      marginTop: 5,
      backgroundColor: "#f5f5f5",
    }}
  >
    <b>{entry.date}</b> <SvgIcon component={MedicalServicesIcon} />
    <br />
    <i>{entry.description}</i>
    <br />
    {entry.diagnosisCodes && (
      <ul>
        {entry.diagnosisCodes.map((code) => {
          const diagnosis = diagnoses.find((d) => d.code === code);
          return (
            <li key={code}>
              {code} {diagnosis ? diagnosis.name : ""}
            </li>
          );
        })}
      </ul>
    )}
    {entry.discharge && (
      <Box>
        <h4>Discharge</h4>
        <ul>
          <li>Date {entry.discharge.date}</li>
          <li>Criteria {entry.discharge.criteria}</li>
        </ul>
      </Box>
    )}
    diagnosed by {entry.specialist}
  </Box>
);

export default HospitalEntry;
