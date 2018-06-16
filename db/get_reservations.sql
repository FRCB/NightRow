SELECT events.event_id, reservation.reservation_id, event_title, event_date, event_time, event_address, event_price
FROM reservation JOIN users ON users.id = reservation.user_id JOIN events ON events.event_id = reservation.event_id
WHERE user_id = $1;