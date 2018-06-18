INSERT INTO events
    ( event_cat, event_title, event_date, event_time, event_address, event_about, event_contact, event_price, event_lat, event_lng )
VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
SELECT *
FROM events;
