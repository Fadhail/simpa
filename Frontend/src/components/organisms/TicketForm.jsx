import { TextFieldAtom } from "../atoms/TextFieldAtom";
import { SelectAtom } from "../atoms/SelectAtom";
import { DateTimePickerAtom } from "../atoms/DateTimePickerAtom";
import { useState } from "react";

export function TicketForm({
    initialValues = {},
    onSubmit,
    onCancel,
    isEditing = false,
    passengers = [],
    schedules = [],
}) {
    const [formData, setFormData] = useState({
        kodeTiket: initialValues.kodeTiket || '',
        passengerId: initialValues.passengerId || '',
        scheduleId: initialValues.scheduleId || '',
        nomorKursi: initialValues.nomorKursi || '',
        tanggalPembelian: initialValues.tanggalPembelian || null,
        masaAktif: initialValues.masaAktif || null,
        harga: initialValues.harga || '',
        status: initialValues.status || 'Aktif',
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        
        if (!formData.kodeTiket) newErrors.kodeTiket = 'Kode tiket wajib diisi';
        if (!formData.passengerId) newErrors.passengerId = 'Penumpang wajib dipilih';
        if (!formData.scheduleId) newErrors.scheduleId = 'Jadwal wajib dipilih';
        if (!formData.nomorKursi) newErrors.nomorKursi = 'Nomor kursi wajib diisi';
        if (!formData.tanggalPembelian) newErrors.tanggalPembelian = 'Tanggal pembelian wajib diisi';
        if (!formData.masaAktif) newErrors.masaAktif = 'Masa aktif wajib diisi';
        if (!formData.harga) newErrors.harga = 'Harga wajib diisi';

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
        { value: 'Aktif', label: 'Aktif' },
        { value: 'Batal', label: 'Batal' },
        { value: 'Digunakan', label: 'Digunakan' },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <TextFieldAtom
                label="Kode Tiket"
                name="kodeTiket"
                value={formData.kodeTiket}
                onChange={handleInputChange}
                error={!!errors.kodeTiket}
                helperText={errors.kodeTiket}
            />

            <SelectAtom
                label="Penumpang"
                name="passengerId"
                value={formData.passengerId}
                onChange={handleInputChange}
                options={passengers.map(passenger => ({
                    value: passenger.id,
                    label: `${passenger.nik} - ${passenger.namaLengkap}`
                }))}
                error={!!errors.passengerId}
                helperText={errors.passengerId}
            />

            <SelectAtom
                label="Jadwal Penerbangan"
                name="scheduleId"
                value={formData.scheduleId}
                onChange={handleInputChange}
                options={schedules.map(schedule => ({
                    value: schedule.id,
                    label: `${schedule.kodePenerbangan} (${schedule.asal} → ${schedule.tujuan})`
                }))}
                error={!!errors.scheduleId}
                helperText={errors.scheduleId}
            />

            <TextFieldAtom
                label="Nomor Kursi"
                name="nomorKursi"
                value={formData.nomorKursi}
                onChange={handleInputChange}
                error={!!errors.nomorKursi}
                helperText={errors.nomorKursi}
            />

            <DateTimePickerAtom
                label="Tanggal Pembelian"
                name="tanggalPembelian"
                value={formData.tanggalPembelian}
                onChange={(newValue) => setFormData(prev => ({ ...prev, tanggalPembelian: newValue }))}
                error={!!errors.tanggalPembelian}
                helperText={errors.tanggalPembelian}
            />

            <DateTimePickerAtom
                label="Masa Aktif"
                name="masaAktif"
                value={formData.masaAktif}
                onChange={(newValue) => setFormData(prev => ({ ...prev, masaAktif: newValue }))}
                error={!!errors.masaAktif}
                helperText={errors.masaAktif}
            />

            <TextFieldAtom
                label="Harga"
                name="harga"
                value={formData.harga}
                onChange={handleInputChange}
                error={!!errors.harga}
                helperText={errors.harga}
                type="number"
                inputProps={{
                    min: 0,
                    step: 1000,
                }}
            />

            <SelectAtom
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                options={statusOptions}
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
