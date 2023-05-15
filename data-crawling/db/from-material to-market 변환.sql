INSERT INTO market (date, standard_type, price) 
(
	SELECT 	material_date,
			"유가",
            ROUND(AVG(material_rate), 2)
    FROM material
    WHERE material_name = "휘발유" OR material_name = "경유"
    GROUP BY material_date
);

INSERT INTO market (date, standard_type, price) 
(
	SELECT 	material_date,
			"금",
            material_rate
    FROM material
    WHERE material_name = "국내금(원/g)"
    GROUP BY material_date
);