DELETE FROM reservation
WHERE reservation_id = $1;
SELECT *
FROM reservation;