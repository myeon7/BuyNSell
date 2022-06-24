import React, {Component} from 'react';
import ProductList from './components/ProductList.jsx';
import Header from './components/Header.jsx';
import Navbar from './components/Navbar.jsx';
import './stylesheets/main.scss';

import CreateProduct from './components/CreateProduct.jsx';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <ProductList />
        <CreateProduct />
      </div>
    );
  };
};

export default App;