// function to get routes based on user role

const routes = {
  secretory: [
    {
      title: "Dashboard",
      href: "/",
      icon: HiChartPie,
    },
    {
      title: "Users",
      href: "/users",
      icon: HiUser,
    },
    {
      title: "Societies",
      href: "/societies",
      icon: HiHome,
    },
    {
      title: "Wings",
      href: "/wings",
      icon: HiHome,
    },
    {
      title: "Properties",
      href: "/properties",
      icon: HiHome,
    },
    {
      title: "Bookings",
      href: "/bookings",
      icon: HiHome,
    },
    {
      title: "Logout",
      href: "/logout",
      icon: HiLogout,
    },
  ],
  resident: [
    {
      title: "Dashboard",
      href: "/",
      icon: HiChartPie,
    },
    {
      title: "Feed",
      href: "/feed",
      icon: HiHome,
    },
    {
      title: "Profile",
      href: "/profile",
      icon: HiUser,
    },
    {
      title: "Logout",
      href: "/logout",
      icon: HiLogout,
    },
  ],
  wingAdmin: [
    {
      title: "Dashboard",
      href: "/",
      icon: HiChartPie,
    },
    {
      title: "Wing",
      href: "/wing",
      icon: HiHome,
    },
    {
      title: "Residents",
      href: "/residents",
      icon: HiHome,
    },
    {
      title: "Logout",
      href: "/logout",
      icon: HiLogout,
    },
  ],
};

const routesByRole = (role) => {
  return routes[role];
};
export default routesByRole;
