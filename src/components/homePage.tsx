import Header from "./common/header";
import NavBar from "./common/navBar";

export default function HomePage() {
  return (
    <div className="">
      <Header />
      <div className="mt-8">
        <NavBar active={"home"} />
      </div>
    </div>
  );
}
