import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export function SelectAtom({
    label,
    name,
    value,
    onChange,
    options = [],
    error = false,
    helperText = '',
    ...props
}) {
    return (
        <FormControl fullWidth error={error}>
            <InputLabel>{label}</InputLabel>
            <Select
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                {...props}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            {error && <div className="text-red-500 text-sm">{helperText}</div>}
        </FormControl>
    );
}
