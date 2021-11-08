import Header from "./common/header";
import NavBar from "./common/navBar";

export default function HomePage() {
  return (
    <div className="">
      <Header />
      <div className="mt-8">
          <div className="w-1/3">
        <NavBar active={"home"} />
        </div>
      </div>
    </div>
  );
}
