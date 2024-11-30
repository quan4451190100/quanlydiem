import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Về Quản Lý</h3>
            <p className="text-gray-400">
              Nền tảng giúp quản lý điểm số và thông tin học tập một cách hiệu quả.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/manage-scores" className="text-gray-400 hover:text-white">
                  Quản lý điểm
                </Link>
              </li>
              <li>
                <Link to="/manage-students" className="text-gray-400 hover:text-white">
                  Quản lý học sinh
                </Link>
              </li>
              <li>
                <Link to="/reports" className="text-gray-400 hover:text-white">
                  Báo cáo
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  Về Chúng Tôi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: contact@quanlydiem.com</li>
              <li>Phone: (84) 123 456 789</li>
              <li>Address: 123 ABC Street, XYZ City</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Quản Lý Điểm. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};