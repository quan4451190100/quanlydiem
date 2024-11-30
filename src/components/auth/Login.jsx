import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const [formData, setFormData] = useState({
    TenDangNhap: '',
    MatKhau: '',
    remember: false
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          TenDangNhap: formData.TenDangNhap,
          MatKhau: formData.MatKhau,
        }),
      });

      if (!response.ok) {
        throw new Error('Đăng nhập không thành công');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      
      // Lưu vai trò của người dùng vào local storage
      localStorage.setItem('userRole', data.user.VaiTro);
      navigate('/');
    } catch (error) {
      setError(error.message);
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-8">Đăng Nhập</h2>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Tên đăng nhập</label>
            <div className="relative">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Nhập tên đăng nhập"
                value={formData.TenDangNhap}
                onChange={(e) => setFormData({...formData, TenDangNhap: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Mật khẩu</label>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="••••••••"
                value={formData.MatKhau}
                onChange={(e) => setFormData({...formData, MatKhau: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary focus:ring-primary"
                checked={formData.remember}
                onChange={(e) => setFormData({...formData, remember: e.target.checked})}
              />
              <span className="ml-2 text-sm text-gray-600">Ghi nhớ đăng nhập</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-primary hover:text-secondary">
              Quên mật khẩu?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition-colors"
          >
            Đăng Nhập
          </button>
        </form>
      </div>
    </div>
  );
}
