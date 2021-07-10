import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterProducts, sortProducts } from '../actions/productActions';

const Filter = () => {
  const products=useSelector(state=>state.products)
  const{items,sort,size,filteredItems}=products
  const dispatch=useDispatch()
  return (
    <div>
      {
         !filteredItems ? (
          <div>Loading...</div>
        ) : (
          <div className="filter">
            <div className="filter-result">
              {filteredItems.length} Products
            </div>
            <div className="filter-sort">
              Order{" "}
              <select
                value={sort}
                onChange={(e) =>
                  dispatch(sortProducts(filteredItems, e.target.value
                  ))
                }
              >
                <option value="latest">Latest</option>
                <option value="lowest">Lowest</option>
                <option value="highest">Highest</option>
              </select>
            </div>
            <div className="filter-size">
              Filter{" "}
              <select
                value={size}
                onChange={(e) =>
                  dispatch(filterProducts(items, e.target.value))
                }
              >
                <option value="">ALL</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Filter;


 