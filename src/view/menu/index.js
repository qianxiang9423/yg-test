import './index.less'

// $(function () {
//   let datePlan = [
//     {
//       morning: [
//         {
//           time: "00:11",
//           program: "寻宝-文脉春秋-19"
//         },
//         {
//           time: "00:50",
//           program: "纪录片瞬间中国-农耕探文明13"
//         },
//         {
//           time: "01:20",
//           program: "人与自然-2024-217"
//         },
//         {
//           time: "01:49",
//           program: "晚间新闻"
//         },
//         {
//           time: "02:19",
//           program: "精彩一刻-共和国之恋"
//         },
//         {
//           time: "02:25",
//           program: "2024秘境之眼-华中秘境(4K)"
//         },
//         {
//           time: "02:35",
//           program: "2024秘境之眼-虎影探秘(4K)"
//         },
//         {
//           time: "02:45",
//           program: "非遗里的中国-MV"
//         }
//       ],
//       afternoon: [
//         {
//           time: "12:35",
//           program: "寻宝-文脉春秋-5"
//         },
//         {
//           time: "13:11",
//           program: "暗夜与黎明第15集"
//         },
//         {
//           time: "13:59",
//           program: "暗夜与黎明第16集"
//         },
//         {
//           time: "14:51",
//           program: "暗夜与黎明第17集"
//         },
//         {
//           time: "15:40",
//           program: "暗夜与黎明第18集"
//         },
//         {
//           time: "16:30",
//           program: "精彩一刻-共和国之恋"
//         },
//         {
//           time: "16:37",
//           program: "正大综艺-2024-36"
//         }
//       ]
//     }
//   ]

//   datePlan.forEach((item) => {
//     let $morningDiv = $(`<div><div class="time-title">上午(00:00 - 12:00)</div></div>`)
//     item.morning.forEach((programItem) => {
//       console.log(programItem)
//       $($morningDiv).append(`<div class="tile-item">
//               <span>${programItem.time}</span>
//               <span>${programItem.program}</span>
//           </div>`)
//     })

//     let $afternoonDiv = $(`<div><div class="time-title">下午(12:00 - 24:00)</div></div>`)
//     item.afternoon.forEach((programItem) => {
//       console.log(programItem)
//       $($afternoonDiv).append(`<div class="tile-item">
//             <span>${programItem.time}</span>
//             <span>${programItem.program}</span>
//         </div>`)
//     })

//     $(".right").append($morningDiv, $afternoonDiv)
//   })
// })


