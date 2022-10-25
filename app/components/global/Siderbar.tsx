import { Category } from "@prisma/client";
import { Link } from "@remix-run/react";

type SidebarProps = {
  categories: Category[];
};

export function Sidebar(props: SidebarProps) {
  return (
    <aside className="flex flex-col gap-2 w-min">
      <ul>
        {props.categories.map((category) => (
          <li key={category.id}>
            <Link
              to={`/category/${category?.name?.toLowerCase()}`}
              className="text-sm text-gray-500 hover:underline hover:text-blue-700 focus-visible:border-4 focus-visible:border-dashed focus-visible:border-blue-700 focus-visible:outline-none"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
