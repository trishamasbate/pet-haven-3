import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKINGS } from '../utils/queries';

const Profile = () => {
  const userId = "CURRENT_USER_ID"; // Replace this with the actual user ID
  const { loading, error, data } = useQuery(GET_BOOKINGS, {
    variables: { userId },
  });

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">Error: {error.message}</p>;

  const bookings = data.bookings || [];

  return (
    <main className="mt-16 p-4 pt-20"> {/* Add margin-top and padding */}
      <div className="flex flex-col items-center">
        <div className="max-w-2xl w-full my-3">
          <h1 className="text-4xl font-bold">Your Profile</h1>
          <h2 className="text-2xl my-2">Upcoming Bookings</h2>
          {bookings.length > 0 ? (
            <ul>
              {bookings.map((booking) => (
                <li key={booking.id} className="border rounded-lg p-4 shadow-md my-2">
                  <p>Booking ID: {booking.id}</p>
                  <p>Date: {booking.bookingDate}</p>
                  <p>Status: {booking.status}</p>
                  <h3 className="font-semibold">Services:</h3>
                  <ul>
                    {booking.services.map((service) => (
                      <li key={service.id}>
                        {service.name} - ${service.price}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming bookings.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;