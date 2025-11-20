import { useState } from "react";
import client from "../../service"; // make sure your client exports an instance with a login method

function Login() {
  const [loading, setLoading] = useState(false);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the login method from your client
      const data = await client.login(emailId, password);

      console.log("Login response:", data);

      if (data.data?.token) {
        // Token received successfully
        alert("Login successful!");
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={emailId}
        onChange={(e) => setEmailId(e.target.value)}
        name="emailId"
        placeholder="Email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        placeholder="Password"
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default Login;