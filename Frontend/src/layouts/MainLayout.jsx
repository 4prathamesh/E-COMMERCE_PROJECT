import { Outlet } from "react-router-dom";
import Navbar from "../Components/NavbarMainLayout";
import { useState } from "react";

const MainLayout = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="relative bg-gray-100 min-h-screen">
      <Navbar search={search} setSearch={setSearch} />
      <Outlet context={{ search }} />
    </div>
  );
};

export default MainLayout;