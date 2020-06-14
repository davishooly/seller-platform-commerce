import { themes } from '../../../providers/themes/Themes';

const details = [
    {
        title: 'Rate of Pending Orders',
        backgroundColor: themes.lightRedBackground,
        percentage: 0,
        increase: 0,
    },
    {
        title: 'Shop Rating',
        backgroundColor: themes.lightYellowBackground,
        percentage: 0,
        increase: 0,
    },
    {
        title: 'Stock Check',
        backgroundColor: themes.lightRedBackground,
        percentage: 0,
        increase: 0,
    },
    {
        title: 'New Products',
        backgroundColor: themes.darkBlueBackground,
        cancellationRate: 0,
        created: 0,
    },
];

const orderSummary = [
    { status: 'pending', amount: 0 },
    { status: 'Unshipped', amount: 0 },
    { status: 'Return requests', amount: 0 },
];

const fullFilledSummary = [
    { fullFilled: 'seller', day: 0, week: 0 },
    { fullFilled: 'OE', day: 0, week: 0 },
];

export { details, orderSummary, fullFilledSummary };
