#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import config
import cgi
import webapp2
import random
import os
from google.appengine.ext.webapp import template
import datetime
import urllib
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app

import logging

from google.appengine.api import urlfetch
import json
import time

from datetime import datetime, timedelta
import time

import math

from firebase.firebase import FirebaseApplication, FirebaseAuthentication

DSN = 'https://missile-launch-bb06a.firebaseio.com/'

firebase = FirebaseApplication(DSN, None)

appVersion = 'v1'


# ---------------------------------------------------------------------

# Landing function
class MainPage(webapp2.RequestHandler):
    def get(self):
        path = os.path.join(os.path.dirname(__file__), 'main.html')
        self.response.out.write(template.render(path, {}))

# ---------------------------------------------------------------------

# Show Available Missiles

class Missiles(webapp2.RequestHandler):
    def get(self):

        missiles = getMissiles()
        users = getUsers()

        templateValues = {'users': users, 'missiles': missiles}
        path = os.path.join(os.path.dirname(__file__), 'missiles.html')
        self.response.out.write(template.render(path, templateValues))

# ---------------------------------------------------------------------

# Test Notification

class Notify(webapp2.RequestHandler):

    def post(self):
        token = self.request.get('token')
        #logging.info(token)
        notifyUser(token)
        self.redirect('/missiles')

# ---------------------------------------------------------------------

# Cron Handler that runs every 5 minutes (currently testing)

class Cron(webapp2.RequestHandler):

    def get(self):

        # Check if any player should get a new missile
        checkForNewMissiles(self)

        # Check for any Airborn missiles.
        checkForImpact(self)

# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------

# URL HANDLERS

app = webapp2.WSGIApplication([('/missiles', Missiles),
                              ('/notify',Notify),
                              ('/cron',Cron),
                              ('/', MainPage),],
                              debug=False)

# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------

# Check and see if any user should get a new missile

def checkForNewMissiles(self):

    for user in getUsers():
        if user['untilNextMissile'] < 0:
            generateMissile(user)

# ---------------------------------------------------------------------

# Check and see if any user should get a new missile

def checkForImpact(self):

    epoch_time = int(time.time())

    for missile in getMissiles():
        if missile['status'] == 'airborn':
            #self.response.out.write('A missile is airborn')
            if missile['impactTime'] < epoch_time:
                # SET IMPACT!!!!!
                self.response.out.write('Set Impact!')
                setImpact(missile,self)

# ---------------------------------------------------------------------

# Set Impact & notify the 2 players of the outcome

def setImpact(missile,self):

    logging.info('SET IMPACT')

    target = firebase.get(('/%s/users/%s' % (appVersion,missile['target']['uid'])), None)
    sender = firebase.get(('/%s/users/%s' % (appVersion,missile['sender']['uid'])), None)

    lat1 = missile['destination']['latitude']
    long1 = missile['destination']['longitude']
    lat2 = target['location']['location']['coords']['latitude']
    long2 = target['location']['location']['coords']['longitude'] # will fail if this doesnt exist

    distance = getDistance((lat1, long1), (lat2, long2))
    frag = True if distance < .5 else False

    # Update the missile with impact data
    newMissileData = { 'status':'landed', 'frag': frag, 'distance': distance, 'targetLocation': {'latitude': lat2, 'longitude': long2}}
    firebase.patch(('/%s/missiles/%s' % (appVersion,missile['key'])), newMissileData)

    self.response.out.write(distance)

    # Now update the players with what happened
    if frag:
        fragCount = sender['frags'] + 1
        firebase.patch(('/%s/users/%s' % (appVersion,sender['uid'])), {'frags': fragCount})
        data = {
    	   'to': sender['pushToken'],
           "notification":{
            "title": "Boom!",
            "body": "You just hit " + sender['username'],
            "sound": "default",
            },
            "priority": 10
        }
        notifyUser(data)
        deathCount = target['deaths'] + 1
        firebase.patch(('/%s/users/%s' % (appVersion,target['uid'])), {'deaths': deathCount})
        data = {
    	   'to': target['pushToken'],
           "notification":{
            "title": "Boom!",
            "body": "You just got fragged by " + target['username'],
            "sound": "default",
            },
            "priority": 10
        }
        notifyUser(data)
    else:
        data = {
    	   'to': sender['pushToken'],
           "notification":{
            "title": "You missed!",
            "body": "You missed " + sender['username'],
            "sound": "default",
            },
            "priority": 10
        }
        notifyUser(data)
        data = {
    	   'to': target['pushToken'],
           "notification":{
            "title": "Miss!",
            "body": target['username'] + " did not hit you with a missile",
            "sound": "default",
            },
            "priority": 10
        }
        notifyUser(data)


