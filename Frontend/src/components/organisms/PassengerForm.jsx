import { TextFieldAtom } from "../atoms/TextFieldAtom";
import { SelectAtom } from "../atoms/SelectAtom";
import { DatePickerAtom } from "../atoms/DatePickerAtom";
import { AlamatFormGroup } from "../molecules/AlamatFormGroup";
import { useState } from "react";

export function PassengerForm({
    initialValues = {},
    onSubmit,
    onCancel,
    isEditing = false,
}) {
    const [formData, setFormData] = useState(() => {
        const initialDate = initialValues.tanggalLahir ? new Date(initialValues.tanggalLahir) : new Date();
        return {
            nik: initialValues.nik || '',
            namaLengkap: {
                namaDepan: initialValues.namaLengkap?.namaDepan || '',
                namaBelakang: initialValues.namaLengkap?.namaBelakang || ''
            },
            jenisKelamin: initialValues.jenisKelamin || '',
            tanggalLahir: initialDate,
            alamat: {
                jalan: initialValues.alamat?.jalan || '',
                kelurahan: initialValues.alamat?.kelurahan || '',
                kota: initialValues.alamat?.kota || ''
            },
            email: initialValues.email || '',
            telepon: initialValues.telepon || ''
        };
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        
        if (!formData.nik) newErrors.nik = 'NIK wajib diisi';
        if (!formData.namaLengkap.namaDepan) newErrors.namaDepan = 'Nama Depan wajib diisi';
        if (!formData.namaLengkap.namaBelakang) newErrors.namaBelakang = 'Nama Belakang wajib diisi';
        if (!formData.email) newErrors.email = 'Email wajib diisi';
        if (!formData.telepon) newErrors.telepon = 'Telepon wajib diisi';
        if (!formData.tanggalLahir) newErrors.tanggalLahir = 'Tanggal Lahir wajib diisi';
        if (!formData.jenisKelamin) newErrors.jenisKelamin = 'Jenis Kelamin wajib diisi';
        if (!formData.alamat.jalan) newErrors.alamat = 'Alamat jalan wajib diisi';
        if (!formData.alamat.kelurahan) newErrors.alamat = 'Kelurahan wajib diisi';
        if (!formData.alamat.kota) newErrors.alamat = 'Kota wajib diisi';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const formattedData = {
                nik: formData.nik,
                namaLengkap: {
                    namaDepan: formData.namaLengkap?.namaDepan || '',
                    namaBelakang: formData.namaLengkap?.namaBelakang || ''
                },
                jenisKelamin: formData.jenisKelamin || '',
                tanggalLahir: formData.tanggalLahir ? formData.tanggalLahir.toISOString().split('T')[0] : '',
                alamat: {
                    jalan: formData.alamat?.jalan || '',
                    kelurahan: formData.alamat?.kelurahan || '',
                    kota: formData.alamat?.kota || ''
                },
                email: formData.email || '',
                telepon: formData.telepon || ''
            };
            onSubmit(formattedData);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const nameParts = name.split('.');
        
        if (nameParts.length === 2) {
            const [parent, child] = nameParts;
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
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
                    pattern: "^[0-9]{16}$",
                    maxLength: 16,
                }}
            />

            <TextFieldAtom
                label="Nama Depan"
                name="namaLengkap.namaDepan"
                value={formData.namaLengkap.namaDepan}
                onChange={handleInputChange}
                error={!!errors.namaDepan}
                helperText={errors.namaDepan}
            />

            <TextFieldAtom
                label="Nama Belakang"
                name="namaLengkap.namaBelakang"
                value={formData.namaLengkap.namaBelakang}
                onChange={handleInputChange}
                error={!!errors.namaBelakang}
                helperText={errors.namaBelakang}
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
                onChange={(newValue) => {
                    handleInputChange({ target: { name: 'tanggalLahir', value: newValue } });
                }}
                error={!!errors.tanggalLahir}
                helperText={errors.tanggalLahir}
                format="dd/MM/yyyy"
            />
            
            <AlamatFormGroup
                jalan={formData.alamat.jalan}
                onChangeJalan={(e) => handleInputChange({ target: { name: 'alamat.jalan', value: e.target.value } })}
                kelurahan={formData.alamat.kelurahan}
                onChangeKelurahan={(e) => handleInputChange({ target: { name: 'alamat.kelurahan', value: e.target.value } })}
                kota={formData.alamat.kota}
                onChangeKota={(e) => handleInputChange({ target: { name: 'alamat.kota', value: e.target.value } })}
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
                    pattern: "^[0-9]{10,}$",
                    minLength: 10,
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
