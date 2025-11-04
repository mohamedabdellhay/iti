import Links from "./Links";
import Logo from "./Logo";

export default function Header() {
  return (
    <>
      <div class="flex flex-wrap justify-between items-center mt-3 mb-3 dark:bg-gray-800">
        <Logo />
        <Links />
      </div>
    </>
  );
}
