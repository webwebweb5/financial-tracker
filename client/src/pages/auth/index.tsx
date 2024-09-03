import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiGmail } from "react-icons/si";

export default function AuthPage() {
  return (
    <main className="w-full flex flex-col h-screen pt-10 p-5 overflow-hidden">
      <div className="flex flex-col gap-10">
        <SignedOut>
          <div className="flex items-center lg:gap-10 gap-4">
            <RiMoneyDollarCircleFill className="sm:w-24 sm:h-24 w-20 h-20" />
            <h1 className=" font-black text-4xl">Ledgerify</h1>
          </div>

          <div>
            <h1 className="text-3xl font-semibold">
              Manage and optimize your budget effortlessly
            </h1>
            <p className="mt-5 text-gray-500">
              Simplify your financial management with Ledgerify—track expenses,
              monitor budgets, and maintain accurate financial records
              effortlessly.
            </p>
          </div>

          <div className="flex gap-x-2">
            <Button variant="secondary" className="w-full" asChild>
              <SignUpButton mode="modal">Sign Up</SignUpButton>
            </Button>

            <Button className="w-full" asChild>
              <SignInButton mode="modal">Sign In</SignInButton>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <hr className="flex-1 border-t border text-center" />
            <span className="text-muted-foreground text-sm">
              SUPPORTED PROVIDERS
            </span>
            <hr className="flex-1 border-t border text-center" />
          </div>

          <div className="flex justify-center items-center gap-x-6">
            <FaGithub className="w-6 h-6" />
            <FcGoogle className="w-6 h-6" />
            <SiGmail className="w-6 h-6 text-red-500" />
          </div>
        </SignedOut>
        <SignedIn>
          <Navigate to="/" />
        </SignedIn>
      </div>
    </main>
  );
}
