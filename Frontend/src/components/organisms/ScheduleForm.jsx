import { TextFieldAtom } from "../atoms/TextFieldAtom";
import { SelectAtom } from "../atoms/SelectAtom";
import { DateTimePickerAtom } from "../atoms/DateTimePickerAtom";
import { useState } from "react";

export function ScheduleForm({
    initialValues = {},
    onSubmit,
    onCancel,
    isEditing = false,
    planes = [],
}) {
    const [formData, setFormData] = useState({
        kodePenerbangan: initialValues.kodePenerbangan || '',
        planeId: initialValues.planeId || '',
        asal: initialValues.asal || '',
        tujuan: initialValues.tujuan || '',
        waktuBerangkat: initialValues.waktuBerangkat ? new Date(initialValues.waktuBerangkat) : new Date(),
        waktuTiba: initialValues.waktuTiba ? new Date(initialValues.waktuTiba) : null,
        status: initialValues.status || 'Terjadwal',
        hargaTiket: initialValues.hargaTiket ? parseFloat(initialValues.hargaTiket) : '',
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!formData.kodePenerbangan) newErrors.kodePenerbangan = 'Kode penerbangan wajib diisi';
        if (!formData.planeId) newErrors.planeId = 'Pesawat wajib dipilih';
        if (!formData.asal) newErrors.asal = 'Asal wajib diisi';
        if (!formData.tujuan) newErrors.tujuan = 'Tujuan wajib diisi';
        if (!formData.waktuBerangkat) newErrors.waktuBerangkat = 'Waktu berangkat wajib diisi';
        if (!formData.waktuTiba) newErrors.waktuTiba = 'Waktu tiba wajib diisi';
        if (!formData.hargaTiket || isNaN(formData.hargaTiket)) newErrors.hargaTiket = 'Harga tiket wajib diisi dengan angka';

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

    const statusOptions = [
        { value: 'Terjadwal', label: 'Terjadwal' },
        { value: 'Delay', label: 'Delay' },
        { value: 'Dibatalkan', label: 'Dibatalkan' },
        { value: 'Selesai', label: 'Selesai' },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <TextFieldAtom
                label="Kode Penerbangan"
                name="kodePenerbangan"
                value={formData.kodePenerbangan}
                onChange={handleInputChange}
                error={!!errors.kodePenerbangan}
                helperText={errors.kodePenerbangan}
            />

            <SelectAtom
                label="Pesawat"
                name="planeId"
                value={formData.planeId}
                onChange={handleInputChange}
                options={planes.map(plane => ({
                    value: plane.id,
                    label: `${plane.kodePesawat} - ${plane.namaMaskapai}`
                }))}
                error={!!errors.planeId}
                helperText={errors.planeId}
            />

            <TextFieldAtom
                label="Asal"
                name="asal"
                value={formData.asal}
                onChange={handleInputChange}
                error={!!errors.asal}
                helperText={errors.asal}
            />

            <TextFieldAtom
                label="Tujuan"
                name="tujuan"
                value={formData.tujuan}
                onChange={handleInputChange}
                error={!!errors.tujuan}
                helperText={errors.tujuan}
            />

            <DateTimePickerAtom
                label="Waktu Berangkat"
                name="waktuBerangkat"
                value={formData.waktuBerangkat ? new Date(formData.waktuBerangkat) : null}
                onChange={(newValue) => setFormData(prev => ({ ...prev, waktuBerangkat: newValue.toISOString() }))}
                error={!!errors.waktuBerangkat}
                helperText={errors.waktuBerangkat}
            />

            <DateTimePickerAtom
                label="Waktu Tiba"
                name="waktuTiba"
                value={formData.waktuTiba ? new Date(formData.waktuTiba) : null}
                onChange={(newValue) => setFormData(prev => ({ ...prev, waktuTiba: newValue.toISOString() }))}
                error={!!errors.waktuTiba}
                helperText={errors.waktuTiba}
            />

            <SelectAtom
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                options={statusOptions}
            />

            <TextFieldAtom
                label="Harga Tiket"
                name="hargaTiket"
                value={formData.hargaTiket}
                onChange={(e) => {
                    const value = e.target.value;
                    const numericValue = value ? parseFloat(value) : '';
                    setFormData(prev => ({ ...prev, hargaTiket: numericValue }));
                }}
                error={!!errors.hargaTiket}
                helperText={errors.hargaTiket}
                type="number"
                inputProps={{
                    min: 0,
                    step: 1000,
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
