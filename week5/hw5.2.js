//Crunching the Zipcode dataset

//Please download the zips.json dataset and import it into a collection of your choice. 

//Please calculate the average population of cities in California
//(abbreviation CA) and New York (NY) (taken together) with populations
//over 25,000.

//For this problem, assume that a city name that appears in more than
//one state represents two separate cities
 
db.zips.aggregate([ 
    {$match: {"state": {$in: ["NY", "CA"]}}},
    {$group: {"_id": {"state":"$state", "city":"$city"},
              "citypop": {$sum:"$pop"}}},
    {$match: {"citypop": {$gt:25000}}},
    {$group: {"_id": 1,
              "average_population": {$avg:"$citypop"}}},
    {$project: {"_id":0, 
                "average_population":1}}
])




