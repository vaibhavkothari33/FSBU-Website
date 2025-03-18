import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import HeroSection from "./components/HeroSection/HeroSection";
import MeetTheTeamSection from "./components/Teams/MeetTheTeamSection";
import EventsSection from "./components/Event/EventSection";
//check
import EventsCarousel2 from "./components/BetterEvent/EventSection2";
import UpcomingEventsSection from "./components/UpcomingEventsSection/UpcomingEventsSection";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer/Footer";
import AwardsComponent from "./components/Awards/Awards";
import MeetTheTeamSectionCopy from "./components/Teams/MeetTheTeamSectioncopy";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          {/* <Navbar /> */}
          <main >
            <Routes>
              {/* Main Route */}
              <Route
                path="/"
                element={
                  <>
                    <HeroSection />
                    <section id="event">
                      <EventsSection />
                    </section>
                    <section id="event">
                      <EventsCarousel2 />
                    </section>
                    <section id="team">
                      <MeetTheTeamSection />
                    </section>
                    <section id="team">
                      <MeetTheTeamSectionCopy />
                    </section>
                    <section id="UpcomingEventsSection">
                      <UpcomingEventsSection />
                    </section>
                    <section>
                      <AwardsComponent />
                    </section>
                    <section id="footer">
                      <Footer />
                    </section>
                  </>
                }
              />
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
      <Analytics />
    </>
  );
}

export default App;
