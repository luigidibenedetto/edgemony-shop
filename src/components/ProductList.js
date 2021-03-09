import { useState } from "react";
import { PropTypes } from "prop-types";
import Product from "./Product";
import Search from "./Search";

import "./ProductList.css";
import CategoriesFilter from "./CategoriesFilter";

function ProductList({ products, categories, openModalProduct }) {
  const [searchTerm, setSearchTerm] = useState();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const termRegexp = new RegExp(searchTerm, "i");
  const filteredProducts = products.filter(
    (product) =>
      product.title.search(termRegexp) !== -1 &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.category))
  );

  return (
    <div className="ProductList">
      <div className="ProductList__filters">
        <Search term={searchTerm} onSearch={setSearchTerm} />
        <CategoriesFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onSelectCategory={setSelectedCategories}
        />
      </div>
      <div className="ProductList__products">
        {filteredProducts.map((product) => (
          <Product
            product={product}
            key={product.id}
            openModalProduct={() => openModalProduct(product)}
          />
        ))}
      </div>
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  openModalProduct: PropTypes.func.isRequired,
};

export default ProductList;
