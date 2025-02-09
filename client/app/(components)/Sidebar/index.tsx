"use client"; // ✅ Required for Next.js client components

import { Archive, CircleDollarSign, Clipboard, Layout, Menu, SlidersHorizontal, User } from "lucide-react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux";
import { setIsSidebarCollapsed } from "../../state";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        } hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-white" : ""
        }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span className={`${isCollapsed ? "hidden" : "block"} font-medium text-gray-700`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 px-4 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
                    <Image
                      src="https://s3-inventorymanagement003.s3.ap-south-1.amazonaws.com/logo.png" // Added `https://` for absolute URL
                      alt="rudstock-logo"
                      width={27}
                      height={27}
                      className="rounded w-8"
                    />
        <h1 className={`${isSidebarCollapsed ? "hidden" : "font-extrabold text-2xl"}`}>
          RUDSTOCK
        </h1>

        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">
        <SidebarLink key="dashboard" href="/dashboard" icon={Layout} label="Dashboard" isCollapsed={isSidebarCollapsed} />
        <SidebarLink key="inventory" href="/inventory" icon={Archive} label="Inventory" isCollapsed={isSidebarCollapsed} />
        <SidebarLink key="products" href="/products" icon={Clipboard} label="Products" isCollapsed={isSidebarCollapsed} />
        <SidebarLink key="users" href="/users" icon={User} label="Users" isCollapsed={isSidebarCollapsed} />
        <SidebarLink key="settings" href="/settings" icon={SlidersHorizontal} label="Settings" isCollapsed={isSidebarCollapsed} />
        <SidebarLink key="expenses" href="/expenses" icon={CircleDollarSign} label="Expenses" isCollapsed={isSidebarCollapsed} />
      </div>

      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">&copy; 2025 Rudstock</p>
      </div>
    </div>
  );
};

export default Sidebar;

