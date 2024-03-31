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
} from "react-icons/hi";

import {
  MdOutlineEvent,
  MdBookOnline,
  MdNaturePeople,
  MdOutlinePeople,
} from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";

const NavigationBar = ({ societyLogo, societyName }) => {
  const sidebarItems = [
    {
      title: "Dashboard",
      icon: HiOutlineOfficeBuilding,
      href: "#",
    },
    {
      title: "Requests",
      icon: HiViewBoards,
      href: "/requests",
    },
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

  societyLogo = true;
  return (
    <>
      <Sidebar
        id="logo-sidebar"
        className="fixed top-0 left-0 pt-16 w-64 h-screen transition-transform -translate-x-full bg-slate-200 border-r border-gray-200 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <NavLink to={"/"}>
          {societyLogo ? (
            <Sidebar.Logo
              img="https://www.alt-er.com/wp-content/uploads/2021/11/gokuldham-logo.png"
              imgAlt="society logo"
              className="w-56 h-12 overflow-hidden text-ellipsis"
            >
              {societyName || "Gokuldham society"}
            </Sidebar.Logo>
          ) : (
            // <span>{societyName}</span>
            <Card className="mb-4 !p-0 text-xl font-semibold text-gray-900 dark:text-white">
              societyName
            </Card>
          )}
        </NavLink>

        {/* <Sidebar.Items>
          <Sidebar.ItemGroup>
            <NavLink to={"#"}>
              <Sidebar.Item href="#" icon={HiChartPie}>
                Dashboard
              </Sidebar.Item>
            </NavLink>
            <NavLink to={"#"}>
              <Sidebar.Item href="#" icon={HiViewBoards}>
                Kanban
              </Sidebar.Item>
            </NavLink>
            <NavLink to={"#"}>
              <Sidebar.Item href="#" icon={HiInbox}>
                Inbox
              </Sidebar.Item>
            </NavLink>
            <NavLink to={"/user"}>
              <Sidebar.Item icon={HiUser}>Users</Sidebar.Item>
            </NavLink>
            <NavLink to={"#"}>
              <Sidebar.Item href="#" icon={HiShoppingBag}>
                Products
              </Sidebar.Item>
            </NavLink>
          </Sidebar.ItemGroup>
        </Sidebar.Items> */}

        {sidebarItems && (
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              {sidebarItems.map((item, index) => (
                <NavLink to={item.href} key={index}>
                  <Sidebar.Item icon={item?.icon} className="p-4">
                    {item.title}
                  </Sidebar.Item>
                </NavLink>
              ))}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        )}
      </Sidebar>

      <Navbar
        className="fixed top-0 z-20 w-full bg-slate-200 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Navbar"
      >
        <NavLink to={"/"}>
          <Navbar.Brand>
            <img
              src="/assets/wingMate-icon.png"
              alt="wingMate logo"
              className="w-12 h-10"
            />
            <span className="mr-2 font-semibold text-2xl text-gray-900 dark:text-whites ">
              wingMate
            </span>
          </Navbar.Brand>
        </NavLink>

        <NavbarCollapse>
          <Navbar.Link href="#" active>
            Society-Feed
          </Navbar.Link>
          <Navbar.Link href="#">Wing-Feed</Navbar.Link>
        </NavbarCollapse>

        <div className="flex gap-2 justify-center items-center">
          <Avatar
            alt="User settings"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded
          />
          <Link to={"/logout"}>
            <HiOutlineArrowCircleRight size={35} />
          </Link>
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
