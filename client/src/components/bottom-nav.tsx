import { HiOutlineChartPie, HiOutlineHome } from "react-icons/hi2";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { PiPlusCircleFill } from "react-icons/pi";
import { AddRecordDialog } from "./add-record-dialog";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const location = useLocation();

  if (location.pathname === "/auth") return null;
  return (
    <>
      <div className="fixed bottom-0 sm:max-w-lg w-full h-20 border grid grid-cols-3 bg-background sm:px-0 z-10">
        <Button variant="ghost" className="h-full rounded-none" asChild>
          <Link to={"/analytic"}>
            <div className="flex justify-center items-center flex-col group cursor-pointer">
              <div className={cn("flex items-center flex-col justify-center")}>
                <HiOutlineChartPie className="h-6 w-6 group-hover:scale-125 transition-all " />
                <span className="text-sm ">Analytic</span>
              </div>
            </div>
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="h-full rounded-none"
          onClick={() => setIsDialogOpen(true)}
        >
          <div className="flex justify-center items-center flex-col group cursor-pointer">
            <div className={cn("flex items-center flex-col justify-center")}>
              <PiPlusCircleFill className="h-12 w-12 group-hover:scale-125 transition-all" />
            </div>
          </div>
        </Button>
        <Button variant="ghost" className="h-full rounded-none" asChild>
          <Link to={"/"}>
            <div className="flex justify-center items-center flex-col group cursor-pointer">
              <div className={cn("flex items-center flex-col justify-center")}>
                <HiOutlineHome className="h-6 w-6 group-hover:scale-125 transition-all" />
                <span className="text-sm">Home Page</span>
                {/* <HiOutlineMegaphone className="h-6 w-6 group-hover:scale-125 transition-all" />
              <span className="text-sm">Change logs</span> */}
              </div>
            </div>
          </Link>
        </Button>
      </div>

      <AddRecordDialog isOpen={isDialogOpen} onClose={setIsDialogOpen} />
    </>
  );
}
