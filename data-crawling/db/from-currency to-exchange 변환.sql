INSERT INTO exchange (national_code, date, price)
(
	SELECT "미국", cur_date, cur_rate
    FROM currency
    WHERE cur_name = "달러"
);

INSERT INTO exchange (national_code, date, price)
(
	SELECT "유럽 연합", cur_date, cur_rate
    FROM currency
    WHERE cur_name = "유로"
);

INSERT INTO exchange (national_code, date, price)
(
	SELECT "일본", cur_date, cur_rate
    FROM currency
    WHERE cur_name = "100엔"
);