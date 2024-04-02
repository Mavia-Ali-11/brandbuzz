import TextField from '@mui/material/TextField';
import { ChangeEvent } from 'react';
import "./index.css"

interface InputFieldProps {
  type: 'email' | 'text';
  label: string;
  placeholder: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  field?: any;
}

const TextInputs: React.FC<InputFieldProps> = ({ type, label, placeholder, onChange, ...field }) => {
  return (
    <>
      {
        type === "email" ?
          <TextField
            type={type}
            label={label}
            variant="filled"
            placeholder={placeholder}
            className="input_field"
            onChange={onChange}
            {...field}
            InputLabelProps={{
              shrink: true,
            }}
          /> :
          <TextField
            type={type}
            label={label}
            variant="filled"
            placeholder={placeholder}
            className="input_field"
            onChange={onChange}
            {...field}
            InputLabelProps={{
              shrink: true,
            }}
          />
      }
    </>
  )
}

export default TextInputs