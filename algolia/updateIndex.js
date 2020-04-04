
const axios = require('axios');
const algoliasearch = require('algoliasearch');

function getTags(conference) {
  const tags = {
    angular: conference.name.toLowerCase().includes('angular') || conference.name.toLowerCase().includes('ng-'),
    react: conference.name.toLowerCase().includes('react'),
    vue: conference.name.toLowerCase().includes('vue'),
    node: conference.name.toLowerCase().includes('node')
  };
  return Object.keys(tags).filter(tag => tags[tag])
}

function getConferenceDate (conference) {
  const monthnames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const start = new Date(conference.startDate)
  const end = new Date(conference.endDate)
  if (start.getMonth() !== end.getMonth()) {
    return start.getDate() + ' ' + monthnames[start.getMonth()] +
      ' - ' + end.getDate() + ' ' + monthnames[end.getMonth()] +
      ' ' + start.getFullYear()
  } else if (start.getDate() !== end.getDate()) {
    return start.getDate() + ' - ' + end.getDate() +
      ' ' + monthnames[start.getMonth()] +
      ' ' + start.getFullYear()
  } else {
    return start.getDate() + ' ' + monthnames[start.getMonth()] + ' ' + start.getFullYear()
  }
}

async function updateIndex() {

  const client = algoliasearch('FE3LXVPW06', process.env.ADMIN_KEY);
  const index = client.initIndex('everyconference_conferences');

  const { data } = await axios.get('https://raw.githubusercontent.com/tech-conferences/conference-data/master/conferences/2020/javascript.json');

  const conferences = data.map(conference => ({
    ...conference,
    startTimestamp: Math.floor((new Date(conference.startDate)).getTime() / 1000),
    endTimestamp: Math.floor((new Date(conference.endDate)).getTime() / 1000),
    confdate: getConferenceDate(conference),
    _tags: getTags(conference)
  }));

  index.replaceAllObjects(conferences, { safe: true, autoGenerateObjectIDIfNotExist: true });

  return 'index updated';
}

// since the index is currently up to date, do not rebuild the index every time
// updateIndex().then(log => console.log(log));
