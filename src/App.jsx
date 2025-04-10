import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";

import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Features from "./pages/Features";
import FitnessAssessment from "./pages/FitnessAssessment";
import { UserProvider } from "./context/UserContext";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f50057",
      light: "#ff4081",
      dark: "#c51162",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.5rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  const [chatLoaded, setChatLoaded] = useState(false);

  const loadChat = () => {
    if (!chatLoaded) {
      const script = document.createElement("script");
      script.src = "https://cdn.jotfor.ms/s/umd/latest/for-embedded-agent.js";
      script.onload = () => {
        window.AgentInitializer.init({
          agentRenderURL: "https://agent.jotform.com/019620ee9cd873d788c17d3219aa63c0e632",
          rootId: "JotformAgent-019620ee9cd873d788c17d3219aa63c0e632",
          formID: "019620ee9cd873d788c17d3219aa63c0e632",
          queryParams: ["skipWelcome=1", "maximizable=1"],
          domain: "https://www.jotform.com",
          isDraggable: false,
          background: "linear-gradient(180deg, #F8FCF3 0%, #E6F1D7 100%)",
          buttonBackgroundColor: "#0A1551",
          buttonIconColor: "#FFF",
          variant: false,
          customizations: {
            greeting: "Yes",
            greetingMessage: "Hi! How can I assist you?",
            openByDefault: "No",
            pulse: "Yes",
            position: "right",
            autoOpenChatIn: "0",
          },
        });
        setChatLoaded(true);
      };
      document.body.appendChild(script);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/fitness-assessment" element={<FitnessAssessment />} />
          </Routes>
        </Router>

        {/* Floating Chat Button */}
        <IconButton
          onClick={loadChat}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            backgroundColor: "#0A1551",
            color: "#FFF",
            "&:hover": {
              backgroundColor: "#1c2c6c",
            },
            zIndex: 9999,
          }}
        >
          <ChatIcon />
        </IconButton>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
