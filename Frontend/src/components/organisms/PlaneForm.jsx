import { TextFieldAtom } from "../atoms/TextFieldAtom";
import { SelectAtom } from "../atoms/SelectAtom";
import { DatePickerAtom } from "../atoms/DatePickerAtom";
import { DateTimePickerAtom } from "../atoms/DateTimePickerAtom";
import { useState } from "react";

export function PlaneForm({
    initialValues = {},
    onSubmit,
    onCancel,
    isEditing = false,
}) {
    const [formData, setFormData] = useState({
        kodePesawat: initialValues.kodePesawat || '',
        namaMaskapai: initialValues.namaMaskapai || '',
        tipePesawat: initialValues.tipePesawat || '',
        kapasitas: initialValues.kapasitas || '',
        tahunProduksi: initialValues.tahunProduksi || null,
        status: initialValues.status || 'Aktif',
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        
        if (!formData.kodePesawat) newErrors.kodePesawat = 'Kode pesawat wajib diisi';
        if (!formData.namaMaskapai) newErrors.namaMaskapai = 'Nama maskapai wajib diisi';
        if (!formData.tipePesawat) newErrors.tipePesawat = 'Tipe pesawat wajib diisi';
        if (!formData.kapasitas) newErrors.kapasitas = 'Kapasitas wajib diisi';
        if (!formData.tahunProduksi) newErrors.tahunProduksi = 'Tahun produksi wajib diisi';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Convert kapasitas and tahunProduksi to integers
            const formattedData = {
                kodePesawat: formData.kodePesawat,
                namaMaskapai: formData.namaMaskapai,
                tipePesawat: formData.tipePesawat,
                kapasitas: parseInt(formData.kapasitas, 10),
                tahunProduksi: parseInt(formData.tahunProduksi, 10),
                status: formData.status
            };
            onSubmit(formattedData);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        let finalValue = value;
        if (name === 'kapasitas' || name === 'tahunProduksi') {
            const parsed = parseInt(value, 10);
            if (!isNaN(parsed)) {
                finalValue = parsed;
            }
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: finalValue
        }));
    };

    const handleDateChange = (date) => {
        const year = date ? date.getFullYear() : null;
        handleInputChange({ target: { name: 'tahunProduksi', value: year } });
    };

    const statusOptions = [
        { value: 'Aktif', label: 'Aktif' },
        { value: 'Perawatan', label: 'Perawatan' },
        { value: 'Nonaktif', label: 'Nonaktif' },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <TextFieldAtom
                label="Kode Pesawat"
                name="kodePesawat"
                value={formData.kodePesawat}
                onChange={(e) => handleInputChange(e)}
                error={!!errors.kodePesawat}
                helperText={errors.kodePesawat}
            />
            
            <TextFieldAtom
                label="Nama Maskapai"
                name="namaMaskapai"
                value={formData.namaMaskapai}
                onChange={(e) => handleInputChange(e)}
                error={!!errors.namaMaskapai}
                helperText={errors.namaMaskapai}
            />

            <TextFieldAtom
                label="Tipe Pesawat"
                name="tipePesawat"
                value={formData.tipePesawat}
                onChange={(e) => handleInputChange(e)}
                error={!!errors.tipePesawat}
                helperText={errors.tipePesawat}
            />

            <TextFieldAtom
                label="Kapasitas"
                name="kapasitas"
                value={formData.kapasitas}
                onChange={(e) => handleInputChange(e)}
                error={!!errors.kapasitas}
                helperText={errors.kapasitas}
                type="number"
                inputProps={{
                    min: 0,
                    max: 1000,
                    step: 1,
                }}
            />

            <DatePickerAtom
                label="Tahun Produksi"
                name="tahunProduksi"
                value={formData.tahunProduksi ? new Date(formData.tahunProduksi, 0, 1) : null}
                onChange={handleDateChange}
                error={!!errors.tahunProduksi}
                helperText={errors.tahunProduksi}
                views={['year']}
                format="yyyy"
                minDate={new Date(1900, 0, 1)}
                maxDate={new Date()}
                disableFuture
            />

            <SelectAtom
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                options={statusOptions}
                error={!!errors.status}
                helperText={errors.status}
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
