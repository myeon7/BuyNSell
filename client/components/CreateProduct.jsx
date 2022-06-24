import React from 'react';

const CreateProduct = props => {
  return (
    <div id="createProduct">
      <form>
        <label>
            Seller: <span>"Autofilled User Name"</span><br/>
            Product: <input type="text" name="name" /><br/>
            Category: <input type="text" /><br/>
            Price: <input type="text" /><br/>
            Location: <input type="text" /><br/>
            Details: <input type="text" /><br/>
            <input type="checkbox"checked='pickup'/> Pickup
            <input type="checkbox"checked=''/> Delivery
            <input type="checkbox"checked=''/> Shipping<br/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
};

export default CreateProduct;
