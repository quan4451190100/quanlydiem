import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            Quản Lý
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/scores" className="text-gray-600 hover:text-primary">
              Quản Lý Điểm
            </Link>
            <Link to="/students" className="text-gray-600 hover:text-primary">
              Quản Lý Học Sinh
            </Link>
            <Link to="/reports" className="text-gray-600 hover:text-primary">
              Báo Cáo
            </Link>
            <Link 
              to="/login"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary"
            >
              Đăng Nhập
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link to="/scores" className="block text-gray-600 hover:text-primary">
              Quản Lý Điểm
            </Link>
            <Link to="/students" className="block text-gray-600 hover:text-primary">
              Quản Lý Học Sinh
            </Link>
            <Link to="/reports" className="block text-gray-600 hover:text-primary">
              Báo Cáo
            </Link>
            <Link 
              to="/login"
              className="block px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary text-center"
            >
              Đăng Nhập
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}