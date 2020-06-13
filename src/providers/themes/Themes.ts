export const homeTheme = {
    textColor: '#FFFFFF',
    dullTextColor: 'rgba(255,255,255,0.6)',
    logoBackground: '#006DBF',
    greyBackground: '#cccccc',
    greenBright: '#67C23A',
    blueText: '#0065B0',
    radialGradient: 'radial-gradient(circle, rgba(96,116,131,0.95) 0%, rgba(33,45,56,0.9) 100%)',
    linearBackground:
        'linear-gradient(153.43deg,#00B2A9 0%,#0065B0 100%),linear-gradient(177.56deg,#0B6DAC 0%,#085F97 100%),linear-gradient(180deg,#0D609F 0%,#00518B 100%)',
    footerBackground: '#203341',
    errorComponentBackground: '#00B2A9',
    buttonBackground: '#1890ff',
    buttonBackgroundWhite: '',
    secondaryLightColor: '',
};

const dashboardThemes = {
    lightGreenBackground: 'rgb(40, 161, 151)',
    lightRedBackground: 'rgb(241, 91, 64)',
    lightYellowBackground: 'rgb(205, 200, 132)',
    darkBlueBackground: 'rgb(0, 101, 176)',
    dullRedBackground: 'rgb(219, 110, 155)',
    darkTurquoiseBackground: 'rgb(112, 115, 175)',
};

export const themes = { ...homeTheme, ...dashboardThemes };
