"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathSegments = usePathname().split("/").filter(Boolean);

  return (
    <nav>
      {pathSegments.map((segment, index) => (
        <span key={index}>
          {" > "}
          <Link
            className="hover:underline"
            href={`/${pathSegments.slice(0, index + 1).join("/")}`}
          >
            {segment}
          </Link>
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
