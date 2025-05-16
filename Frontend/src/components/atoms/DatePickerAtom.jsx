import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';

export function DatePickerAtom({
    label,
    name,
    value,
    onChange,
    error = false,
    helperText = '',
    ...props
}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MuiDatePicker
                label={label}
                value={value}
                onChange={onChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        error={error}
                        helperText={error ? helperText : ''}
                    />
                )}
                {...props}
            />
        </LocalizationProvider>
    );
}
