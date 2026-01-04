import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>WebRTC Live Stream</h1>
      <p style={styles.subtitle}>
        A simple peer-to-peer video streaming app using WebRTC
      </p>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h2>Sender</h2>
          <p>Share your camera stream</p>
          <button
            style={styles.button}
            onClick={() => navigate("/sender")}
          >
            Start Sending
          </button>
        </div>

        <div style={styles.card}>
          <h2>Receiver</h2>
          <p>Watch the live stream</p>
          <button
            style={styles.button}
            onClick={() => navigate("/receiver")}
          >
            Start Watching
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    color: "#fff",
    textAlign: "center",
    padding: "20px",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.2rem",
    opacity: 0.8,
    marginBottom: "40px",
  },
  cardContainer: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    background: "#ffffff15",
    borderRadius: "12px",
    padding: "30px",
    width: "260px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: "#00c6ff",
    color: "#000",
    fontWeight: "bold",
  },
};
