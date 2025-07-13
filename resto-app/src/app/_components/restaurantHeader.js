import Image from 'next/image';
import Link from 'next/link';

const RestaurantHeader = () => {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Image
          src="/images/logo.png" // Put your logo in public/images/logo.png
          alt="logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <span className="text-xl font-bold text-orange-600">Resto App</span>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="flex gap-6 text-gray-700 font-medium">
          <li>
            <Link href="/" className="hover:text-orange-500 transition">Home</Link>
          </li>
          <li>
            <Link href="/restaurant" className="hover:text-orange-500 transition">Login/SignUp</Link>
          </li>
          <li>
            <Link href="/profile" className="hover:text-orange-500 transition">Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default RestaurantHeader;
