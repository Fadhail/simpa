import { TextFieldAtom } from "../atoms/TextFieldAtom";

export function AddressFormGroup({
    street,
    onChangeStreet,
    district,
    onChangeDistrict,
    city,
    onChangeCity,
    error = false,
    helperText = '',
}) {
    return (
        <div className="space-y-4">
            <TextFieldAtom
                label="Jalan"
                name="street"
                value={street}
                onChange={onChangeStreet}
                error={error}
                helperText={helperText}
            />
            <TextFieldAtom
                label="Kelurahan/Kecamatan"
                name="district"
                value={district}
                onChange={onChangeDistrict}
                error={error}
                helperText={helperText}
            />
            <TextFieldAtom
                label="Kota"
                name="city"
                value={city}
                onChange={onChangeCity}
                error={error}
                helperText={helperText}
            />
        </div>
    );
}
