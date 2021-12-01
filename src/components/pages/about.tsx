import Header from "../common/header";
import NavBar from "../common/navBar";

export default function About(): JSX.Element {
  return (
    <div className="h-screen">
      <Header showUser={true} />
      <div className="grid gird-cols-4 gap-6 p-4">
        <NavBar active={"about"} />
        <div className="col-start-2 col-span-3 m-auto">
          <h2 className="text-center text-4xl p-4 mb-2">About</h2>
        </div>
      </div>
    </div>
  );
}
