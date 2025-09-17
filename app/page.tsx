import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import { NavbarCompo } from "@/components/navbar";
import OtherProj from "@/components/OtherProj";
import RecentProjects from "@/components/RecentProjects";
import Workflow from "@/components/Workflow";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip">
        <div className="max-w-7xl w-full">
          {/* <FloatingNav navItems={navItems}
        /> */}
          <NavbarCompo />
          <Hero />
          <Grid />
          {/* <Projects /> */}
          <RecentProjects />
          <OtherProj />
          <Experience />
          <Workflow />
          <Footer />
        </div>
    </main >
  );
}
