import Navbar from "../../../components/navbar/navbar";
import IChildren from "./IChildren";

export default function MainLayout({ children }: IChildren) {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <div className="py-4 px-8 lg:px-16">{children}</div>
    </div>
  );
}
