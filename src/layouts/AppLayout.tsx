import Container from "@/components/Container";
import Logo from "@/components/icons/Logo";
import Link from "next/link";

type Props = {
  children: React.ReactNode
}

export default function AppLayout({ children } : Props) {
  return (
    <>
      <header>
        <Container className="pt-12 pb-5 flex flex-col items-center space-y-5">
          <Link href={"/"}>
            <Logo />
          </Link>

          <ul className="flex space-x-10">
            <li><Link href={"/"}>Home</Link></li>

            <li><Link href={"/characters"}>Characters</Link></li>
          </ul>
        </Container>
      </header>

      <main className="mt-12 mb-20">
        <Container>
          {children}
        </Container>
      </main>
    </>
  );
}