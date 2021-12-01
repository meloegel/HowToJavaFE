import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

export type HowToCardType = {
  howtoid: number;
  name: string;
  description: string;
  category: string;
  complexity: string;
  user: string;
  background: boolean;
};

export default function HowToCard({
  name,
  description,
  category,
  complexity,
  user,
  howtoid,
  background
}: HowToCardType): JSX.Element {
  const [request, data] = useFetch<any>();
  const [steps, setSteps] = useState([] as any[]);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token!,
    };
    request(`http://localhost:2019/steps/steps/${howtoid}`, {
      method: "GET",
      headers: headers,
    });
  }, [request, token, howtoid]);

  useEffect(() => {
    console.log(data);
    if (data) {
      setSteps(data);
    }
  }, [data]);

  return (
    <div className={`p-8 border-2  m-auto mb-4 w-1/2 text-md ${background ? "bg-red-300" : "bg-purple-500"} text-white font-medium`}>
      <h3 className="p-2 no-underline">
        Name: <span className="text-2xl underline">{name}</span>
      </h3>
      <p className="p-2 no-underline">
        Description: <span className="text-2xl underline">{description}</span>
      </p>
      <p className="p-2 no-underline">
        Category: <span className="text-2xl underline">{category}</span>
      </p>
      {complexity !== null ? (
        <p className="p-2 no-underline">
          Complexity: <span className="text-2xl underline">{complexity}</span>
        </p>
      ) : null}
      <p className="p-2 no-underline">
        User: <span className="text-2xl underline">{user}</span>
      </p>
      {steps.map((step) => (
        <p className="p-2 no-underline">
          Step: <span className="text-2xl underline">{step.step}</span>
        </p>
      ))}
    </div>
  );
}
