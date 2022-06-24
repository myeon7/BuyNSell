import React from 'react';

const ProductCard = (props) => {
  const data = [
    {}
  ];

  return (
    <div className="productCard">
      <h3 className="pname">ProductName</h3>
      <p className="pcategory">Category: </p>
      <p className="pdate">Uploaded: </p>
      <ul>
        <li className="pprice">Price: </li>
        <li className="pcondition">Condition: </li>
        <li className="pzipcode">Location: </li>
        <li className="pstatus">Status: selling</li>
      </ul>
      <p className="pdetails">Details</p>
      <div>
        <button>Report</button>
        <button>Keep</button>
        <button>Buy</button>
      </div>
    </div>
  )
}

export default ProductCard; 