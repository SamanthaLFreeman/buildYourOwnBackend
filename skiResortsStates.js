const states = [
  {
    name: "Colorado",
    avgSnow: "67.30 in",
    mountains: [
      {
        name: "Arapahoe Basin",
        mountainHeight: "504 m (3286 m - 3790 m)",
        size: "105 km",
        skiLifts: 8
      },
      {
        name: "Beaver Creek Resort",
        mountainHeight: "	1233 m (2255 m - 3488 m)",
        size: "150 km",
        skiLifts: 16
      },
      {
        name: "Breckenridge Ski Resort",
        mountainHeight: "988 m (2926 m - 3914 m)",
        size: "153 km",
        skiLifts: 23
      },
      {
        name: "Copper Mountain Resort",
        mountainHeight: "841 m (2926 m - 3767 m)",
        size: "126 km",
        skiLifts: 19
      },
      {
        name: "Keystone",
        mountainHeight: "816 m (2835 m - 3651 m)",
        size: "135 km",
        skiLifts: 14
      },
      {
        name: "Steamboat",
        mountainHeight: "1118 m (2103 m - 3221 m)",
        size: "165 km",
        skiLifts: 17
      },
      {
        name: "Telluride",
        mountainHeight: "1156 m (2659 m - 3815 m)",
        size: "88.2 km",
        skiLifts: 16
      },
      {
        name: "Vail Ski Resort",
        mountainHeight: "976 m (2457 m - 3433 m)",
        size: "234 km",
        skiLifts: 25
      },
      {
        name: "Winter Park Resort",
        mountainHeight: "933 m (2743 m - 3676 m)",
        size: "143 km",
        skiLifts: 22
      }
    ]
  },
  {
    name: "California",
    avgSnow: "3.76 in",
    mountains: [
      {
        name: "Bear Mountain",
        mountainHeight: "579 m (2011 m - 2590 m)",
        size: "67 km",
        skiLifts: 8
      },
      {
        name: "Heavenly",
        mountainHeight: "1059 m (2001 m - 3060 m)",
        size: "94 km",
        skiLifts: 24
      },
      {
        name: "Mammoth Mountain",
        mountainHeight: "945 m (2424 m - 3369 m)",
        size: "89.8 km",
        skiLifts: 25
      },
      {
        name: "Northstar California",
        mountainHeight: "695 m (1929 m - 2624 m)",
        size: "97 km",
        skiLifts: 14
      },
      {
        name: "Snow Summit",
        mountainHeight: "370 m (2130 m - 2500 m)",
        size: "29 km",
        skiLifts: 11
      },
      {
        name: "Snow Valley",
        mountainHeight: "340 m (2050 m - 2390 m)",
        size: "34 km",
        skiLifts: 11
      },
      {
        name: "Squaw Valley",
        mountainHeight: "870 m (1890 m - 2760 m)",
        size: "100 km",
        skiLifts: 24
      },
      {
        name: "Sugar Bowl",
        mountainHeight: "457 m (2098 m - 2555 m)",
        size: "90 km",
        skiLifts: 14
      }
    ]
  },
  {
    name: "Utah",
    avgSnow: "40.99 in",
    mountains: [
      {
        name: "Alta",
        mountainHeight: "615 m (2600 m - 3215 m)",
        size: "116 km",
        skiLifts: 9
      },
      {
        name: "Beaver Mountain",
        mountainHeight: "505 m (2195 m - 2700 m)",
        size: "30 km",
        skiLifts: 4
      },
      {
        name: "Park City Mountain Resort",
        mountainHeight: "969 m (2080 m - 3049 m)",
        size: "250 km",
        skiLifts: 39
      },
      {
        name: "Snowbird",
        mountainHeight: "988 m (2365 m - 3353 m)",
        size: "103 km",
        skiLifts: 11
      },
      {
        name: "Powder Mountain",
        mountainHeight: "611 m (2101 m - 2712 m)",
        size: "135 km",
        skiLifts: 9
      }
    ]
  },
  {
    name: "Oregon",
    avgSnow: "10.91 in",
    mountains: [
      {
        name: "Mount Ashland",
        mountainHeight: "354 m (1932 m - 2286 m)",
        size: "13 km",
        skiLifts: 4
      },
      {
        name: "Mount Bachelor",
        mountainHeight: "1026 m (1737 m - 2763 m)",
        size: "100 km",
        skiLifts: 12
      },
      {
        name: "Mount Hood Meadows",
        mountainHeight: "847 m (1378 m - 2225 m)",
        size: "90 km",
        skiLifts: 11
      },
      {
        name: "Warner Canyon",
        mountainHeight: "238 m (1737 m - 1975 m)",
        size: "9.9 km",
        skiLifts: 1
      }
    ]
  },
  {
    name: "Washington",
    avgSnow: "15.57 in",
    mountains: [
      {
        name: "Badger Mountain",
        mountainHeight: "245 m (2195 m - 2440 m)",
        size: "10 km",
        skiLifts: 5
      },
      {
        name: "Crystal Mountain",
        mountainHeight: "796 m (1341 m - 2137 m)",
        size: "50 km",
        skiLifts: 10
      },
      {
        name: "Echo Valley",
        mountainHeight: "150 m (800 m - 950 m)",
        size: "1.5 km",
        skiLifts: 4
      },
      {
        name: "Mt. Baker",
        mountainHeight: "455 m (1070 m - 1525 m)",
        size: "100 km",
        skiLifts: 10
      },
      {
        name: "Ski Bluewood",
        mountainHeight: "350 m (1380 m - 1730 m)",
        size: "11 km",
        skiLifts: 2
      }
    ]
  },
  {
    name: "Nevada",
    avgSnow: "18.73 in",
    mountains: [
      {
        name: "Diamond Peak",
        mountainHeight: "560 m (2042 m - 2602 m)",
        size: "30 km",
        skiLifts: 6
      },
      {
        name: "Mount Rose",
        mountainHeight: "550 m (2407 m - 2957 m)",
        size: "100 km",
        skiLifts: 6
      }
    ]
  },
  {
    name: "Wyoming",
    avgSnow: "51.00 in",
    mountains: [
      {
        name: "Jackson Hole",
        mountainHeight: "1261 m (1924 m - 3185 m)",
        size: "116 km",
        skiLifts: 13
      },
      {
        name: "Snowy Range",
        mountainHeight: "267 m (2678 m - 2945 m)",
        size: "16.5 km",
        skiLifts: 4
      },
      {
        name: "White Pine",
        mountainHeight: "277 m (2570 m - 2847 m)",
        size: "11.6 km",
        skiLifts: 3
      }
    ]
  }
]

module.exports = states;