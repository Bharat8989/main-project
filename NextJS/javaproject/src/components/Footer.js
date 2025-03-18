"use client"
import Link from "next/link"
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 shadow-lg border-t border-gray-700">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Logo and Tagline */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition-colors duration-200"
            >
              Bharat Kadam
            </Link>
            <p className="text-sm mt-2 text-gray-400">Managed Solutions</p>
          </div>

          {/* Navigation Links */}
          <nav>
            <h6 className="text-lg font-semibold mb-4 text-gray-300">Company</h6>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-purple-400 transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-purple-400 transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-purple-400 transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-400 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-purple-400 transition">
                  Refund
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social Media Icons */}
          <div>
            <h6 className="text-lg font-semibold mb-4 text-gray-300">Follow Us</h6>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition"
                aria-label="Facebook"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition"
                aria-label="Twitter"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          {/* Additional column for balance */}
          <div>
            <h6 className="text-lg font-semibold mb-4 text-gray-300">Resources</h6>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="hover:text-purple-400 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="hover:text-purple-400 transition">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-purple-400 transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Bharat Kadam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

