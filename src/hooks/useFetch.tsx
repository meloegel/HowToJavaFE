import { useCallback } from "react";
import useMountedState from "./useMountedState";

export type Status = "NotAsked" | "Pending" | "Resolved" | "Rejected";

type Options = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  requestBody?: BodyInit;
  headers?: Headers;
};

type GrantType = {
    
}

type Headers = {
  [key: string]: string;
};

type Result<T> = [Status, (url: string, options: Options) => Promise<void>, T | null];

export default function useFetch<T>(): Result<T> {
  const [status, setStatus] = useMountedState<Status>("NotAsked");
  const [result, setResult] = useMountedState<T | null>(null);

  const request = useCallback(
    async (url: string, options: Options) => {
      setStatus("Pending");
      const response = await fetch(url, options);
      setStatus(response.ok ? "Resolved" : "Rejected");
      setResult(response.ok ? await response.json() : null);
    },
    [setStatus, setResult]
  );
  return [status, request, result];
}