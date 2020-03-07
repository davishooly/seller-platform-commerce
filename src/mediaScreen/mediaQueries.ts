import { size } from "./devices";

export const device = {
    mobileS: `(min-device-width: ${size.mobileS})`,
    mobileM: `(min-device-width: ${size.mobileM})`,
    mobileL: `(min-device-width: ${size.mobileL})`,
    tablet: `(min-device-width: ${size.tablet})`,
    laptop: `(min-device-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`
};
