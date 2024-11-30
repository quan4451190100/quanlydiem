import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function Scores() {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [newScore, setNewScore] = useState({
        MaHocSinh: '',
        MaMonHoc: '',
        MaHocKy: '',
        Diem: '',
        NgayNhapDiem: ''
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

    const fetchScores = async (classId) => {
        try {
            setLoading(true);
            setError('');
            const response = await fetch(`http://localhost:5000/scores?class=${classId}`);
            if (!response.ok) throw new Error('Failed to fetch scores');
            const data = await response.json();
            setScores(data);
        } catch (error) {
            setError('Không thể tải dữ liệu điểm. Vui lòng thử lại sau.');
            console.error('Error fetching scores:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClassChange = (e) => {
        const classId = e.target.value;
        console.log('Selected class ID:', classId);
        setSelectedClass(classId);
        fetchScores(classId); // Gọi hàm fetchScores với lớp đã chọn
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            const response = await fetch('http://localhost:5000/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newScore),
            });
            if (!response.ok) throw new Error('Failed to add score');
            await fetchScores(selectedClass); // Cập nhật danh sách điểm sau khi thêm
            setNewScore({
                MaHocSinh: '',
                MaMonHoc: '',
                MaHocKy: '',
                Diem: '',
                NgayNhapDiem: ''
            });
        } catch (error) {
            setError('Không thể thêm điểm mới. Vui lòng thử lại sau.');
            console.error('Error adding score:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-3xl font-bold text-gray-900">Quản Lý Điểm</h2>
                </div>
                <div className="p-6">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            <p>{error}</p>
                        </div>
                    )}
                    <select name="Lop" value={selectedClass} onChange={handleClassChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4">
                        <option value="">Chọn Lớp</option>
                        {classes.map(cls => (
                            <option key={cls.MaLop} value={cls.MaLop}>{cls.TenLop}</option>
                        ))}
                    </select>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <input type="text" name="MaHocSinh" placeholder="Mã Học Sinh" value={newScore.MaHocSinh} onChange={(e) => setNewScore({ ...newScore, MaHocSinh: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                        <input type="text" name="MaMonHoc" placeholder="Mã Môn Học" value={newScore.MaMonHoc} onChange={(e) => setNewScore({ ...newScore, MaMonHoc: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                        <input type="text" name="MaHocKy" placeholder="Mã Học Kỳ" value={newScore.MaHocKy} onChange={(e) => setNewScore({ ...newScore, MaHocKy: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                        <input type="number" name="Diem" placeholder="Điểm" value={newScore.Diem} onChange={(e) => setNewScore({ ...newScore, Diem: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                        <input type="date" name="NgayNhapDiem" value={newScore.NgayNhapDiem} onChange={(e) => setNewScore({ ...newScore, NgayNhapDiem: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                        <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Thêm Điểm
                        </button>
                    </form>
                    {selectedClass && ( // Kiểm tra xem lớp đã được chọn hay chưa
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3">Tên Học Sinh</th>
                                        <th className="px-6 py-3">Mã Học Sinh</th>
                                        <th className="px-6 py-3">Mã Môn Học</th>
                                        <th className="px-6 py-3">Mã Học Kỳ</th>
                                        <th className="px-6 py-3">Điểm</th>
                                        <th className="px-6 py-3">Ngày Nhập Điểm</th>
                                        <th className="px-6 py-3 text-right">Hành Động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scores.map(score => (
                                        <tr key={score.DiemID} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4">{score.HoTen || 'Chưa có tên'}</td> {/* Hiển thị tên học sinh */}
                                            <td className="px-6 py-4">{score.MaHocSinh}</td>
                                            <td className="px-6 py-4">{score.MaMonHoc}</td>
                                            <td className="px-6 py-4">{score.MaHocKy}</td>
                                            <td className="px-6 py-4">{score.Diem}</td>
                                            <td className="px-6 py-4">{new Date(score.NgayNhapDiem).toLocaleDateString('vi-VN')}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => handleDelete(score.DiemID)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}