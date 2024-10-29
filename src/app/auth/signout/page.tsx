// ./src/app/signin/page.tsx
"use client";

import { signOut } from "next-auth/react";

export default function SignOutPage() {
    return signOut();
}
