type Props = {
  children: React.ReactNode
  className?: string
}

export default function Container({ children, className } : Props) {
  return (
    <div className={`max-w-[90rem] mx-auto px-5 xl:px-8 ${className ?? ''}`}>
      {children}
    </div>
  );
}