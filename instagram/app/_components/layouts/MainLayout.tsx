import SideBar from "./SideBar";

export default function MainLayout({ children }) {
  return (
    <main className="flex">
      <SideBar />
      {children}
    </main>
  );
}
