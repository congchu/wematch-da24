// 참고 링크: https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url

export const youtubeRegExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/

export const isYoutubeLink = (url: string) => {
  const match = url.match(youtubeRegExp)
  return (match && match[7].length === 11)
}

export const parseYoutubeId = (url: string) => {
  const match = url.match(youtubeRegExp)
  return (match && match[7].length === 11) ? match[7] : ''
}
