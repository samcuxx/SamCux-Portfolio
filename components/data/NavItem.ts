interface NavItem {
  id: number;
  title: string;
  path: string;
}

const navItems: NavItem[] = [
  {
    id: 1,
    title: "Home",
    path: "/"
  },
  {
    id: 2, 
    title: "About",
    path: "/about"
  },
  {
    id: 3,
    title: "Projects", 
    path: "/projects"
  },
  {
    id: 4,
    title: "Contact",
    path: "/contact"
  }
];

export default navItems;
