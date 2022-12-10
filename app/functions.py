 #!/usr/bin/python3


#################################################################################################################################################
#                                                    CLASSES CONTAINING ALL THE APP FUNCTIONS                                                                                                    #
#################################################################################################################################################







class Mqtt:

        def __init__(self,subtopic,server,port):


                from json import loads, dumps
                from time import time, sleep
                from logging import basicConfig, error, debug
                from os import system, getcwd, path, popen, listdir
                import paho.mqtt.client as mqtt
                from collections import defaultdict
                from random import randint

                # import sys
                # sys.path.insert(0, '/home/ubuntu/app')
                # from piAWS import Config
                
                self.system             		    = system
                self.getcwd             		    = getcwd
                self.path 			                = path
                self.time 			                = time
                self.sleep 			                = sleep
                self.popen 			                = popen
                self.listdir 			            = listdir
                self.loads              		    = loads
                self.dumps 		                    = dumps
                self.subtopic                   	= subtopic
                self.server                         = server  
                self.port                           = port
                self.client                     	= mqtt.Client(client_id="updater{ID}".format(ID = str(randint(0,777))))
                self.client.on_connect          	= self.on_connect
                self.client.on_message          	= self.on_message 
                # self.basicConfig                	= basicConfig
                # self.loggingerror               	= error
                # self.debug             		    = debug 

                # self.basicConfig(filename='app.log', filemode='a', format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level='DEBUG')  #<----- update path for log file        /home/ubuntu/aws/main/piAWS/app.log'


                self.client.connect(self.server, self.port, 60)
                self.client.loop_start()


        def Print(self,message):
                message = f" AWS: {message}"
                print(message)
                # logging.debug(message)


        # The callback for when the client receives a CONNACK response from the server.
        def on_connect(self, client, userdata, flags, rc):
                self.Print("Connected with result code "+str(rc))
                # Subscribing in on_connect() means that if we lose the connection and
                # reconnect then subscriptions will be renewed.
                self.client.subscribe(self.subtopic)   # <============== subscribe topic

        # The callback for when a PUBLISH message is received from the server.
        def on_message(self,client, userdata, msg):
                # print any message received
                self.Print(msg.topic+" "+str(msg.payload))
                 


        def Publish(self,topic,payload):
                self.client.publish(topic,payload)








class DB:

    def __init__(self,Config):

        from time import sleep, time, localtime, ctime, mktime 
        from math import floor
        from os import getcwd
        from os.path import join, exists
        from json import loads, dumps
        from datetime import timedelta, datetime
        from pymongo import MongoClient , errors
        from urllib import parse
        from urllib.request import  urlopen 
        from random import randint 
        from pandas import DataFrame,  to_datetime, concat
        from numpy import nan, max, min, sum , mean, int64, array_split, log 
        from secrets import token_hex
     
  


        self.Config                         = Config
        self.randint                    	= randint  
        self.token_hex                      = token_hex
        self.getcwd                         = getcwd
        self.join                           = join 
        self.sleep                      	= sleep
        self.time                       	= time
        self.DataFrame                  	= DataFrame 
        self.localtime                  	= localtime
        self.ctime                      	= ctime
        self.mktime                     	= mktime
        self.floor                      	= floor 
        self.to_datetime                	= to_datetime
        self.concat                         = concat 
        self.nan                        	= nan
        self.max                        	= max
        self.min                        	= min
        self.sum                       	    = sum
        self.int64                      	= int64
        self.mean                       	= mean
        self.log                        	= log
        self.loads                      	= loads
        self.dumps                      	= dumps
        self.request                    	= urlopen
        self.array_split                	= array_split 
        self.exists                         = exists
        self.timedelta                  	= timedelta
        self.datetime                       = datetime
        self.server			                = Config.DB_SERVER
        self.port			                = Config.DB_PORT
        self.username                   	= parse.quote_plus(Config.DB_USERNAME)
        self.password                   	= parse.quote_plus(Config.DB_PASSWORD)
        self.remoteMongo                	= MongoClient
        self.PyMongoError               	= errors.PyMongoError
        self.BulkWriteError             	= errors.BulkWriteError 
        self.DESCENDING                 	= 1
        self.ASCENDING                  	= -1  


    def testConnection(self):
        # TEST CONNECTION TO MONGODB DATABASE
        self.Print("TESTING CONNECTION TO REMOTE DATABASE ")
        result 	= False
        try:
            #The ismaster command is cheap and does not require auth.
            remotedb 	= self.remoteMongo('mongodb://%s:%s@%s:%s' % (self.username, self.password,self.server,self.port) ) 
            result      = remotedb.server_info()

        except  self.PyMongoError as e:
            message 	= "UNABLE TO CONNECT TO REMOTE DATABASE ,ERROR CODE : {error} \n EXITING \n".format( error = str(e))
        else:
            self.Print("CONNECTED TO REMOTE SERVER \n")
            #self.Print(str(result))
            result 		= True
        finally:
            pass

        return result


 

    
        



