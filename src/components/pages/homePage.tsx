import Header from "../common/header";
import NavBar from "../common/navBar";

export default function HomePage() {
  return (
    <div className="">
      <Header showUser={true} />
      <div className="grid gird-cols-4 gap-6 p-4">
        <NavBar active={"home"} />
        <div className="col-start-2 col-span-3 m-auto">
          <h2>Howtos</h2>
        </div>
      </div>
    </div>
  );
}
