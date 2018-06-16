DELETE FROM events
WHERE event_id = $1;
SELECT *
FROM events;