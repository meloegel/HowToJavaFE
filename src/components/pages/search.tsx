import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Button from "../common/button/button";
import Header from "../common/header";
import HowToCard from "../common/howtoCard";
import NavBar from "../common/navBar";

const initialFormValues = {
  search: "",
};

export default function Search(): JSX.Element {
  const [request, data] = useFetch<any>();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [howtos, setHowtos] = useState([] as any[]);
  const token = window.localStorage.getItem("token");

  const onInputChange = (evt: any) => {
    evt.preventDefault();
    setFormValues({
      ...formValues,
      [evt.target.name]: evt.target.value,
    });
  };

  const onSubmit = (evt: any) => {
    evt.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: token!,
    };
    let foo = formValues.search.replace(
      " ",
      "_"
    )
    request(
      `http://localhost:2019/howtos/howtos/like/${foo}`,{
        method: "GET",
        headers: headers,
      }) 
  };

  useEffect(() => {
    if (data){
      console.log(data)
      setHowtos(data)
    }
  }, [data])

  return (
    <div className="h-screen">
      <Header showUser={true} />
      <div className="grid gird-cols-4 gap-6 p-4">
        <NavBar active={"search"} />
        <div className="col-start-2 col-span-3 m-auto w-full">
          <h2 className="text-center text-4xl p-4 mb-2">Search</h2>
          <form onSubmit={onSubmit} className="col-start-2 col-span-3 m-auto">
            <div className="text-center">
              <label>Search</label>
              <input
                className="bg-gray-400 border-2 border-black m-2"
                value={formValues.search}
                onChange={onInputChange}
                name="search"
                type="text"
              />
            </div>
            <div className="flex justify-evenly p-6">
              <Button
                text="Search"
                name="search"
                onClick={() => {}}
                className=" bg-gray-500 text-white"
              />
            </div>
          </form>
          <div>
          
          {howtos !== []
            ? <div>
                <h2 className="text-center text-2xl p-4 mb-2">Results:</h2>
                    {howtos.map((howto, key): any => (
                        <HowToCard
                  key={key}
                  background={key % 2 === 0}
                  howtoid={howto.howtoid}
                  name={howto.name}
                  description={howto.description}
                  category={howto.category}
                  complexity={howto.complexity}
                  user={howto.user.username}
                />
              ))}
              </div>
            : null}
          </div>
        </div>
      </div>
    </div>
  );
}
