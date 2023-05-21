import React from "react";

import StatsBox from "../components/StatsBox";
import SideBarNav from "../components/SideBarNav";
import { Fade } from "react-awesome-reveal";

const Status = () => {
  return (
    <div className="pt-16 min-h-[calc(100vh)] flex ">
      {/* Sidebar */}
      <SideBarNav />

      {/* STATUSES =========================================== */}
      <Fade direction="bottom" delay={500}>
        <div className="w-5/6 flex justify-center pt-5">
          <StatsBox />
        </div>
      </Fade>
    </div>
  );
};

export default Status;
