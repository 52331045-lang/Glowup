
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigationLinks = [
    { name: "Dashboard", path: "/", icon: "⌂", end: true },
    { name: "My Routine", path: "/routine", icon: "☀" },
    { name: "My Habits", path: "/habits", icon: "♡" },
    { name: "My Products", path: "/products", icon: "✿" },
    { name: "Progress", path: "/progress", icon: "↗" },
    { name: "Contact Us", path: "/contact", icon: "✉" },
  ];

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-brand">
        <div className="sidebar-logo">G</div>

        <div className="sidebar-brand-text">
          <h2>GlowUp</h2>
          <span>SKINCARE & SELF CARE</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="sidebar-navigation">
        <p className="sidebar-section-title">MENU</p>

        <nav className="sidebar-links">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <span className="sidebar-link-icon">
                {link.icon}
              </span>

              <span className="sidebar-link-name">
                {link.name}
              </span>

              <span className="sidebar-active-dot"></span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Card */}
      <div className="sidebar-bottom">
        <div className="sidebar-bottom-icon">♡</div>

        <h3>Love Your Skin</h3>

        <p>
          Small steps every day lead to beautiful results.
        </p>

        <span className="sidebar-decoration">✿</span>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <p>Made with ♡</p>
        <span>GlowUp © 2026</span>
      </div>

    </aside>
  );
}

export default Sidebar;
