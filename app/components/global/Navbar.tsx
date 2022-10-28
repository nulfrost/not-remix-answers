import type { Profile } from "@prisma/client";
import { Link, useSubmit } from "@remix-run/react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";

export type NavbarProps = {
  user?: Profile;
};

export function Navbar(props: NavbarProps) {
  const submit = useSubmit();
  return (
    <header className="px-2 bg-white border-b border-gray-200 xl:px-0">
      <nav className="flex items-center justify-between py-2 mx-auto max-w-7xl">
        <Link to="/" className="font-bold ">
          Not Remix Answers
        </Link>
        {props?.user ? (
          <ul className="flex items-center gap-5">
            <li>
              <Link
                to="/posts/new"
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
                      {props?.user?.photo ? (
                        <img
                          className="w-8 h-8 rounded-full"
                          src={props?.user?.photo}
                          alt={`${props?.user?.first_name}'s profile photo`}
                        />
                      ) : (
                        <div className="flex items-center justify-center w-8 h-8 font-bold bg-orange-200 rounded-full">
                          {props?.user?.first_name.split("").at(0)}
                        </div>
                      )}
                      <ChevronDownIcon
                        className={`w-5 h-5 duration-300 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 p-1 mt-2 text-sm bg-white border-2 border-gray-200 rounded-sm shadow-lg min-w-[200px]">
                      {[
                        { label: "My Posts", path: "/posts" },
                        { label: "Account", path: "/account" },
                        { label: "Leaderboard", path: "/leaderboard" },
                      ].map(({ label, path }) => (
                        <Menu.Item key={JSON.stringify({ label, path })}>
                          <Link
                            to={path}
                            className="block px-5 py-2 rounded-sm hover:bg-blue-100 hover:text-blue-900"
                          >
                            {label}
                          </Link>
                        </Menu.Item>
                      ))}
                      <Menu.Item
                        as="button"
                        onClick={() =>
                          submit(null, { method: "post", action: "/logout" })
                        }
                        className="w-full px-5 py-2 text-left border-t border-gray-100 rounded-sm hover:bg-blue-100 hover:text-blue-900"
                      >
                        Logout
                      </Menu.Item>
                    </Menu.Items>
                  </>
                )}
              </Menu>
            </li>
          </ul>
        ) : (
          <Link
            to="/login"
            className="py-2 text-sm font-bold text-white duration-150 bg-blue-500 rounded-md px-7 hover:bg-blue-600"
          >
            Log in
          </Link>
        )}
      </nav>
    </header>
  );
}
