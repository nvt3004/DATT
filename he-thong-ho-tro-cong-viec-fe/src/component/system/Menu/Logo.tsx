import logo from "../img/Logo2.png";
import Image from "next/image";

function Logo() {
  return (
    <>
      <Image
        src={logo}
        width={100}
        height={100}
        alt="Picture of the author"
      />
    </>
  );
}

export default Logo;
