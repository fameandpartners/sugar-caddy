import React from 'react';

const ProductHeading = () => (
  <div className="flex px-6 py-2 items-center">
    <div className="w-8 mr-2" />
    <div className="w-32 mr-2 text-sm font-light">Code</div>
    <div className="flex-1 w-1/6 mr-2 text-sm font-light">Name</div>
    <div className="w-24 mr-2 text-sm font-light">Pricing</div>
    <div className="w-24 mr-2 text-sm font-light">Colors</div>
    <div className="w-24 mr-2 text-sm font-light">Images</div>
    <div className="w-24 mr-2 text-sm font-light truncate">Customizations</div>
    <div className="w-24 mr-2 text-sm font-light truncate">Old Customizations</div>
    <div className="w-16" />
  </div>
);

export default ProductHeading;
