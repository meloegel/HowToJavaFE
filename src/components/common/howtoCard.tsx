import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

export type HowToCardType = {
    howtoid: number;
    name: string;
    description: string;
    category: string;
    complexity: string;
    user: string;
}

export default function HowToCard({name, description, category,complexity,user, howtoid}:HowToCardType):JSX.Element {
    const [request, data] = useFetch<any>();
    const [steps, setSteps] = useState([])
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
      }, [request, token]);

      useEffect(() => {
        console.log(data);
        if (data) {
         setSteps(data)
        }
      }, [data]);


    return (
        <div>
            <h3>Name: {name}</h3>
            <p>Description: {description}</p>
            <p>Category: {category}</p>
            <p>Complexity: {complexity}</p>
            <p>User: {user}</p>
            {steps.map(step => {
                <p >{step}</p>
            })}
        </div>
    )
}