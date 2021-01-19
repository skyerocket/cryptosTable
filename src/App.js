import { listCryptos } from './graphql/queries';
import './App.css';
import Amplify,  { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import _ from 'lodash';

Amplify.configure(awsconfig);

function App() {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    fetchCryptos();
}, []);

  const fetchCryptos = async () => {
    try {
        const data = await API.graphql(graphqlOperation(listCryptos, {"limit": 5000}));
        const list = data.data.listCryptos.items;
        console.log('list', list);
        const results = dealWithData(list);
        console.log('results', results);
        setCryptos(results);
    } catch (error) {
        console.log('error on fetching data', error);
    }
  };

  const dealWithData = data => {
    const results = [];
    const groupby = _.groupBy(data, row => {
      return row.currency;
    });
    for (let currency in groupby) {
      const sortby = groupby[currency].sort((a,b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateB - dateA
      })
      let latest = sortby[0];
      let diff24 = sortby[1];
      let diff7 = sortby[6];
      const result = {
        "currency": latest.currency,
        "price": latest.close,
        "diff24": `${((latest.close - diff24.close)/latest.close * 100).toFixed(1)}%`,
        "diff7": `${((latest.close - diff7.close)/latest.close * 100).toFixed(1)}%`,
        "diffV": `${parseInt(latest.volume - diff24.volume).toLocaleString()}`,
        "marketCap": parseInt(latest.marketCap).toLocaleString()
      }
      results.push(result)
    }
    return results
  }

  const columns = [
    {
     name: "currency",
     label: "Currency",
     options: {
      filter: false,
      sort: true,
     }
    },
    {
     name: "price",
     label: "Price",
     options: {
      filter: false,
      sort: true,
     }
    },
    {
     name: "diff24",
     label: "24h",
     options: {
      filter: false,
      sort: true,
     },
    },
    {
      name: "diff7",
      label: "7d",
      options: {
       filter: false,
       sort: true,
      },
     },
     {
      name: "diffV",
      label: "24h Volume",
      options: {
       filter: false,
       sort: true,
      },
     },
     {
      name: "marketCap",
      label: "Mkt Cap",
      options: {
       filter: false,
       sort: true,
      },
     },
   ];
     
   const options = {
     filterType: 'checkbox',
   };
   

  return (
    <div className="App">
      <MUIDataTable
        title={"Crypto Data"}
        data={cryptos}
        columns={columns}
        options={options}
      />
    </div>
  );
}

export default withAuthenticator(App);
