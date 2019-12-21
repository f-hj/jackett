import { Jackett } from "../src"

(async () => {
  const j = new Jackett("https://jackett.example.com", "apiKey")
  const r = await j.search("Mr. Robot S4E7 407 Proxy Authentication Required")
  console.log(r.Results[0].Title)
})()
