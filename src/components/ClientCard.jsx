import React, { useState, useEffect } from 'react';

function ClientCard({ client }) {
  return (
    <div className="client-card">
      <h2>{client.firstname} {client.lastname}</h2>
      <p>Height: {client.height}</p>
      <p>Weight Start: {client.weightStart}</p>
      <p>Weight Goal: {client.weightGoal}</p>
      <p>Sex: {client.sex === 1 ? 'Male' : 'Female'}</p> 
    </div>
  );
}

export default ClientCard;
