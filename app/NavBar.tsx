"use client";

import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { Skeleton } from "@/app/components";

export default function NavBar() {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex align="center" justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavBarLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
}

function AuthStatus() {
  const { status, data: session } = useSession();

  if (status === "loading")
    return <Skeleton width="2rem" height="2rem" circle={true} />;

  if (status === "unauthenticated")
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Log in
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="hover:cursor-pointer">
          <Avatar
            src={session!.user!.image!}
            fallback={
              `https://ui-avatars.com/api/?name=` +
              session!.user!.name!.replace(" ", "+")
            }
            size="2"
            radius="full"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
}

function NavBarLinks() {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            href={link.href}
            className={classNames(
              "nav-link",
              link.href === currentPath && "!text-zinc-900"
            )}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
