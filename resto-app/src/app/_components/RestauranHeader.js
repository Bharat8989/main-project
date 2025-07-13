import Link from "next/link";
const RestaurantHeader = () => {
  return (
    <div>
      <div>
        <image
          src="https://resto.000webhostapp.com/img/logo.png"
          alt="logo"
          width="10 0px"
        ></image>
      </div>
      <ul>
        <li>
            <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
            <Link href="/">
            <a>Login/SignUp</a>
          </Link>
        </li>
        <li>
            <Link href="/">
            <a>Profile</a>
          </Link>
        </li>

      </ul>
    </div>
  );
};