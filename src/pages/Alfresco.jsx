import  { useState } from "react";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const login = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8080/alfresco/api/-default-/public/authentication/versions/1/tickets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: "admin",
            password: "admin",
          }),
        }
      );
  
      if (response.status === 200) {
        setError(null);
        const data = await response.text(); // Directly get the ticketId
        return data;
      } else {
        const errorMessage = await response.text(); // Get error message from response
        setError(errorMessage);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login();
  };

  return (
    <div>
      <h1>Login to Alfresco</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Login" />
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginComponent;
