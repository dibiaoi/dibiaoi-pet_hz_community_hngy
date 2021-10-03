const handleDate = str => {
  const year = str.slice(0, 4)
  const month = str.slice(5, 7)
  const day = str.slice(8, 10)
  const time = str.slice(11, 19)
  const allTime = year + '-' + month + '-' + day + ' ' + time

  // year + '年' + month + '月' + day + '日  ' + time
  return getTimer(allTime)
}
const getTimer = stringTime => {
  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24
  const week = day * 7
  const month = day * 30
  const time1 = new Date().getTime() //当前的时间戳
  // console.log(time1)
  const time2 = Date.parse(new Date(stringTime)) //指定时间的时间戳
  // console.log(time2)
  const time = time1 - time2

  let result = null
  if (time < 0) {
    alert('设置的时间不能早于当前时间！')
  } else if (time / month >= 1) {
    result = stringTime
  } else if (time / week >= 1) {
    result = stringTime
  } else if (time / day >= 1) {
    result = '发布于 ' + parseInt(time / day) + '天前'
  } else if (time / hour >= 1) {
    result = '发布于 ' + parseInt(time / hour) + '小时前'
  } else if (time / minute >= 1) {
    result = '发布于 ' + parseInt(time / minute) + '分钟前'
  } else {
    result = '刚刚 '
  }
  return result
}
export default handleDate
