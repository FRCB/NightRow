SELECT *
FROM categories JOIN events ON cat_id = event_cat
WHERE cat_name = $1;
;