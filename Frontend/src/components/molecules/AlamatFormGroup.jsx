import { TextFieldAtom } from "../atoms/TextFieldAtom";

export function AlamatFormGroup({
    jalan,
    onChangeJalan,
    kelurahan,
    onChangeKelurahan,
    kota,
    onChangeKota,
    error = false,
    helperText = '',
}) {
    return (
        <div className="space-y-4">
            <TextFieldAtom
                label="Jalan"
                name="jalan"
                value={jalan}
                onChange={onChangeJalan}
                error={error}
                helperText={helperText}
            />
            <TextFieldAtom
                label="Kelurahan/Kecamatan"
                name="kelurahan"
                value={kelurahan}
                onChange={onChangeKelurahan}
                error={error}
                helperText={helperText}
            />
            <TextFieldAtom
                label="Kota"
                name="kota"
                value={kota}
                onChange={onChangeKota}
                error={error}
                helperText={helperText}
            />
        </div>
    );
}
