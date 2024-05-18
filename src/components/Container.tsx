type Props = {
  children: React.ReactNode
}

export default function Container({ children } : Props) {
  return (
    <div className="max-w-screen-xl px-5 xl:px-8">
      {children}
    </div>
  );
}