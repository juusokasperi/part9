import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from "@mui/material";
import AddEntryForm from "./AddEntryForm";

import { EntryFormValues, Diagnosis } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  entryType: string;
  error?: string;
  diagnoses: Diagnosis[];
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  entryType,
  error,
  diagnoses,
}: Props) => {
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new {entryType} entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <AddEntryForm
          onSubmit={onSubmit}
          onCancel={onClose}
          entryType={entryType}
          diagnoses={diagnoses}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
