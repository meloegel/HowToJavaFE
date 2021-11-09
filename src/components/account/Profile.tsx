import Header from "../common/header";
import NavBar from "../common/navBar";

export default function Profile(): JSX.Element {
  return (
    <div>
      <Header showUser={true} />
      <div>
        <h2>Profile</h2>
        <div className="">
          <NavBar active={"profile"} />
          <form></form>
        </div>
      </div>
    </div>
  );
}
