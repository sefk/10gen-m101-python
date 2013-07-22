// Removing Rural Residents 

// In this problem you will calculate the number of people who live
// in a zip code in the US where the city starts with a digit. We will
// take that to mean they don't really live in a city. Once again, you
// will be using the zip code collection you imported earlier.

// The project operator can extract the first digit from any field.
// For example, to extract the first digit from the city field, you
// could write this query:

// db.zips.aggregate([
//     {$project: 
//      {
//     first_char: {$substr : ["$city",0,1]},
//      }	 
//    }
// ])

// Using the aggregation framework, calculate the sum total of people
// who are living in a zip code where the city starts with a digit.
// Choose the answer below.

// Note that you will need to probably change your projection to send
// more info through than just that first character. Also, you will
// need a filtering step to get rid of all documents where the city
// does not start with a digital (0-9).


db.zips.aggregate([
    {$project: {first_char: {$substr:["$city",0,1]},
                city: "$city",
                pop: 1}},
    {$match:   {first_char:{$gte:"0"}, first_char:{$lte:"9"}}},
    {$group:   {_id: 1,
                total_pop: {$sum: "$pop"}}},
    {$project: {_id: 0,
                total_pop: 1}}
])

