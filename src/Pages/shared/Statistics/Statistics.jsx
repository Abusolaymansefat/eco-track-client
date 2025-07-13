import React from "react";

const Statistics = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Site Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className=" p-4 rounded shadow">
          <p className="text-xl font-semibold">Total Users</p>
          <h3 className="text-3xl">128</h3>
        </div>
        <div className=" p-4 rounded shadow">
          <p className="text-xl font-semibold">Total Products</p>
          <h3 className="text-3xl">342</h3>
        </div>
        <div className=" p-4 rounded shadow">
          <p className="text-xl font-semibold">Total Revenue</p>
          <h3 className="text-3xl">$4,560</h3>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
