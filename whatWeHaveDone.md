# What we have done

#Preprocessing
We found all the data on [Office Federal des Statistique](https://www.pxweb.bfs.admin.ch/Default.aspx?px_language=fr). It is possible to find a lots of data such as information Population or politique.


The hardest part was the 'fusions' (merging) of municipalities. Indeed fusion happen quiet often in Switzerland (for example 2324 municipalities in 2015 for 2294 in 2016). Each time a fusion append, the OFS applies the fusion for all data collected during the previous years. For example 2 communes A with 1000 inhabitants and B with 1000 inhabitants in 2015 and that merged in C in 2016, will never again appear in 2015 or before as A and B but as C as if they never existed. Since we were not able to find a topojson of 2016, we used one of 2015 that still contains the municipalities A and B. So our task was to find the fusion of each yeah and create a table that were able to decompose the fusions and then we could find the for each municipalities for each year.

The OFS has a lot of inconsistency in their data. As explained before the fusion was problematic but the worst was the fact that the fusion was not always applied of note always a the same time. Sometimes it was only with the fusion before 01.01.2016 sometimes it was before 10.04.2016 (apparently it's possible to merge in the middle of a year) and sometime the data was not updated.

The second inconsistency was the type of data. A columns of number of 'yes' for a vote could contains integer, float (with unnecessary 0 such as 10.000000) or also string. Pandas was not always able to convert everything easily. 









# Run the server

1. Install node js
2. Install npm
3. Run the server
```
node_modules/http-server/bin/http-server -p 8008
```
4. Follow the generated link
