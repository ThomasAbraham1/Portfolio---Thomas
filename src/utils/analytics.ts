import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-BQKBXPYHX4";

export const initGA = () => {
    ReactGA.initialize(MEASUREMENT_ID);
};

export const logEvent = (category: string, action: string, label?: string) => {
    ReactGA.event({
        category,
        action,
        label,
    });
};

export const logPageView = () => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
};
