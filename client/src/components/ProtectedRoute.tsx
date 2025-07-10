import { RedirectToSignIn, SignedIn, useUser } from "@clerk/clerk-react";
import type { PropsWithChildren } from "react";

export default function ProtectedRoute({children}:PropsWithChildren) {
    const{isSignedIn} = useUser()
    if(!isSignedIn) {
        return <RedirectToSignIn />
    }
  return (
    <SignedIn>
        {children}
    </SignedIn>
  )
}