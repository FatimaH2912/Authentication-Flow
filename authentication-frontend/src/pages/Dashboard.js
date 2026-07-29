import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/protected/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);

      } catch (error) {
        console.log(error);
      }
    }

    fetchProfile();
  }, []);

  async function handleLogout() {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Dashboard</h2>

      {user ? (
        <>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Created At:</strong> {user.created_at}</p>

          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;