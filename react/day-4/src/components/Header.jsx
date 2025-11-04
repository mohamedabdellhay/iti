import { useState } from "react";
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router";
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              ShopFlow
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/products"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Products
            </Link>
            <Link
              to="/deals"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Deals
            </Link>
            <Link
              to="/new"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              New
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-indigo-600"
            >
              <ShoppingCart size={24} />
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>

            {/* User Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
              >
                <User size={24} />
                <ChevronDown size={16} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                  <a
                    href="/account"
                    className="block px-4 py-2 hover:bg-gray-50"
                  >
                    My Account
                  </a>
                  <a
                    href="/orders"
                    className="block px-4 py-2 hover:bg-gray-50"
                  >
                    Orders
                  </a>
                  <a
                    href="/wishlist"
                    className="block px-4 py-2 hover:bg-gray-50"
                  >
                    Wishlist
                  </a>
                  <hr className="my-1" />
                  <a
                    href="/login"
                    className="block px-4 py-2 text-red-600 hover:bg-gray-50"
                  >
                    Sign Out
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200 mt-4">
            <div className="pt-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
              />
            </div>
            <nav className="space-y-3">
              <a
                href="/categories"
                className="block text-lg font-medium text-gray-700"
              >
                Categories
              </a>
              <a
                href="/deals"
                className="block text-lg font-medium text-gray-700"
              >
                Deals
              </a>
              <a
                href="/new"
                className="block text-lg font-medium text-gray-700"
              >
                New
              </a>
              <a
                href="/account"
                className="block text-lg font-medium text-gray-700"
              >
                My Account
              </a>
              <a
                href="/orders"
                className="block text-lg font-medium text-gray-700"
              >
                Orders
              </a>
              <a
                href="/cart"
                className="block text-lg font-medium text-indigo-600"
              >
                Cart (3)
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
