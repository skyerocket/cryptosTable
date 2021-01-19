import { listCryptos } from './graphql/queries';
import './App.css';
import Amplify,  { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";


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
        setCryptos(list);
    } catch (error) {
        console.log('error on fetching data', error);
    }
  };

  const columns = [
    {
     name: "id",
     label: "ID",
     options: {
      filter: false,
      sort: true,
     }
    },
    {
     name: "currency",
     label: "Currency",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "date",
     label: "Date",
     options: {
      filter: false,
      sort: false,
     }
    },
    {
     name: "open",
     label: "Open",
     options: {
      filter: false,
      sort: true,
     },
    },
    {
      name: "high",
      label: "High",
      options: {
       filter: false,
       sort: true,
      },
     },
     {
      name: "low",
      label: "Low",
      options: {
       filter: false,
       sort: true,
      },
     },
     {
      name: "close",
      label: "Close",
      options: {
       filter: false,
       sort: true,
      },
     },
     {
      name: "volume",
      label: "Volume",
      options: {
       filter: false,
       sort: true,
      },
     },
     {
      name: "marketCap",
      label: "Market Cap",
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

export default App;
