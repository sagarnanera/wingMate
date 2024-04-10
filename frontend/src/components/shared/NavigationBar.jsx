import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  Dropdown,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  Sidebar,
  ToggleSwitch,
} from "flowbite-react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
  HiOutlineArrowCircleRight,
  HiOutlineOfficeBuilding,
  HiMenuAlt4,
} from "react-icons/hi";
import {
  MdOutlineEvent,
  MdBookOnline,
  MdNaturePeople,
  MdOutlinePeople,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../actions/authAction";

const NavigationBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // to determine the active tab of the navigation
  // const [activeTab, setActiveTab] = useState("Dashboard");

  const dispatch = useDispatch();

  const location = useLocation();

  const { user } = useSelector((state) => state.user);
  const { society } = useSelector((state) => state.society);

  const sidebarItems = [
    // {
    //   title: "Dashboard",
    //   icon: HiOutlineOfficeBuilding,
    //   href: "#",
    // },
    // {
    //   title: "Requests",
    //   icon: HiViewBoards,
    //   href: "/requests",
    // },
    {
      title: "Wings",
      icon: HiInbox,
      href: "/wings",
    },
    {
      title: "Society details",
      icon: HiUser,
      href: "/society",
    },
    {
      title: "Bookings",
      icon: MdBookOnline,
      href: "/bookings",
    },
    {
      title: "Events",
      icon: MdOutlineEvent,
      href: "/events",
    },
    {
      title: "Residents",
      icon: MdOutlinePeople,
      href: "/residents",
    },
    {
      title: "Properties",
      icon: MdNaturePeople,
      href: "/properties",
    },
  ];

  // const societyName =
  //   "Gokuldham society fsadfdsafasdffdasnldsflkamdsfkasndflkmasflkm";
  // const societyLogo = 0;

  return (
    <>
      <Sidebar
        id="logo-sidebar"
        className={`fixed top-0 left-0 pt-16 w-64 z-20 h-screen transition-transform bg-slate-300 border-r border-gray-200 sm:translate-x-0 shadow-lg ${
          sidebarOpen ? "" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
        theme={{
          root: {
            inner: "h-full rounded bg-slate-350 px-3 py-4 dark:bg-gray-800",
          },
        }}
      >
        <NavLink to={"/"}>
          {society?.logo ? (
            <Sidebar.Logo
              title={society?.name}
              img="https://www.alt-er.com/wp-content/uploads/2021/11/gokuldham-logo.png"
              imgAlt="society logo"
              className="max-w-full h-28 text-nowrap overflow-hidden text-ellipsis"
              theme={{
                inner: "h-28",
                img: "h-28",
              }}
            />
          ) : (
            <Card
              className="h-28 mb-4 !p-0 text-xl font-semibold text-gray-900 dark:text-white"
              theme={{
                root: {
                  inner: "h-28",
                  children: "h-28 p-2 flex justify-center items-center",
                },
              }}
            >
              <div
                title={society?.name}
                className="max-w-full text-nowrap text-ellipsis overflow-hidden"
              >
                {society?.name}
              </div>
            </Card>
          )}
        </NavLink>

        {sidebarItems && (
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              {sidebarItems.map((item, index) => (
                <NavLink to={item.href} key={index}>
                  <Sidebar.Item
                    icon={item?.icon}
                    className="p-4 mt-1"
                    active={location.pathname.includes(item.href.toLowerCase())}
                  >
                    {item.title}
                  </Sidebar.Item>
                </NavLink>
              ))}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        )}
      </Sidebar>

      <Navbar
        className="fixed top-0 z-20 w-full bg-slate-300 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-lg"
        aria-label="Navbar"
      >
        <Navbar.Toggle
          className="block sm:hidden"
          icon={<HiMenuAlt4 size={24} />}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />

        <NavLink to={"/"} className="flex items-center">
          <img
            src="/assets/wingMate-icon.png"
            alt="wingMate logo"
            className="w-12 h-10"
          />
          <span className="ml-2 font-semibold text-2xl text-gray-900 dark:text-whites">
            wingMate
          </span>
        </NavLink>

        <NavbarCollapse>
          <Navbar.Link
            as={Link}
            className="text-lg"
            to="/"
            active={location.pathname === "/"}
          >
            Society-Feed
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            className="text-lg"
            to="/wing-feed"
            active={location.pathname === "/wing-feed"}
          >
            Wing-Feed
          </Navbar.Link>
        </NavbarCollapse>

        <div className="flex gap-2 justify-center items-center">
          <Avatar
            alt="User settings"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded
          />
          {/* <NavLink to={"/logout"}>
            <HiOutlineArrowCircleRight size={35} />
          </NavLink> */}
          <NavLink to={"javascript:;"} onClick={() => dispatch(logoutAction())}>
            <HiOutlineArrowCircleRight size={35} />
          </NavLink>
        </div>
      </Navbar>

      <div className="sm:ml-64 p-4 mt-16 bg-slate-100 min-h-[calc(100vh-4rem)]">
        <Outlet />
      </div>
    </>
  );
};

export default NavigationBar;

{
  /* <div className="flex md:order-2 ">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Sk Nanera</span>
              <span className="block truncate text-sm font-medium">
                sk@wingmate.home
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div> */
}
