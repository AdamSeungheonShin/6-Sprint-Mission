import Image from "next/image";
import Link from "next/link";
import ProfileDefault from "@/public/images/profile_default.png";

export default function Navigator() {
  return (
    <>
      <nav className="flex-grow flex justify-between items-center">
        <div className="flex-grow flex">
          <Link
            className="w-28 h-16 hover:bg-hover-gray active:bg-active-gray flex justify-center items-center"
            href="/boards"
          >
            Boards
          </Link>
          <Link
            className="w-28 h-16 hover:bg-hover-gray active:bg-active-gray flex justify-center items-center"
            href="/"
          >
            Market
          </Link>
        </div>
        <Link href="/">
          <Image src={ProfileDefault} alt="testImage" width={40} height={40} />
        </Link>
      </nav>
    </>
  );
}
