// pages/example.tsx
import { UserButton, UserProfile } from "@clerk/nextjs";

export default function Example() {
  return (
    <>
      <header>
        <UserProfile />
      </header>
      <div>Your page content can go here.</div>
    </>
  );
}