# ---------------------------------------------------------------------


# Create a new missile for this user

def generateMissile(user):

    logging.info('GENERATE MISSILE')
    epoch_time = int(time.time())
    # Create the new missile and add it to firebase
    new_missile = {'sender': user, 'fired': False, 'status': 'loaded', 'type':'Medium Range', 'duration': 800}
    firebase.post(('/%s/missiles' % appVersion), new_missile)

    # Update the user's nextMissile timestamp 5 hours from now
    five_hours_from_now = epoch_time + (5 * 60 * 60)
    #two_hours_from_now = epoch_time + (2 * 60) # tmp 2 minutes
    firebase.patch(('/%s/users/%s' % (appVersion,user['uid'])), {'nextMissile':five_hours_from_now})

    # Notify the user they have a new missile
    data = {
	   'to': user['pushToken'],
       "notification":{
        "title": "Good news!",
        "body": "You just received a new missile.",
        "sound": "default",
        },
        "priority": 10
    }
    notifyUser(data)

# ---------------------------------------------------------------------

# Function to grab all Missiles from firebase

def getMissiles():
    snapshot = firebase.get(('/%s/missiles' % appVersion), None)
    missiles = []

    if snapshot is None:
        return missiles

    for key in snapshot:
        missile = snapshot[key]
        missiles.append(missile)

    return missiles

# ---------------------------------------------------------------------

# Function to grab all Users from firebase & append time till next missile

def getUsers():
    snapshot = firebase.get(('/%s/users' % appVersion), None)
    users = []
    epoch_time = int(time.time())

    if snapshot is None:
        return users

    for uid in snapshot:
        user = snapshot[uid]
        user['untilNextMissile'] = ( user['nextMissile'] - epoch_time )/ (60)
        users.append(user)

    return users

# ---------------------------------------------------------------------

def notifyUser(data):

    # Just notiffy the user. Once they accept the missile,
    # The app will reset the nextMissile value
    # Can the app auto update firebase based on a notification?

    logging.info('Notifying User')
    logging.info(data)

    url = 'https://fcm.googleapis.com/fcm/send'
    try:
        result = urlfetch.fetch(url = url, payload = json.dumps(data), method = urlfetch.POST, headers = {"Content-Type": "application/json","Authorization": "key=AIzaSyCCVZXxForpw6os-geVxEwaHYcymvIEnx4"})
        if result.status_code == 200:
            logging.info(result.content)
        else:
            logging.warn('GCM server not reached or something')
            #self.response.status = result.status_code
    except urlfetch.Error:
        logging.exception('Caught exception fetching url')

# ---------------------------------------------------------------------

# Function to calculate distance (returns kilometers)

def getDistance(origin, destination):
    lat1, lon1 = origin
    lat2, lon2 = destination
    radius = 6371 # km

    dlat = math.radians(lat2-lat1)
    dlon = math.radians(lon2-lon1)
    a = math.sin(dlat/2) * math.sin(dlat/2) + math.cos(math.radians(lat1)) \
        * math.cos(math.radians(lat2)) * math.sin(dlon/2) * math.sin(dlon/2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    d = radius * c

    return d
