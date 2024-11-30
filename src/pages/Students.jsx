import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function Students() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [newStudent, setNewStudent] = useState({
        HoTen: '',
        NgaySinh: '',
        Lop: '',
        GioiTinh: ''
    });
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await fetch('http://localhost:5000/classes');
            if (!response.ok) throw new Error('Failed to fetch classes');
            const data = await response.json();
            setClasses(data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    const fetchStudents = async (classId) => {
        try {
            setLoading(true);
            setError('');
            const response = await fetch(`http://localhost:5000/students?class=${classId}`);
            if (!response.ok) throw new Error('Failed to fetch students');
            const data = await response.json();
            console.log('Fetched students:', data);
            setStudents(data);
        } catch (error) {
            setError('Không thể tải dữ liệu học sinh. Vui lòng thử lại sau.');
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClassChange = (e) => {
        const classId = e.target.value;
        console.log('Selected class ID:', classId);
        setSelectedClass(classId);
        fetchStudents(classId); // Gọi hàm fetchStudents với lớp đã chọn
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            const response = await fetch('http://localhost:5000/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...newStudent,
                    Lop: selectedClass
                }),
            });
            if (!response.ok) throw new Error('Failed to add student');
            await fetchStudents(selectedClass); // Update the student list after adding
            setNewStudent({
                HoTen: '',
                NgaySinh: '',
                Lop: '',
                GioiTinh: ''
            });
        } catch (error) {
            setError('Không thể thêm học sinh. Vui lòng thử lại sau.');
            console.error('Error saving student:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-3xl font-bold text-gray-900">Quản Lý Học Sinh</h2>
                </div>
                <div className="p-6">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            <p>{error}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <select name="Lop" value={selectedClass} onChange={handleClassChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                            <option value="">Chọn Lớp</option>
                            {classes.map(cls => (
                                <option key={cls.MaLop} value={cls.MaLop}>{cls.TenLop}</option>
                            ))}
                        </select>
                        <input type="text" name="HoTen" placeholder="Tên Học Sinh" value={newStudent.HoTen} onChange={(e) => setNewStudent({ ...newStudent, HoTen: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                        <input type="date" name="NgaySinh" value={newStudent.NgaySinh} onChange={(e) => setNewStudent({ ...newStudent, NgaySinh: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                        <select name="GioiTinh" value={newStudent.GioiTinh} onChange={(e) => setNewStudent({ ...newStudent, GioiTinh: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                            <option value="">Chọn Giới Tính</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                        <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Thêm Học Sinh
                        </button>
                    </form>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3">Mã Học Sinh</th>
                                    <th className="px-6 py-3">Tên Học Sinh</th>
                                    <th className="px-6 py-3">Ngày Sinh</th>
                                    <th className="px-6 py-3">Lớp</th>
                                    <th className="px-6 py-3">Giới Tính</th>
                                    <th className="px-6 py-3 text-right">Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student.MaHocSinh} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">{student.MaHocSinh}</td>
                                        <td className="px-6 py-4">{student.HoTen}</td>
                                        <td className="px-6 py-4">{new Date(student.NgaySinh).toLocaleDateString('vi-VN')}</td>
                                        <td className="px-6 py-4">{student.Lop}</td>
                                        <td className="px-6 py-4">{student.GioiTinh}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => handleEdit(student.MaHocSinh)} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                                                Sửa
                                            </button>
                                            <button onClick={() => handleDelete(student.MaHocSinh)} className="ml-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
