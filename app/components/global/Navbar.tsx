import { Profile } from "@prisma/client";
import { Link } from "@remix-run/react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";

export type NavbarProps = {
  user?: Profile;
};

export function Navbar(props: NavbarProps) {
  return (
    <header>
      <nav className="flex items-center justify-between px-5 py-7">
        <Link to="/">Not Remix Answers</Link>
        <ul className="flex items-center gap-5">
          <li>
            <Link
              to="/create"
              className="flex gap-1 px-3 py-2 text-sm text-white duration-150 bg-blue-500 rounded-md hover:bg-blue-600"
            >
              <PlusIcon className="inline-block w-5 h-5" />
              Post new question
            </Link>
          </li>
          <li>
            <Menu>
              <Menu.Button className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 font-bold bg-orange-200 rounded-full">
                  D
                </div>
                <ChevronDownIcon className="w-5 h-5" />
              </Menu.Button>
              <Menu.Items>
                <Menu.Items>Account</Menu.Items>
                <Menu.Items>Log out</Menu.Items>
              </Menu.Items>
            </Menu>
          </li>
        </ul>
      </nav>
    </header>
  );
}
