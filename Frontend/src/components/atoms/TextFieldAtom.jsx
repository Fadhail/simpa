import { TextField as MuiTextField } from '@mui/material';

export function TextFieldAtom({
    label,
    name,
    value,
    onChange,
    error = false,
    helperText = '',
    type = 'text',
    inputProps = {},
    ...props
}) {
    return (
        <MuiTextField
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            error={error}
            helperText={error ? helperText : ''}
            type={type}
            inputProps={inputProps}
            fullWidth
            {...props}
        />
    );
}
