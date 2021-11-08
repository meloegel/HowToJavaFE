export type HeaderType = {
  showUser: boolean;
};

export default function Header(props: HeaderType): JSX.Element {
  const { showUser: type = false } = props;
  const username = window.localStorage.getItem("username");

  switch (type) {
    case true:
      return <Active {...props} />;
    case false:
      return <NotActive {...props} />;
  }

  function Active(headerType: HeaderType): JSX.Element {
    return (
      <div className="flex justify-between p-4 mb-8 border-b-4">
        <h3 className="flex items-center px-2">created by: Mark Loegel</h3>
        <h1 className="text-4xl">HowToJava</h1>
        <div className=" text-center px-2">
          <h4>Logged in user:</h4>
          <h3>{username}</h3>
        </div>
      </div>
    );
  }

  function NotActive(headerType: HeaderType): JSX.Element {
    return (
      <div className="flex justify-between p-4 mb-8 border-b-4">
        <h3 className="flex items-center px-2">created by: Mark Loegel</h3>
        <h1 className="text-4xl">HowToJava</h1>
        <div className=" text-center px-2">
          <h4>Create a new account</h4>
          <h3>or log into your account</h3>
        </div>
      </div>
    );
  }
}
