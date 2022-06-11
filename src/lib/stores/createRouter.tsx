import { Component, createSignal } from "solid-js";
import { Dynamic } from "solid-js/web";

export function createRouter(
  routes: {
    [key: string]: Component;
  },
  defaultRoute: string
) {
  const [currentRoute, setCurrentRoute] = createSignal(defaultRoute);
  const [routeProps, setRouteProps] = createSignal({});

  return {
    currentRoute: () => routes[currentRoute()],
    currentRouteProps: () => routeProps(),
    goToRoute: (route: string, props?: {}) => {
      setCurrentRoute(route);

      if (props) {
        setRouteProps(props);
      }
    },
  };
}

export interface RouterProps {
  router: ReturnType<typeof createRouter>;
}

export const Router: Component<RouterProps> = (props) => {
  return (
    <>
      <Dynamic
        component={props.router.currentRoute()}
        {...props.router.currentRouteProps()}
      ></Dynamic>
    </>
  );
};
