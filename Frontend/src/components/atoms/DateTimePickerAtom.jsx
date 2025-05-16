import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';

export function DateTimePickerAtom({
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
            <MuiDateTimePicker
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
