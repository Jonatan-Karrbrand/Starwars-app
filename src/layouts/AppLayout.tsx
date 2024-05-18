import Container from "@/components/Container";
import Link from "next/link";

type Props = {
  children: React.ReactNode
}

export default function AppLayout({ children } : Props) {
  return (
    <>
      <header>
        <Container>
          <ul>
            <li><Link href={"/"}>Home</Link></li>

            <li><Link href={"/movies"}>Movies</Link></li>
          </ul>
        </Container>
      </header>

      <body>
        <Container>
          {children}
        </Container>
      </body>
    </>
  );
}