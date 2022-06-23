
SELECT NEWID()
DECLARE @bsuserID uniqueidentifier 
SET @bsuserID = NEWID()

INSERT INTO bsuser VALUES (@bsuserID, 'Matthew', 'Yeon', 25, 'GA', 30329, '1579 Avenue Place');
