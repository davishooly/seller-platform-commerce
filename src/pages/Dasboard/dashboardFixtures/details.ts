const details = [
  {
    title: "Rate of Pending Orders",
    backgroundColor: "#F15B40",
    percentage: 0,
    increase: 0
  },
  {
    title: "Shop Rating",
    backgroundColor: "#CDC884",
    percentage: 0,
    increase: 0,
  },
  {
    title: "Stock Check",
    backgroundColor: "#F56C6C",
    percentage:  0,
    increase: 0,
  },
  {
    title: "New Products",
    backgroundColor: "#0065B0",
    cancellationRate: 0,
    created: 0,
  }
];

const orderSummary = [
  {status: "pending", amount: 0},
  {status: "Unshipped", amount: 0},
  {status: "Return requests", amount: 0}

];

const fullFilledSummary = [
  { fullFilled: "seller", day: 0 , week: 0 },
  { fullFilled: "OE", day: 0 , week: 0 }
  ];

export  { details, orderSummary, fullFilledSummary }
