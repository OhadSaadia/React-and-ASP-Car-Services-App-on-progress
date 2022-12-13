import React from 'react';
import SelectComp from './SelectComp';

function SortComp() {
    const sortOptions = ["Lowest Price" , "Highest Price" , "From A-Z", "From Z-A"];
    return ( 
        <div>
            <SelectComp title="Sort By" options={sortOptions}/>
        </div>
     );
}

export default SortComp;