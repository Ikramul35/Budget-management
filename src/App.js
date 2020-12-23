import React, { Fragment } from 'react';

import ListTrans from './components/ListTrans/ListTrans';
import Addbutton from './components/Addbutton/Addbutton';

function App() {
    const containerStyle = { position: 'relative', height: '100vh' };

    return (
        <Fragment>
            <div className="container-fluid pt-3" style={containerStyle}>
                <h1 className="text-center mb-5 ">All Transactions</h1>
                <ListTrans />
                <Addbutton />
            </div>
        </Fragment>
    );
}

export default App;
