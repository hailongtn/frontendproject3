import React from 'react'
import AddCarForm from '../_components/add-car-form';

export const metadata = {
    title: " Add New Car | Admin ",
    description : " Add a new car to the marketplace"
};

const AddCarPage = () => {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold mb-6"> Add New Car</h1>
      </div>
      <AddCarForm />
    </div>
  )
}

export default AddCarPage;