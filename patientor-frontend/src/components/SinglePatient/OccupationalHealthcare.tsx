import { Box, SvgIcon } from "@mui/material";
import { Diagnosis, Entry } from "../../types";

import WorkIcon from "@mui/icons-material/Work";

const OccupationalHealthcare: React.FC<{
  entry: Entry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {
  return (
    <Box
      style={{
        border: "2px solid black",
        borderRadius: 5,
        padding: 5,
        marginTop: 5,
        backgroundColor: "#f5f5f5",
      }}
    >
      <b>{entry.date}</b>
      <SvgIcon component={WorkIcon} />
      <i>{entry.employerName}</i>
      <br />
      <i>{entry.description}</i>
      <br />
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code) => {
            const diagnosis = diagnoses.find((d) => d.code === code);
            return (
              <li key={code}>
                {code} {diagnosis ? diagnosis.name : null}
              </li>
            );
          })}
        </ul>
      )}
      {entry.sickLeave && (
        <Box>
          <h4>Sick leave</h4>
          <ul>
            <li>Start date {entry.sickLeave.startDate}</li>
            <li>End date {entry.sickLeave.endDate}</li>
          </ul>
        </Box>
      )}
      diagnosed by {entry.specialist}
    </Box>
  );
};

export default OccupationalHealthcare;
