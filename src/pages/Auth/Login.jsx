import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleSubmit = (e) => {
  e.preventDefault();

  console.log(email);

  if (email.trim() === "admin@gmail.com") {
    window.location.href = "http://localhost:5174";
  } else {
    window.location.href = "/home";
  }
};
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; height: 100%; font-family: 'Segoe UI', sans-serif; background: #0f0f1a;margin : 0; padding: 0;overflow-x:hidden; }
        
        .navbar {
          background: #1a1a2e;
          padding: 16px 40px;
          border-bottom: 1px solid #2a2a3e;
          display: flex;
          align-items: center;
        }
        .logo { font-size: 22px; font-weight: 700; color: #e94560; }

        .page {
          display: flex;
          height: calc(100vh - 57px);
          width: 100%;
        }

        .left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 60px;
          color: white;
          background: #0f0f1a;
        }

        .left h1 {
          font-size: 38px;
          font-weight: 700;
          margin-bottom: 16px;
          color: white;
          line-height: 1.3;
        }
        .left h1 span { color: #e94560; }

        .left p {
          font-size: 16px;
          color: #aaa;
          line-height: 1.7;
          max-width: 420px;
          margin-bottom: 40px;
        }

        .stats { display: flex; gap: 40px; }
        .stat h3 { font-size: 26px; font-weight: 700; color: #e94560; }
        .stat p { font-size: 13px; color: #aaa; margin-top: 4px; }

        .right {
          width: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          background: #1a1a2e;
          border-left: 1px solid #2a2a3e;
        }

        .box { width: 100%; }
        .box h2 { font-size: 26px; font-weight: 700; color: white; margin-bottom: 6px; }
        .box p { font-size: 14px; color: #888; margin-bottom: 24px; }
        .box p a { color: #e94560; text-decoration: none; font-weight: 600; }

        .box label { display: block; font-size: 13px; font-weight: 600; color: #aaa; margin: 16px 0 6px; }
        .box input {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #2a2a3e;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
          background: #0f0f1a;
          color: white;
        }
        .box input:focus { border-color: #e94560; }
        .box input::placeholder { color: #555; }

        .box button {
          width: 100%;
          padding: 13px;
          background: #e94560;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 24px;
        }
        .box button:hover { background: #c73652; }
      `}</style>

      <div className="navbar">
        <div className="logo">🎓 UpToSkills</div>
      </div>

      <div className="page">
        <div className="left">
          <h1>Learn from your <span>Favourite Celebrity</span> Mentor</h1>
          <p>Access 480+ courses taught by AI-powered celebrity mentors. Learn your way, at your pace.</p>
          <div className="stats">
            <div className="stat"><h3>12k+</h3><p>Students</p></div>
            <div className="stat"><h3>480+</h3><p>Courses</p></div>
            <div className="stat"><h3>98%</h3><p>Satisfaction</p></div>
          </div>
        </div>

        <div className="right">
          <div className="box">
            <h2>Welcome Back! 👋</h2>
            <p>Don't have an account? <a href="/register">Sign Up</a></p>

            <form onSubmit={handleSubmit}>
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)} />

              <label>Password</label>
              <input type="password" placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)} />

              <button type="submit">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}