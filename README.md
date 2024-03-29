# Scent Angels
We have created a website that uses machine learning to predict if a perfume is for men, women or unisex based on perfume notes. Try our “Perfume Designer” App where you can create your perfume and see which gender it would be ideal for.
A brief introduction to our website development is here: https://docs.google.com/presentation/d/1kLpmB_BrK-Ui5TlWWvtS06L78TBK4_cAGl9DQRv548c/edit#slide=id.gbf44f01a53_0_25  
Check out our LIVE Heroku Webpage here: https://scent-angels.herokuapp.com/

## Find Your Favorite Scent! 
![Title](images/ScentAngels.png)

## Table of contents
* [General Info](#general-info)
* [Data Sources](#data)
* [Technologies](#technologies)
* [Libraries & Dependencies](#libraries)
* [Data Selection, Processing & Cleanup](#data-processing)
* [Machine Learning Development](#machine-learning)
* [Tableau Development](#tableau)
* [Perfume Designer App](#web-app)
* [Setup](#setup)
* [Lessons Learned](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info
### Team Members:
- [Chloe Veras](https://github.com/cveras33)
- [Deepa Vadakan](https://github.com/deepavadakan)
- [Jennifer Dean](https://github.com/Jen-Dean)
- [Jessi Volosin](https://github.com/jvolosin)
- [Kasey Lacerda](https://github.com/KLacerda08)
- [Osvaldo (Ozzie) Mauricio Moreno](https://github.com/sir-omoreno)

## Data and Information Sources

#### Web Scraping Data
- [Fragrantica](https://www.fragrantica.com/)
#### Perfume Terminology
- [Fragrantica](https://www.fragrantica.com/)
- [Bella Aire Creations](https://www.belleairecreations.com/fragrance-terminology-guide/)

## Technologies
* Python
* Flask
* JavaScript
* HTML/ CSS
* Bootstrap
* JSON
* MongoDB
* Heroku

## Libraries and Dependencies

**Python Dependencies**
* BeautifulSoup
* Flask
* Flask_pymongo
* Json
* Matplotlip
* Numpy
* Pandas
* Pprint 
* Pymongo
* Re
* Requests
* Splinter
* Selenium
* Seaborn
* Sklearn
* Tensorflow
* Time
* Webdriver_manager.chrome

**JavaScript Dependencies**
* D3 Javascript
* D3 ToolTip

**HTML and CSS Dependencies**
* [Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
* [Bootstrap Stylesheet](https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css)

## Data Selection, Processing & Cleanup
### Selecting the Data Source 
The fragrantica.com website provided information on perfumes/cologne available for sale, including the following:
- Fragrance name and designer 
- Fragrance image
- Main accords
- Top notes, middle notes, and base notes 
- Perfume rating out of 5
- Sillage and Longevity
- Price Value
- Gender

### Web Scraping 
We initially created web-scraping code to gather all perfumes from the fragrantica.com website. However, on the main search page when the "see more results" button was clicked, the page maxed out at 1,000 perfumes, despite having over 60,000 perfumes on record. We rewrote our code to scrape the data by year in a effort to gather as many perfumes as possible, presuming that no more than 1000 perfumes would have been developed in any one year (from the 1920s through 2020). If more than 1,000 perfumes were produced in a single year, the then those extra perfumes would not be reflected in our database. Additionally, due to other web scraping limitations, we were able to scrape a total of 517 perfumes during the project timeframe. 

We also scraped all available perfume notes, for a total of 1,012. 

### Processing and Cleanup 
- Performed web scraping in jupyter notebook using BeautifulSoup, Splinter, and selenium
- Scraped perfume_data was converted data to a dictionary or list of dictionaries and exported to a json file.
- Scraped perfume_notes were converted to a csv file
- Combined json files from multiple web scrapes in a jupyter notebook, and exported combined json file to MongoDB to create the perfume_notes collection. 
- Imported the csv into jupyter notebook; cleaned columns to optimize export to MongoDB; and exported csv  

## Machine Learning Development

Based on the perfume notes, we wanted to check if we could predict if the perfume is for men, women or unisex.

We loaded the perfume data from MongoDB. The perfume notes are divided as top, middle and base notes. Each of these fields is a list. So we had to use MultiLabelBinarizer to create a feature column for each note based on whether it was present as a top, middle or base note.

![MultiLabelBinarizer](images/MultiLabelBinarizer1.png "MultiLabelBinarizer")

If a note was not an ingredient in the perfume, it was marked as 0, otherwise it was marked as 1. We decided to use only notes as features. Accords are a combination of notes, so we dropped that as a feature. Longevity, Sillage, gender vote and price value does not affect the outcome of whether the perfume is for a particular gender, so we skipped those as features as well. After dropping unnecessary columns from the perfume dataframe, the resulting was X(data), which are all the features, and y(target), which was if the perfume was for men, women or unisex. 

A dataframe was created listing all the features and uploaded to MongoDB, which is used later app.py. Another dataframe with all the notes from the perfumes in the perfume_data collection was created and added to MongoDB as notes_features. This is used for the list of notes on the "Create A Frangrance" page.

We also looked at the feature importance, but did not remove any since they had almost the same importance.

![FeatureImportance](images/featureImportance.png "Feature Importance")

After splitting the data into train and test we tried the following Models and checked their classification reports to find out which was the best model:

#### SVC

![SVC](images/svc.png "SVC")

We used GridSearch with the following parameters:   
```param_grid = {'C': [5, 20, 50],
              'kernel': ('linear', 'rbf')}
```

#### KNearestNeighbors

![KNearestNeighbors](images/knn.png "KNearestNeighbors")

#### DecisionTree

![DecisionTree](images/DecisionTree.png "DecisionTree")

#### RandomForest

![RandomForest](images/RandomForest.png "RandomForest")

#### Deep Learning Neural Network

![NeuralNetwork](images/NeuralNetwork.png "NeuralNetwork")

From the classification reports, we decided that SVC with kernel:rbf and C=20 was the best model with an accuracy of 0.62.

We saved this model using joblib.   
```import joblib
final_model = grid.best_estimator_
filename = '../webapp/static/Resources/gender_perfume_model.sav'
joblib.dump(final_model, filename)
```


## Tableau Development
For the Tableau visualizations we used a jupyter notebook to change our json to a csv. We used a calculated field to change Rating from a string to an integer. We also truncated Rating to create a bar chart of the ratings in the second Dashboard. The dashbaords were then embedded into our website. 

- [Dashboard1](https://public.tableau.com/views/Perfume_Dashboard2_JV/Dashboard2?:language=en&:display_count=y&publish=yes&:origin=viz_share_link)
- [Dashboard2](https://public.tableau.com/profile/chloe3464#!/vizhome/perfumes_dash/Dashboard1?publish=yes)

![Gender](images/gender_pie_chart.png)
![Top](images/top_10_perfumes.png)
![TopGender](images/top_perfumes_by_gender.png)
![Bubble](images/bubble_chart.png)
![RateRange](images/perfumes_range.png)
![MostVotes](images/most_votes.png)

## Perfume Designer App
We created a web-app using Flask, HTML, CSS, JavaScript, and D3.  Our app includes a Home page and 3 interactive webpages:  
* Create Your Fragrance: lets you create a perfume based on a selection of Top, Middle, and Base Notes.  You can select up to three notes of each: scroll through and peruse the list, or simply start typing a note that strikes your fancy.  Our machine learning model will let you know if that scent is best for men or women or both.  Our model will also tell you whether you've created an entirely new perfume! 
![CreatePerfume1](images/create_perfume1.png)

* Finally, if an existing scent contains at least one each of the top, middle, and base notes you selected, our model will return the names of those scents for you to consider in your search for the perfect perfume! 
![CreatePerfume2](images/create_perfume2.png)

* Perfume Info: Click on a fragrance term to see its definition and gain a better understanding of what makes a perfume! 
![PerfumeInfo](images/perfume_info.png)

## Setup

#### Setup Instructions

1. Create a new conda environment with python version 3.7  
2. Use pip install -r requirements.txt   
3. Webscraping: The followings files were involved in web-scraping or used to create json files that were imported into the Mongo DB and DO NOT need to be run: Notes_Scrape.ipynb and Perfume_Scrape.ipynb
4. Run https://github.com/sir-omoreno/final-project/blob/main/mongo_db/mongo_db_creation.ipynb to create the mongo database perfume_db, and the perfume_data and perfume_notes collections
5. Run https://github.com/sir-omoreno/final-project/blob/main/ML/Perfume_ML_Gender.ipynb to create the perfume_features and note_features collections, and the machine learning model (gender_perfume_model.sav)
6. Run https://github.com/sir-omoreno/final-project/blob/main/webapp/app.py in your new conda environment to open the flask web application.

## Lessons Learned

We had initially planned to create a machine learning model that would predict the popularity of the perfume based on the perfume features. However, this model returns negative R2 scores indicating that the model was a terrible fit for the data. Had we been able to scrape more perfumes and tune our model, we may have had better results.

## Inspiration
Inspired by Rutgers Data Visulization Bootcamp & smelly people everywhere!

## Contact
Created by:
- [Chloe Veras](https://github.com/cveras33)
- [Deepa Vadakan](https://github.com/deepavadakan)
- [Jennifer Dean](https://github.com/Jen-Dean)
- [Jessi Volosin](https://github.com/jvolosin)
- [Kasey Lacerda](https://github.com/KLacerda08)
- [Osvaldo (Ozzie) Mauricio Moreno](https://github.com/sir-omoreno)