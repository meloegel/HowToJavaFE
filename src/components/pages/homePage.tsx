import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Header from "../common/header";
import HowToCard from "../common/howtoCard";
import NavBar from "../common/navBar";

export default function HomePage() {
  const [request, data] = useFetch<any>();
  const [howtos, setHowtos] = useState([] as any[]);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token!,
    };
    request(`http://localhost:2019/howtos/howtos`, {
      method: "GET",
      headers: headers,
    });
  }, [request, token]);

  useEffect(() => {
    console.log(data);
    if (data) {
      setHowtos(data);
      console.log(howtos);
    }
  }, [data, howtos]);

  return (
    <div className="">
      <Header showUser={true} />
      <div className="grid gird-cols-4 gap-6 p-4">
        <NavBar active={"howtos"} />
        <div className="col-start-2 col-span-3 m-auto w-full">
          <h2 className="text-center text-4xl p-4 mb-2">Howtos</h2>
          {howtos !== []
            ? howtos.map((howto): any => (
                <HowToCard
                  key={howto.howtoid}
                  howtoid={howto.howtoid}
                  name={howto.name}
                  description={howto.description}
                  category={howto.category}
                  complexity={howto.complexity}
                  user={howto.user.username}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
