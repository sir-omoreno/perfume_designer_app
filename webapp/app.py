import os
import csv
import requests
import json
import pandas as pd
import numpy as np
from flask import Flask, render_template, request, jsonify
from flask_pymongo import PyMongo
from pymongo import MongoClient
import joblib

#################################################
# Flask Setup
#################################################

app = Flask(__name__)
app.config.update(
    DEBUG=True,
)

#################################################
# Database Setup
#################################################
# setup mongo connection

app.config["MONGO_URI"] = "mongodb://localhost:27017/perfumes_db"
# app.config["MONGO_URI"] = "mongodb+srv://<dbName>:<password>@cluster0.s0gp3.mongodb.net/rescue_angels_db?retryWrites=true&w=majority"

mongo = PyMongo(app)

#################################################
# Flask Routes
#################################################


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/find_your_scent")
def find_your_scent():
    return render_template("find_your_scent.html")


@app.route("/perfume_notes")
def pefume_notes():
    perfume_notes = list(mongo.db.notes_features.find({}, {'_id': False}))
    # print(perfume_notes)
    return jsonify(perfume_notes)

@app.route("/find_perfume_by_notes", methods=["POST"])
def find_perfume_by_notes():
    #  get the list of all notes
    features_list = request.get_json()
    # initialize lists for each note type
    top_notes_list = []
    middle_notes_list = []
    base_notes_list = []

    # find the note and assign to correct list
    for note in features_list:
        #  top notes
        top_x = note.rsplit("top_note_", 1)
        if len(top_x) == 2:
            top_notes_list.append(top_x[1])
            #  middle notes
        middle_x = note.rsplit("middle_note_", 1)
        if len(middle_x) == 2:
            middle_notes_list.append(middle_x[1])
        # base notes
        base_x = note.rsplit("base_note_", 1)
        if len(base_x) == 2:
            base_notes_list.append(base_x[1])
    unique_top_notes = list(set(top_notes_list))
    unique_middle_notes = list(set(middle_notes_list))
    unique_base_notes = list(set(base_notes_list))
    
    # search for perfumes for given notes
    if unique_top_notes:
        if unique_middle_notes:
            if unique_base_notes:
                # top, middle and base notes
                perfumes = list(mongo.db.perfume_data.find({ '$and' : [ {"top notes" : {'$in' : unique_top_notes}} , {"middle notes" : {'$in' : unique_middle_notes}} , {"base notes" : {'$in' : unique_base_notes}} ]},{'_id': False}))
            else:
                # top and middle notes
                perfumes = list(mongo.db.perfume_data.find({ '$and' : [ {"top notes" : {'$in' : unique_top_notes}} , {"middle notes" : {'$in' : unique_middle_notes}} ]},{'_id': False}))
        else:
            if unique_base_notes:
                # top and base notes
                perfumes = list(mongo.db.perfume_data.find({ '$and' : [ {"top notes" : {'$in' : unique_top_notes}} , {"base notes" : {'$in' : unique_base_notes}} ]},{'_id': False}))
            else:
                # top notes
                perfumes = list(mongo.db.perfume_data.find({ '$or' : [ {"top notes" : {'$in' : unique_top_notes}} ]},{'_id': False}))
    else:
        if unique_middle_notes:
            if unique_base_notes:
                # middle and base notes
                perfumes = list(mongo.db.perfume_data.find({ '$and' : [ {"middle notes" : {'$in' : unique_middle_notes}} , {"base notes" : {'$in' : unique_base_notes}} ]},{'_id': False}))
            else:
                # middle notes
                perfumes = list(mongo.db.perfume_data.find({ '$and' : [ {"middle notes" : {'$in' : unique_middle_notes}} ]},{'_id': False}))
        else:            
            if unique_base_notes:
                # base notes
                perfumes = list(mongo.db.perfume_data.find({ '$and' : [ {"base notes" : {'$in' : unique_base_notes}} ]},{'_id': False}))
            else:
                # no notes
                perfumes = []

    # print(perfumes)
    return jsonify(perfumes)

