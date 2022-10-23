import type { Profile, User } from "@prisma/client";
import { Link } from "@remix-run/react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";

export type NavbarProps = {
  user?: Profile;
};

export function Navbar(props: NavbarProps) {
  console.log(props.user);
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
            <Menu as="div" className="relative">
              {({ open }) => (
                <>
                  <Menu.Button className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 font-bold bg-orange-200 rounded-full">
                      D
                    </div>
                    <ChevronDownIcon
                      className={`w-5 h-5 duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 p-1 mt-2 text-sm bg-white border-2 border-gray-200 rounded-sm shadow-lg">
                    {[
                      { label: "Account", path: "/account" },
                      { label: "Leaderboard", path: "/leaderboard" },
                      { label: "Logout", path: "/logout" },
                    ].map(({ label, path }) => (
                      <Menu.Item key={JSON.stringify({ label, path })}>
                        <Link
                          to={path}
                          className="px-5 py-2 min-w-[200px] block hover:bg-blue-100 hover:text-blue-900 rounded-sm"
                        >
                          {label}
                        </Link>
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </>
              )}
            </Menu>
          </li>
        </ul>
      </nav>
    </header>
  );
}
