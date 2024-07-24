import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <div className="w-[90px] h-auto">
        <img
          src="/images/tmdbflix_logo.png"
          alt="TBDBFLIX LOGO"
          className="w-full"
        />
      </div>
    </Link>
  );
}
