import { Box, SvgIcon } from "@mui/material";
import { Entry, Diagnosis } from "../../types";

import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";

const HealthCheck: React.FC<{
  entry: Entry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {
  let healthIconColor = "black";
  if (entry.healthCheckRating === 0) {
    healthIconColor = "green";
  }
  if (entry.healthCheckRating === 1) {
    healthIconColor = "yellow";
  }
  if (entry.healthCheckRating === 2) {
    healthIconColor = "orange";
  }
  if (entry.healthCheckRating === 3) {
    healthIconColor = "red";
  }

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
      <SvgIcon component={FavoriteIcon} style={{ color: healthIconColor }} />
      <br />
      diagnosed by {entry.specialist}
    </Box>
  );
};

export default HealthCheck;
