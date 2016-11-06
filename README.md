# Votation-Visualisation

## Abstract
What is the impact of municipalities with more than 50% foreigners on the results of different referendums in Switzerland?
In Switzerland, each civilian older that 18years old can vote several times by year on different referendums. To pass, one referendums must get the majority of the population and also be accepted in the majority of the cantons.

We want to build a tool to visualise the result of a referendums in each municipality. The user will have the ability to remove municipalities with certain attributes to see the impact they have on the outcome of the referendum. He will be able to see the impact of the municipality with more that 10'000 inhabitants or the impact of the one with more men than women ...
The visualisation should be 'general-purpose'. That means any data that is available for all municipalities can be added and used to filter the municipalities.



## Data Description
Votation and referendum results for each municipality since ever: (https://www.bfs.admin.ch/bfs/de/home/statistiken/politik.html)

Different informations for each municipality:
  - Inhabitants, area, economy, politics: http://www.chgemeinden.ch/fr/service/statistiques-des-communes/index.php
  - Different kind of informations about municipalities: inhabitants, area, agriculture, criminality, ...
   https://www.pxweb.bfs.admin.ch/Default.aspx?px_language=fr
  - maybe wikipedia.

## Feasibility and Risks
There are two main difficulties:

  1. Aquiring good data. The difficulty here is that there are about 2,500 municipalities and we have to scrape/download the data from different platforms that may not represent the data in the same way. We expect to spend a lot of time on this particular point.

  2. The visualisation should be easy to use and informative at the same time. This is especially hard since we want to be able to add any data concerning the municipalities, from the number of inhabitants to the number of Mc Donalds.

Other smaller problems are:
- making the visualisation fast enough (the numbers must be recalculated everytime the user changes something)
- Find (and learn) the technologies to make a nice visualisation.


## Deliverables
The visualisation and if required a small report about the project.

## Timeplan
Assuming the deadline is at the end of january:
- We will start as soon as possible to locate and download the most important data
- Once we have some insight in the data (especially the features) we start to plan the visualisation. In particular the technologies to use (web-app?) and the design (how to add data, how should it look like etc.)
- Then we implement it. We hope that we can start with this point before the middle of December, since this point probably takes the most time.
- If we have time, it would be interesting to find some especially important features.
- And then we go skiing :)
