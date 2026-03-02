import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const departmentLinks = [
  { name: "General & Laparoscopic", path: "/departments/general-laparoscopic" },
  { name: "Pediatrics (NICU/PICU)", path: "/departments/pediatrics" },
  { name: "Cardiology", path: "/departments/cardiology" },
  { name: "Radiology & Imaging", path: "/departments/radiology" },
  { name: "Pathology Lab", path: "/departments/pathology" },
  { name: "Internal Medicine", path: "/departments/internal-medicine" },
  { name: "Orthopedics", path: "/departments/orthopedics" },
  { name: "Ophthalmology", path: "/departments/ophthalmology" },
  { name: "Emergency & Trauma", path: "/departments/emergency" },
  { name: "ENT & Dental", path: "/departments/ent-dental" },
  { name: "Pharmacy", path: "/departments/pharmacy" },
  { name: "Obs & Gynae", path: "/departments/obs-gynae" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);
  const [mobileDeptOpen, setMobileDeptOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Doctors", path: "/doctors" },
    { name: "Appointments", path: "/appointments" },
    { name: "My Reports", path: "/view-reports" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-2xl py-4 shadow-md border-b border-slate-100"
          : "bg-white py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* --- LOGO --- */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.jpg"
            alt="Prime Hospital Logo"
            className="h-12 w-auto object-contain transition-transform duration-700 group-hover:rotate-[360deg]"
          />
          <div className="flex flex-col leading-none">
            <span className="font-serif text-2xl tracking-tighter text-slate-950">
              <span className="font-light">PRIME</span>{" "}
              <span className="font-black">HOSPITAL</span>
            </span>
            <span className="text-[8px] font-bold tracking-[0.5em] text-slate-400 mt-1 uppercase">
              Biratnagar
            </span>
          </div>
        </Link>

        {/* --- DESKTOP NAV --- */}
        <div className="hidden md:flex items-center space-x-10 relative">
          {/* Normal Links Before Departments */}
          {navLinks.slice(0, 2).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className="relative text-[12px] uppercase tracking-[0.25em] transition-all duration-300 hover:scale-110 text-slate-500 font-bold hover:text-slate-950"
            >
              {({ isActive }) => (
                <span className="flex flex-col items-center group">
                  {link.name}
                  <span
                    className={`h-[3px] bg-slate-950 mt-1 transition-all duration-500 rounded-full ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full"
                    }`}
                  />
                </span>
              )}
            </NavLink>
          ))}

          {/* --- DEPARTMENTS DROPDOWN --- */}
          <div
            className="relative"
            onMouseEnter={() => setDeptOpen(true)}
            onMouseLeave={() => setDeptOpen(false)}
          >
            <button className="relative text-[12px] uppercase tracking-[0.25em] transition-all duration-300 hover:scale-110 text-slate-500 font-bold hover:text-slate-950 flex flex-col items-center">
              <span className="flex items-center gap-1">
                Departments <ChevronDown size={12} />
              </span>
            </button>

            <div
              className={`absolute top-10 left-0 bg-white shadow-xl rounded-2xl p-6 w-72 border border-slate-100 transition-all duration-300 ${
                deptOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-3"
              }`}
            >
              {/* VIEW ALL */}
              <Link
                to="/departments"
                className="block text-[12px] uppercase tracking-[0.25em] font-black text-slate-950 pb-3 border-b border-slate-100 mb-3 hover:opacity-70 transition"
              >
                View All Departments
              </Link>

              {/* INDIVIDUAL DEPARTMENTS */}
              {departmentLinks.map((dept) => (
                <Link
                  key={dept.path}
                  to={dept.path}
                  className="block text-[12px] uppercase tracking-[0.15em] text-slate-500 font-bold hover:text-slate-950 py-2 transition-all"
                >
                  {dept.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Remaining Links */}
          {navLinks.slice(2).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className="relative text-[12px] uppercase tracking-[0.25em] transition-all duration-300 hover:scale-110 text-slate-500 font-bold hover:text-slate-950"
            >
              {({ isActive }) => (
                <span className="flex flex-col items-center group">
                  {link.name}
                  <span
                    className={`h-[3px] bg-slate-950 mt-1 transition-all duration-500 rounded-full ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full"
                    }`}
                  />
                </span>
              )}
            </NavLink>
          ))}

         {/* --- ADMIN LOGIN BUTTON --- */}
<Link
  to="/admin/dashboard" // Changed from /admin-login
  className="ml-6 px-4 py-2 text-[12px] uppercase tracking-[0.25em] font-bold text-white bg-[hsl(222,47%,11%)] hover:bg-[hsl(222,47%,18%)] rounded-xl transition-all"
>
  Admin Dashboard
</Link>
        </div>

        {/* --- MOBILE BUTTON --- */}
        <button
          className="md:hidden text-slate-950 p-2 hover:bg-slate-50 rounded-xl transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} strokeWidth={2.5} />}
        </button>

        {/* --- MOBILE MENU --- */}
        <div
          className={`fixed inset-0 top-[88px] w-full bg-white/95 backdrop-blur-xl
          px-10 py-12 flex flex-col space-y-8 transition-all duration-500 md:hidden
          ${isOpen ? "opacity-100 visible translate-x-0" : "opacity-0 invisible translate-x-full"}`}
        >
          {/* Normal Links */}
          {navLinks.slice(0, 2).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-4xl font-serif tracking-tight border-b border-slate-100 pb-4"
            >
              {link.name}
            </NavLink>
          ))}

          {/* Mobile Departments */}
          <div>
            <button
              onClick={() => setMobileDeptOpen(!mobileDeptOpen)}
              className="text-4xl font-serif tracking-tight pb-4 flex items-center justify-between w-full"
            >
              Departments
              <ChevronDown
                className={`transition-transform ${mobileDeptOpen ? "rotate-180" : ""}`}
              />
            </button>

            {mobileDeptOpen && (
              <div className="pl-4 space-y-4 mt-4">
                <Link
                  to="/departments"
                  onClick={() => setIsOpen(false)}
                  className="block text-2xl font-bold text-slate-950"
                >
                  View All Departments
                </Link>

                {departmentLinks.map((dept) => (
                  <Link
                    key={dept.path}
                    to={dept.path}
                    onClick={() => setIsOpen(false)}
                    className="block text-xl text-slate-500"
                  >
                    {dept.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(2).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-4xl font-serif tracking-tight border-b border-slate-100 pb-4"
            >
              {link.name}
            </NavLink>
          ))}

 {/* --- ADMIN LOGIN BUTTON MOBILE --- */}
<Link
  to="/admin/dashboard" // Changed from /admin-login
  onClick={() => setIsOpen(false)}
  className="block text-4xl font-serif tracking-tight text-white bg-[hsl(222,47%,11%)] py-4 px-6 rounded-xl text-center hover:bg-[hsl(222,47%,18%)] transition-all"
>
  Admin Dashboard
</Link>

          <div className="pt-10">
            <p className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase mb-4">
              Emergency Contact
            </p>
            <a href="tel:021517777" className="text-2xl font-black text-red-600">
              021-517777
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;