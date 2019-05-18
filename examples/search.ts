import { Jackett } from '../src';

(async () => {
  const j = new Jackett('https://jackett.example.com', 'apiKey');
  const r = await j.search('big bang theory');
  console.log(r.Results[0].Title);
})();
