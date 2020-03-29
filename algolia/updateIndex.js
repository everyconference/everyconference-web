
import axios from 'axios'
import algoliasearch from 'algoliasearch';

async function updateIndex() {

  const client = algoliasearch('FE3LXVPW06', process.env.ADMIN_KEY);
  const index = client.initIndex('everyconference_conferences');

  const { data: conferences } = await axios.get('https://raw.githubusercontent.com/tech-conferences/conference-data/master/conferences/2020/javascript.json');

  index.saveObjects(conferences, { autoGenerateObjectIDIfNotExist: true });

  return 'index updated';
}

updateIndex().then(log => console.log(log));
