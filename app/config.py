import os
from dotenv import load_dotenv

load_dotenv()

class Config(object):
    """Base Config Object"""
    DEBUG                   = eval(os.environ.get('DEBUG'))
    FLASK_ENV               = os.environ.get('FLASK_ENV')
    FLASK_RUN_PORT          = os.environ.get('FLASK_RUN_PORT')
    FLASK_RUN_HOST          = os.environ.get('FLASK_RUN_HOST')
    SECRET_KEY              = os.environ.get('SECRET_KEY', 'Som3$ec5etK*y')
    MAIL_SERVER             = os.environ.get('MAIL_SERVER', 'localhost')
    MAIL_PORT               = os.environ.get('MAIL_PORT','465')
    MAIL_USERNAME           = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD           = os.environ.get('MAIL_PASSWORD') 

    #         = os.environ.get('')
