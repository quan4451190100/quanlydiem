import { useState, useEffect } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function Reports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [newReport, setNewReport] = useState({
        title: '',
        content: '',
    });

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await fetch('/reports'); // Adjust this endpoint if needed
            if (!response.ok) throw new Error('Failed to fetch reports');
            const data = await response.json();
            setReports(data);
        } catch (error) {
            setError('Không thể tải dữ liệu báo cáo. Vui lòng thử lại sau.');
            console.error('Error fetching reports:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setNewReport({ ...newReport, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            const response = await fetch('/reports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReport),
            });
            if (!response.ok) throw new Error('Failed to create report');
            await fetchReports();
            setNewReport({ title: '', content: '' });
        } catch (error) {
            setError('Không thể tạo báo cáo. Vui lòng thử lại sau.');
            console.error('Error creating report:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-3xl font-bold text-gray-900">Quản Lý Báo Cáo</h2>
                </div>
                <div className="p-6">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            <p>{error}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <input type="text" name="title" placeholder="Tiêu đề" value={newReport.title} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                        <textarea name="content" placeholder="Nội dung" value={newReport.content} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                        <button type="submit" disabled={loading} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Tạo Báo Cáo
                        </button>
                    </form>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3">Tiêu Đề</th>
                                    <th className="px-6 py-3">Nội Dung</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map(report => (
                                    <tr key={report.MaBaoCao} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">{report.title}</td>
                                        <td className="px-6 py-4">{report.content}</td>
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
