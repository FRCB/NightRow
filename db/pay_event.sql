SELECT event_price
from events JOIN reservation ON reservation.event_id = events.event_id
WHERE reservation_id  = $1;
