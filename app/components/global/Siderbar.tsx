import { Category } from "@prisma/client";
import { Link } from "@remix-run/react";

type SidebarProps = {
  categories: Category[];
};

export function Sidebar(props: SidebarProps) {
  return (
    <aside className="flex-[0_0_15%]">
      <h1 className="text-lg font-bold">All Categories</h1>
      <nav>
        <ul className="space-y-2">
          {props.categories.map((category) => (
            <li key={category.id}>
              <Link
                to={`/category/${category?.name?.toLowerCase()}`}
                className="inline-block text-sm text-gray-600 capitalize hover:underline hover:text-blue-700 focus-visible:outline-4 focus-visible:outline-dashed focus-visible:outline-blue-700"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
