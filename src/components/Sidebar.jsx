import { LayoutDashboard, MapPin, CalendarDays, Bookmark, Settings, CloudSun, Moon, LogOut } from "lucide-react";
import React from "react";
import "./Sidebar.css"

function Sidebar({ active, setActive, open, close }) {
  const items = [
    { id: "overview", icon: LayoutDashboard, label: "Overview" },
    { id: "explore", icon: MapPin, label: "Explore" },
    { id: "calendar", icon: CalendarDays, label: "Forecast" },
    { id: "saved", icon: Bookmark, label: "Saved places" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];
  return (
    <>
      {open && <button className="mobile-scrim" aria-label="Close menu" onClick={close} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand-mark"><CloudSun size={23} /></div>
        <nav className="side-nav" aria-label="Main navigation">
          {items.map(({ id, icon: Icon, label }) => (
            <button key={id} title={label} aria-label={label}
              className={`nav-button ${active === id ? "active" : ""}`}
              onClick={() => { setActive(id); close(); }}>
              <Icon size={19} />
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-button" title="Sign out" aria-label="Sign out"><LogOut size={19} /></button>
          <button className="theme-toggle" title="Theme"><Moon size={15} /></button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar