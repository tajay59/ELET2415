#! /usr/bin/env python
from app import app, Config

if __name__ == "__main__":
    app.run(debug=Config.DEBUG, host=Config.FLASK_RUN_HOST, port=Config.FLASK_RUN_PORT)
