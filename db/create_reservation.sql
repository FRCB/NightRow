INSERT INTO reservation
    (user_id, event_id)
VALUES
    ($1, $2);
SELECT *
FROM reservation;