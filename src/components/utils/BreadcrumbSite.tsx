"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { ChevronRight, Home } from "lucide-react";

export default function BreadcrumbSite() {
  const _pathname = usePathname();
  const pathname = _pathname?.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem key={"home"}>
          <BreadcrumbLink className="flex items-center gap-1" href="/">
            <Home size={16} /> Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathname && pathname.length > 0 && (
          <BreadcrumbSeparator>
            <ChevronRight />
          </BreadcrumbSeparator>
        )}
        {pathname?.map((path, index) => (
          <>
            <BreadcrumbItem key={index}>
              <BreadcrumbLink
                href={`/${pathname.slice(0, index + 1).join("/")}`}
              >
                {isPrismaId(path) ? formatId(path) : path}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < pathname.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronRight />
              </BreadcrumbSeparator>
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

const isPrismaId = (id: string): boolean => {
  // Regular expression to match URL-friendly strings of exactly 25 characters.
  const regex = /^[\w-]{25}$/;
  return regex.test(id);
};

export const formatId = (id: string) => {
  return `${id.slice(0, 2)}...${id.slice(-2)}`;
};
