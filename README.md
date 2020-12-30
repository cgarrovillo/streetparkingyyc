# openParkingYYC
 
Small REST API that uses Open Data Calgary's parking API to see if a spot is good to park in.
Based on the parking_zone, we can determine if a spot is open to be parked in based on the following conditions:
 - Parking Zone Status (Must be 'Active')
 - Specific restrictions that are enforced given a time frame
 - Whether any restrictions are active at the time of query
 
Using this info, we can deduce whether a spot is okay to be parked in and whether there are any special restrictions to be aware about.

Endpoints:

Endpoint | Info
---------|------
/simple | Gives minimal info regarding a parking_zone, only details that users of this API would care about (canIParkhere)
/detailed | Gives more info regarding the parking_zone, including the returned value of calling Open Data Calgary


Possible Query Options:

Query | Arguments | Example
------|-----------|----------
?zone= | String containing the parking zone you'd like to know about | /simple?zone=1000

