const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="h-screen bg-blue-100">{children}</div>;
};

export default AuthLayout;
