//按需引入组件

//eslint-disable-next-line
const echarts = equire([
  'bar',
  'legend',
  'graphic',
  'title',
  'color',
  'tooltip',
  'line',
  'pie'
])

export default echarts;
