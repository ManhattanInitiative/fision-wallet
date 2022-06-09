import { Component, createMemo, createSignal, JSX } from 'solid-js';


export function createRouter(routes: {
    [key: string]: Component
}, defaultRoute: string) {
    const [currentRoute, setCurrentRoute] = createSignal(defaultRoute)

    return {
        currentRoute: () => routes[currentRoute()],
        setRoute: (route: string) => setCurrentRoute(route)
    }
}