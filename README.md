# ns-open-data

## A new way to explore Nova Scotia’s data with an Index Dashboard

![Index Dashboard](https://github.com/lucaspetry/ns-open-data/blob/master/repo/dashboard.png)

### Table of contents
* [General info](#general-info)
* [Team Members](#team-members)
* [Motivation](#motivation)
* [Technologies](#technologies)
* [Setup](#setup)


### General info
This project was developed as part of the 3rd Nova Scotia Open Data Contest.
The idea of the Index Dashboard and this prototype were developed over the weekend of March 1-3, 2019.

### Team Members
* Alessandra Maciel Paz Milani
* Lucas May Petry
* Mateus Malvessi Pereira


### Motivation
There are no precedents for so much data available in our history: it is the big data era. However, it is still challenging to obtain meaningful knowledge from all this data and make decisions based on that. To take the open data to the next level, we propose an Index Dashboard to be used by government agents, data analysts, or any citizens. It is planned to be an extension for the current Nova Scotia Government’s Open Data Portal. By combining different variables from different datasets, besides being a collaborative tool for exploring the available data, our tool supports the decision making process of public strategies and organizational goals. We take advantage of visual analytics tools for visualizing the geographic distribution of different indexes and their evolution over time. Indexes support measuring efficiencies/inefficiencies, and show trends for any category, or domain, such as crime, education, and healthcare.


### Technologies
Project is created with:
* Python, Pandas, and Numpy for data preprocessing and exploration; 
* HTML, CSS, Javascript, and Bootstrap for the front end layer; 
* D3 for data visualization (map, pie, bar and line charts). 


### Setup
To run this project, clone the project to your local machine.
<br />Navigate to the project folder and start the server, for example: E:\workspace\ns-open-data>python -m http.server
<br />On Chrome new tab type http://localhost:8000/
<br />For Firefox it works opening direct the index.html file.
