// import HomePage from './Components/HomePage'
'use-client'
import { ThemeProvider } from "@/contexts/ThemeContext";
import HomePage from "./Components/HomePage/HomePage";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <>
        <ThemeProvider>
        <header className="app-header">
          <div className="container">
            <nav className="navbar">
              <div className="nav-brand">
                <h1>PaperPilot</h1>
              </div>
              <div className="nav-controls">
                <ThemeToggle />
              </div>
            </nav>
          </div>
        </header>
      <HomePage/>
      </ThemeProvider>

      {/* <GradeSelector/> */}
     {/* <QuestionPaper/> */}
    </>
    
  );
}
