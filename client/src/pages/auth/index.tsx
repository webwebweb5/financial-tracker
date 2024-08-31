import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function AuthPage() {
  return (
    <main>
      <SignedOut>
        <h1 className="text-2xl font-bold">
          💸 Manage Your Own Personal Finance Tracker! 💸
        </h1>

        <div className="flex gap-x-2 justify-center mt-4">
          <Button asChild>
            <SignUpButton mode="modal">Sign Up</SignUpButton>
          </Button>

          <Button asChild>
            <SignInButton mode="modal">Sign In</SignInButton>
          </Button>
        </div>
      </SignedOut>
      <SignedIn>
        <Navigate to="/" />
      </SignedIn>
    </main>
  );
}
