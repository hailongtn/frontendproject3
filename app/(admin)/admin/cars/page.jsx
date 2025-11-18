import React from 'react'
import CarsList from './_components/car-list';

export const metadata = {
    title: 'Admin - Cars',
    description : "Manage cars in the admin panel"
}

const CarsPage  = () => {
  return ( 
  <div>
     <h1 className="text-2xl font-bold mb-6">Cars Management</h1>
     <CarsList />
  </div>
  );
}

export default CarsPage;