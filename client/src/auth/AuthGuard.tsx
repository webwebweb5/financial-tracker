import { useUser } from "@clerk/clerk-react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();

  const { user, isLoaded } = useUser();
  const [isChecking, setIsChecking] = useState(true);

  const checkPermissions = useCallback(() => {
    if (!isLoaded) {
      return;
    }

    if (!user) {
      const signInPath = "/auth"; // Replace with your actual sign-in route


      navigate(signInPath);
      return;
    }

    setIsChecking(false);
  }, [user, isLoaded, navigate]);

  useEffect(() => {
    checkPermissions();
  }, [user, isLoaded, checkPermissions]);

  if (isChecking || !isLoaded) {
    return <Loading />;
  }

  return <>{children}</>;
}
