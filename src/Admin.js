import React, { useState } from "react";
import Login from "./components/login";
import NavBar from "./components/navbar";
import ReportTable from "./components/reportTable";

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Clear the user's authentication state
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <NavBar />
          <h1>Welcome to the Admin Panel</h1>
          <ReportTable />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Login onSuccessfulLogin={handleSuccessfulLogin} />
      )}
    </div>
  );
}

export default Admin;
