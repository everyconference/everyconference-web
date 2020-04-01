
const axios = require('axios');
const algoliasearch = require('algoliasearch');

async function updateIndex() {

  const client = algoliasearch('FE3LXVPW06', process.env.ADMIN_KEY);
  const index = client.initIndex('everyconference_conferences');

  const { data } = await axios.get('https://raw.githubusercontent.com/tech-conferences/conference-data/master/conferences/2020/javascript.json');

  const conferences = data.map(item => ({
    ...item,
    startTimestamp: Math.floor((new Date(item.startDate)).getTime() / 1000),
    endTimestamp: Math.floor((new Date(item.endDate)).getTime() / 1000)
  }))

  index.replaceAllObjects(conferences, { safe: true, autoGenerateObjectIDIfNotExist: true });

  return 'index updated';
}

// since the index is currently up to date, do not rebuild the index every time
// updateIndex().then(log => console.log(log));
