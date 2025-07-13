import Image from 'next/image';
import Link from 'next/link';

const RestaurantHeader = () => {
  return (
    <div>
      <div>
        <Image
          src="/images/logo.png" // make sure the image is in /public/images/
          alt="logo"
          width={100}
          height={100}
        />
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/login">Login/SignUp</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default RestaurantHeader;
