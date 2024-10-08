import React from 'react';
import './App.css';
import ItemTable from './components/ItemTable';

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Item List</h1>
            <ItemTable />
        </div>
    );
}

export default App;