@app.route("/perfume_predict2", methods=["POST"])
def perfume_predict2():
    features_list = request.get_json()
    print(features_list)
    # If features list is not empty
    if features_list:
        # Get al lthe features from MongoDB
        perfume_features = pd.DataFrame(list(mongo.db.perfume_features.find({},{'_id': False})))
        print(perfume_features.columns)

        # if feature is in the feature list, replace value with 1
        for feature in features_list:
            perfume_features[feature] = 1

        # load the perfume_gender model
        filename = 'static/Resources/gender_perfume_model.sav'
        perfume_gender_model = joblib.load(filename)

        print(perfume_features.columns)
        # use the model to predict
        result = perfume_gender_model.predict(perfume_features)
        print(result)
        return jsonify(result[0])


# @app.route("/perfume_predict", methods=["POST", "GET"])
# def perfume_predict():

#     # Initialize features list
#     features_list = []
#     # Find the number of Top Notes
#     top_note_count = int(request.form["top-note-count"])
#     print(top_note_count)
#     # Find all the selected top notes
#     for i in range(top_note_count):
#         print(i)
#         top_count_ID = "topNote" + str(i)
#         print(top_count_ID)
#         top_note = request.form[top_count_ID]
#         if top_note:
#             top_note_str = "top_note_" + top_note
#             features_list.append(top_note_str)
    
#     # Find the number of Middle Notes
#     middle_note_count = int(request.form["middle-note-count"])
#     # Find all the selected middle notes
#     for i in range(middle_note_count):
#         middle_count_ID = "middleNote" + str(i)
#         middle_note = request.form[middle_count_ID]
#         if middle_note:
#             middle_note_str = "middle_note_" + middle_note
#             features_list.append(middle_note_str)

#     # Find the number of Base Notes
#     base_note_count = int(request.form["base-note-count"])
#     # Find all the selected base notes
#     for i in range(base_note_count):
#         base_count_ID = "baseNote" + str(i)
#         base_note = request.form[base_count_ID]
#         if base_note:
#             base_note_str = "base_note_" + base_note
#             features_list.append(base_note_str)

#     # If features list is not empty
#     if features_list:
#         # Get al lthe features from MongoDB
#         perfume_features = pd.DataFrame(list(mongo.db.perfume_features.find({},{'_id': False})))
#         print(perfume_features.columns)

#         # if feature is in the feature list, replace value with 1
#         for feature in features_list:
#             perfume_features[feature] = 1

#         # load the perfume_gender model
#         filename = 'static/Resources/gender_perfume_model.sav'
#         perfume_gender_model = joblib.load(filename)

#         print(perfume_features.columns)
#         # use the model to predict
#         result = perfume_gender_model.predict(perfume_features)
#         print(result)

#         return render_template("find_your_scent.html", result=result[0])


@app.route("/test")
def test():
    return render_template("form_test.html")

# # testing coding form


# @app.route("perfume_form_test", methods=["POST", "GET"])
# def perfume_form_test():
#     if request.method == 'POST':
#        as_dict = request.form.getlist('top-note-count')


# # user input list
#     features = [xxxxx, xxxxx, xxxxx, xxxxx, xxxx, xxxxx, xxxxxxx, xxxxx]
#     final_features = [np.array(features)]
#     final_shape = np.reshape(final_features, (1, -1))
# # load model
#     model = load("placeholder")
#     prediction = model.predict(final_shape)
# #to decide on output page ...
#     if prediction == 1:
#         return render_template("placeholder.html")
#     else:
#         return render_template("placeholder.html")


@app.route("/perfume_info")
def perfume_info():
    return render_template("perfume_info.html")


@app.route("/visualizations")
def visualizations():
    return render_template("visualizations.html")


@app.route("/about")
def about():
    return render_template("about.html")


if __name__ == "__main__":
    app.run(debug=True)
