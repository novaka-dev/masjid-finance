import { UserButton } from "@clerk/nextjs";

import { SignInButton } from "@clerk/nextjs";

import { SignedOut } from "@clerk/nextjs";

import { SignedIn } from "@clerk/nextjs";

const Header = () => {
  return (
    <div className="fixed top-0">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Header;
