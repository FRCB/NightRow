UPDATE events
SET event_title = $1,
    event_date = $2,
    event_time = $3,
    event_address = $4,
    event_about = $5,
    event_contact = $6,
    event_price = $7
WHERE event_id = $8;
SELECT *
FROM events
WHERE event_id = $8;