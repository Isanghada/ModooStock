SELECT * FROM access_db.chart;

INSERT INTO chart (price_before, price_end, date, company_id) 
(
	SELECT stock_rate + IF(stock_state = "up", -stock_change, IF(stock_state = "down", stock_change, 0)), 
		   stock_rate, 
           stock_date, 
           9
    FROM stock
    WHERE stock_name = "I IT"
);