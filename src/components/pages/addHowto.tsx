import Header from "../common/header";
import NavBar from "../common/navBar";

export default function AddHowto(): JSX.Element {
  return (
    <div>
      <Header showUser={true} />
      <div className="grid gird-cols-4 gap-6 p-4">
        <NavBar active={"addhowto"} />
        <form className="col-start-2 col-span-3 m-auto">
          <h2 className="text-center text-4xl p-4 mb-2">Add HowTo</h2>
        </form>
      </div>
    </div>
  );
}
