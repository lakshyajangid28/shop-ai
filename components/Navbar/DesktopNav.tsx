// components/Navbar/DesktopNav.tsx
import NavLink from './NavLink';
import navLinks from './navLinks';

const DesktopNav = () => (
  <div className="hidden md:block ml-10">
    <div className="flex items-baseline space-x-1">
      {navLinks.map(link => (
        <NavLink key={link.href} href={link.href}>
          {link.label}
        </NavLink>
      ))}
    </div>
  </div>
);

export default DesktopNav;
