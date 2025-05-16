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
    const [formData, setFormData] = useState(() => {
        const initialTanggalPembelian = initialValues.tanggalPembelian ? new Date(initialValues.tanggalPembelian) : new Date();
        const initialMasaAktif = initialValues.masaAktif ? new Date(initialValues.masaAktif) : new Date(initialTanggalPembelian.getTime() + 90 * 24 * 60 * 60 * 1000); // 90 days from purchase date
        return {
            kodeTiket: initialValues.kodeTiket || '',
            penumpang: {
                id: initialValues.penumpang?.id || '',
                nama: initialValues.penumpang?.nama || ''
            },
            jadwal: {
                id: initialValues.jadwal?.id || '',
                kodePenerbangan: initialValues.jadwal?.kodePenerbangan || ''
            },
            nomorKursi: initialValues.nomorKursi || '',
            tanggalPembelian: initialTanggalPembelian,
            masaAktif: initialMasaAktif,
            harga: initialValues.harga ? parseFloat(initialValues.harga) : 0,
            status: initialValues.status || 'Aktif'
        };
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        
        if (!formData.kodeTiket) newErrors.kodeTiket = 'Kode tiket wajib diisi';
        if (!formData.penumpang.id) newErrors.penumpang = 'Penumpang wajib dipilih';
        if (!formData.jadwal.id) newErrors.jadwal = 'Jadwal wajib dipilih';
        if (!formData.nomorKursi) newErrors.nomorKursi = 'Nomor kursi wajib diisi';
        if (!formData.tanggalPembelian) newErrors.tanggalPembelian = 'Tanggal pembelian wajib diisi';
        if (!formData.masaAktif) newErrors.masaAktif = 'Masa aktif wajib diisi';
        if (formData.harga <= 0) newErrors.harga = 'Harga harus lebih dari 0';
        if (!formData.status) newErrors.status = 'Status wajib diisi';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Format data before submission
            const formattedData = {
                kodeTiket: formData.kodeTiket,
                passengerId: formData.penumpang.id,
                scheduleId: formData.jadwal.id,
                nomorKursi: formData.nomorKursi,
                tanggalPembelian: formData.tanggalPembelian.toISOString(),
                masaAktif: formData.masaAktif.toISOString(),
                harga: formData.harga,
                status: formData.status
            };
            onSubmit(formattedData);
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
                name="penumpang.id"
                value={formData.penumpang.id}
                onChange={(e) => {
                    const passengerId = e.target.value;
                    const selectedPassenger = passengers.find(p => p.id === passengerId);
                    setFormData(prev => ({
                        ...prev,
                        penumpang: {
                            id: passengerId,
                            nama: selectedPassenger ? `${selectedPassenger.namaLengkap.namaDepan} ${selectedPassenger.namaLengkap.namaBelakang}` : ''
                        }
                    }));
                }}
                options={passengers
                    .filter((_, i) => i < 10)
                    .map(passenger => ({
                        value: passenger.id,
                        label: `${passenger.nik} - ${passenger.namaLengkap.namaDepan} ${passenger.namaLengkap.namaBelakang}`
                    }))}
                error={!!errors.penumpang}
                helperText={errors.penumpang}
                searchBy="nik"
                search={(e) => {
                    const searchValue = e.target.value;
                    const filteredPassengers = passengers.filter(passenger => passenger.nik.includes(searchValue));
                    const filteredOptions = filteredPassengers
                        .map(passenger => ({
                            value: passenger.id,
                            label: `${passenger.nik} - ${passenger.namaLengkap.namaDepan} ${passenger.namaLengkap.namaBelakang}`
                        }))
                        .sort((a, b) => a.label.localeCompare(b.label));
                    setOptions(filteredOptions);
                }}
            />

            <SelectAtom
                label="Jadwal Penerbangan"
                name="jadwal.id"
                value={formData.jadwal.id}
                onChange={(e) => {
                    const scheduleId = e.target.value;
                    const selectedSchedule = schedules.find(s => s.id === scheduleId);
                    setFormData(prev => ({
                        ...prev,
                        jadwal: {
                            id: scheduleId,
                            kodePenerbangan: selectedSchedule ? selectedSchedule.kodePenerbangan : ''
                        }
                    }));
                }}
                options={schedules.map(schedule => ({
                    value: schedule.id,
                    label: `${schedule.kodePenerbangan} - ${schedule.asal} ke ${schedule.tujuan}`
                }))}
                error={!!errors.jadwal}
                helperText={errors.jadwal}
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
                onChange={(newValue) => setFormData(prev => ({ 
                    ...prev, 
                    tanggalPembelian: newValue
                }))}
                error={!!errors.tanggalPembelian}
                helperText={errors.tanggalPembelian}
            />

            <DateTimePickerAtom
                label="Masa Aktif"
                name="masaAktif"
                value={formData.masaAktif}
                onChange={(newValue) => setFormData(prev => ({ 
                    ...prev, 
                    masaAktif: newValue
                }))}
                error={!!errors.masaAktif}
                helperText={errors.masaAktif}
            />

            <TextFieldAtom
                label="Harga"
                name="harga"
                value={formData.harga}
                onChange={(e) => {
                    const value = e.target.value;
                    const numericValue = value ? parseFloat(value) : '';
                    setFormData(prev => ({ ...prev, harga: numericValue }));
                }}
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
