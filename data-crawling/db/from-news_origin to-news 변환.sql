INSERT INTO news (company_id, date, content)
(
	SELECT 	9,
			news_date,
			news_content
	FROM news_origin
    WHERE news_name="I IT"
);