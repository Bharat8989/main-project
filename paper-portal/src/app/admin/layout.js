"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";

export default function AdminLayout({ children }) {

  const router = useRouter();

  useEffect(() => {

    const checkSession = async () => {
      try {
        await account.get(); // check login session
      } catch (error) {
        router.push("/admin"); // redirect to login
      }
    };

    checkSession();

  }, []);

  return <>{children}</>;
}