def main():
    from config import Config
    from time import time, ctime, sleep
    from math import floor
    from datetime import datetime, timedelta
    one = DB(Config)
    timestamp = floor(time())
    registered = ctime(timestamp)
    user = {"username":"Legendary","email":"tajay59@gmail.com","password":"blackops","role":"admin","timestamp":timestamp,"registered":registered,"emailconfirmed":True}
    #one.addUser(user)
    # sleep(5)
    # res = one.userExist("tajay59@gmail.com")
    
    # res = one.removeUser("tajay59@gmail.com")
    # account = one.findUser("tajay59@gmail.com")
    # print(res)
    # print(account)
    # print(one.findAllProducts())
    # {$regex : "developer"}
    # one.addProducts()
    # account = one.findUser(id="ACC355b9357e0365576c7e2fe5afd80bf98")
    # res = one.updateUserCart("ACC355b9357e0365576c7e2fe5afd80bf98",cart=[{"1":"one","2":"Gingerbeer"}])
    # res = one.updateUserCart("ACC355b9357e0365576c7e2fe5afd80bf98",cart=[])
    # print(one.getCollections("inventory"))
    # print(one.createCollections("inventory","cimh"))
    # print(one.getCollections("inventory"))
    # print(res)
    # print("misc search ",one.miscFind({"id":"site","name":"cimh"}))
    # first =  one.generateQRcode("try")
    
    # get = one.shelfCount('LOC9c0df535436f8f5ce6dd5fca4c2885f4')
    # product = {"id":"product","site":"SITEbb490ce66a95393ec7edf2f81080e816","location":"LOC9c0df535436f8f5ce6dd5fca4c2885f4","shelf": "SHELb468d7929bd58614a3dca409ee46074a","product":"PRO663638e2fce01a7b4ca27c1228dcd1fd","quantity":10}
    # print(one.insertProduct("cimh",product))
    # print(one.findProductLocation("sun","cimh"))
    # print(one.shelfStocks("cimh","SITEbb490ce66a95393ec7edf2f81080e816","LOC21e797b6f2fb7061be4439641095c07b","SHEL9f5bc2d57a4c35b24016ec883f21818d"))
    # productUpsert(self,collection,site,location,shelf,product,object)
    # res = one.productUpsert("cimh","SITEbb490ce66a95393ec7edf2f81080e816","LOC62994b307f9d7bb922d03ae980548ddd","SHEL947bd3d285c486533684ddbadfd881b2","PRO70f58ae33a4f302143868c8e35459ce4",{"$inc":{"quantity":3}})
    # espireAt = datetime.utcnow() + timedelta(minutes=1000)
    #query = {"expireAt":espireAt, "username":"Legendary","email":"tajay59@gmail.com","logmessage":"well done!"}
    #res = one.createTempDoc(query)
    res = one.generateQRcode("well done")
    print(res)
    print("completed")
   
     




if __name__ == '__main__':
    main()


    
