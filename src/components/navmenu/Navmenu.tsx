"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Separator } from "../ui/separator";
import Breadcrumb from "./BreadCrumb";
import { useQuery } from "react-query";
import axios from "axios";
import { categoryArray, urlImage } from "@/lib/globalvar";

function Navmenu() {
  const pathname = usePathname();

  const { data, isLoading } = useQuery({
    queryKey: ["adminpost"],
    queryFn: async () => {
      const response = await axios.get("/api/post");
      return response.data;
    },
  });

  return (
    <>
      <NavigationMenu className="mx-auto w-full sticky top-10 bg-inherit">
        <NavigationMenuList className="flex-wrap">
          {categoryArray.map((item) => {
            return (
              <NavigationMenuItem key={item}>
                <NavigationMenuTrigger className="text-xs uppercase hover:underline hover:text-primary">
                  {item}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="mx-auto w-full border-t-8 border-t-primary">
                  <ul className="md:max-w-3xl lg:max-w-6xl w-screen mx-auto grid p-6 md:grid-cols-4 lg:grid-cols-5 grid-cols-2">
                    {data
                      ? data
                          .filter((datamenu: PostWithUser) => {
                            return datamenu.category === item;
                          })
                          .map((item: PostWithUser) => {
                            return (
                              <ListItem
                                title={item.title}
                                source={item.source}
                                key={item.id}
                                href={
                                  "/" +
                                  item.category +
                                  "/" +
                                  item.title.split(" ").join("-")
                                }
                              />
                            );
                          })
                      : ""}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="px-3">
        <Separator className="mb-8 max-w-7xl mx-auto" />

        {pathname === "/" ? (
          ""
        ) : (
          <div className="flex items-center text-xs my-4 w-full max-w-2xl mx-auto">
            <Link href={"/"} className="flex items-center me-1">
              <Home className="w-4 h-4" />
            </Link>
            <Breadcrumb />
          </div>
        )}
      </div>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { source: string }
>(({ className, title, children, source, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className={cn(
            "duration-300 transition-all hover:text-primary block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none hover:bg-accent focus:bg-accent",
            className
          )}
          href={props.href ?? "/"}
          {...props}
        >
          <div className="flex items-center flex-col w-full">
            <Image
              src={urlImage + source ?? ""}
              width={200}
              height={200}
              alt={title ?? ""}
              className="w-full aspect-video object-cover"
            />
            <span className="py-3 bg-zinc-600 w-full text-white text-center text-xs">
              {title?.toUpperCase()}
            </span>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";

export default Navmenu;
