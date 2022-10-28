import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

export function useUser() {
  const data = useMatchesData("root");
  if (!data) {
    return undefined;
  }

  // @ts-ignore
  return data?.json?.user;
}
