import { TextFieldAtom } from "../atoms/TextFieldAtom";
import { SelectAtom } from "../atoms/SelectAtom";
import { DatePickerAtom } from "../atoms/DatePickerAtom";
import { AddressFormGroup } from "../molecules/AddressFormGroup";
import { useState } from "react";

export function PassengerForm({
    initialValues = {},
    onSubmit,
    onCancel,
    isEditing = false,
}) {
    const [formData, setFormData] = useState({
        nik: initialValues.nik || '',
        namaLengkap: initialValues.namaLengkap || '',
        jenisKelamin: initialValues.jenisKelamin || 'Laki-Laki',
        tanggalLahir: initialValues.tanggalLahir || null,
        street: initialValues.street || '',
        district: initialValues.district || '',
        city: initialValues.city || '',
        email: initialValues.email || '',
        telepon: initialValues.telepon || '',
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        
        if (!formData.nik) newErrors.nik = 'NIK wajib diisi';
        if (!formData.namaLengkap) newErrors.namaLengkap = 'Nama lengkap wajib diisi';
        if (!formData.email) newErrors.email = 'Email wajib diisi';
        if (!formData.telepon) newErrors.telepon = 'Telepon wajib diisi';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const genderOptions = [
        { value: 'Laki-Laki', label: 'Laki-Laki' },
        { value: 'Perempuan', label: 'Perempuan' },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <TextFieldAtom
                label="NIK"
                name="nik"
                value={formData.nik}
                onChange={handleInputChange}
                error={!!errors.nik}
                helperText={errors.nik}
                inputProps={{
                    pattern: /^[0-9]*$/,
                    maxLength: 16,
                }}
            />

            <TextFieldAtom
                label="Nama Lengkap"
                name="namaLengkap"
                value={formData.namaLengkap}
                onChange={handleInputChange}
                error={!!errors.namaLengkap}
                helperText={errors.namaLengkap}
            />

            <SelectAtom
                label="Jenis Kelamin"
                name="jenisKelamin"
                value={formData.jenisKelamin}
                onChange={handleInputChange}
                options={genderOptions}
            />

            <DatePickerAtom
                label="Tanggal Lahir"
                name="tanggalLahir"
                value={formData.tanggalLahir}
                onChange={(newValue) => setFormData(prev => ({ ...prev, tanggalLahir: newValue }))}
                error={!!errors.tanggalLahir}
                helperText={errors.tanggalLahir}
            />

            <AddressFormGroup
                street={formData.street}
                onChangeStreet={(e) => handleInputChange(e)}
                district={formData.district}
                onChangeDistrict={(e) => handleInputChange(e)}
                city={formData.city}
                onChangeCity={(e) => handleInputChange(e)}
                error={!!errors.alamat}
                helperText={errors.alamat}
            />

            <TextFieldAtom
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                type="email"
            />

            <TextFieldAtom
                label="Telepon"
                name="telepon"
                value={formData.telepon}
                onChange={handleInputChange}
                error={!!errors.telepon}
                helperText={errors.telepon}
                type="tel"
                inputProps={{
                    pattern: /^[0-9]+$/,
                    maxLength: 15,
                }}
            />

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                    Batal
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    {isEditing ? 'Simpan' : 'Tambah'}
                </button>
            </div>
        </form>
    );
}
