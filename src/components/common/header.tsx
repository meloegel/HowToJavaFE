export default function Header() {
  return (
    <div className="flex justify-between p-4 mb-8 border-b-4">
      <h3 className="flex items-center px-2">created by: Mark Loegel</h3>
      <h1 className="text-4xl">HowToJava</h1>
      <div className=" text-center px-2">
        <h4>Logged in user:</h4>
        <h3>Placeholder</h3>
      </div>
    </div>
  );
}
