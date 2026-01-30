import React from 'react';
import * as BookingsData from '@/lib/bookings-data'; 

export default function PartnerDashboard() {
  const bookings = (BookingsData as any).bookings || [];

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Tableau de bord Stayfloow</h1>
      <p>Bienvenue dans votre espace partenaire.</p>
      
      <div style={{ marginTop: '20px', border: '1px solid #eee', padding: '15px' }}>
        <h2>Activités récentes</h2>
        {bookings.length > 0 ? (
          <ul>
            {bookings.slice(0, 5).map((item: any, index: number) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                {item.name || "Réservation en cours"}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune donnée à afficher pour le moment.</p>
        )}
      </div>
    </div>
  );
}
