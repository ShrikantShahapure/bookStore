import React from "react";
import { CartState } from "../context/Context";
import SingleProduct from "./SingleProduct";
import "./style.css";
import Filter from "./Filter";

const Home = () => {
  // const {
  //   state: { products },
  //   productsState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  // } = CartState();

  const {
    state: {products},
    productstate: { byStock, byFastDelivery, sort, byRating, searchQuery},
    productDispatch,
  } = CartState();
 

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.byFastDelivery);
    }

    if (byRating) {
      sortedProducts =
        sortedProducts.filter((prod) => prod.ratings) >= byRating;
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <div className="home">
      {/* filter the products */}
      <Filter />
      <div className="productContainer">
        {transformProducts().map((prod) => {
          return <SingleProduct prod={prod} key={prod.id} />;
        })}
      </div>
    </div>
  );
};

export default Home;


// import { CartState } from "../context/Context";
// import Filter from "./Filter";
// import SingleProduct from "./SingleProduct";

// const Home = () => {
//   const {
//     state: { products },
//     productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
//   } = CartState();

//   const transformProducts = () => {
//     let sortedProducts = products;

//     if (sort) {
//       sortedProducts = sortedProducts.sort((a, b) =>
//         sort === "lowToHigh" ? a.price - b.price : b.price - a.price
//       );
//     }

//     if (!byStock) {
//       sortedProducts = sortedProducts.filter((prod) => prod.inStock);
//     }

//     if (byFastDelivery) {
//       sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
//     }

//     if (byRating) {
//       sortedProducts = sortedProducts.filter(
//         (prod) => prod.ratings >= byRating
//       );
//     }

//     if (searchQuery) {
//       sortedProducts = sortedProducts.filter((prod) =>
//         prod.name.toLowerCase().includes(searchQuery)
//       );
//     }

//     return sortedProducts;
//   };

//   return (
//     <div className="home">
//       <Filter />
//       <div className="productContainer">
//         {transformProducts().map((prod) => (
//           <SingleProduct prod={prod} key={prod.id} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;