import Link from "next/link";

type Props = {
  children: React.ReactNode
  href: string
  className?: string
}

export default function Button({ children, href, className } : Props) {
  return (
    <Link href={href} className={`text-sm uppercase tracking-wider font-bold inline-block animated-button pb-1 ${className ?? ''}`}>
      {children}
    </Link>
  );
}