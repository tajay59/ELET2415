"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""
from .forms import ContactForm
from app import app, Mqtt, DB
from app import mail
from flask import escape, render_template, request, jsonify, send_file, redirect, make_response, session, url_for, abort, send_from_directory
from flask_mail import Message
from time import time
from json import loads, dumps


###
# Routing for your application.
###

mqttCli = Mqtt("/sensor","localhost", 1883)


@app.route('/')
def home():
    """Render website's home page."""
    return render_template('home.html')

# @app.route('/dashboard')
# def dashboard():
#     """Render website's Dashboard page."""
#     return render_template('dashboard.html')

@app.route('/panel', methods=['GET'])
def panel():
    """Render website's Home Automation Panel page."""
    return render_template('panel.html')


@app.route('/wc', methods=['GET','POST'])
def wc():
    """Render website's Home Automation Panel page."""

    if request.method == 'POST':  
        print("GOT POST")     
        data = request.get_json()       
        print("data ",data) 
        mqttCli.Publish(f"{data['ID']}", dumps(data))
        return "ok", 200

    if request.method == 'GET':         
        return "ok", 200

@app.route('/about/')
def about():
    """Render the website's about page."""
    return render_template('about.html', name="Mary Jane")


@app.route('/contact',methods=['POST','GET'])
def contact():
    form = ContactForm()

    if request.method == 'GET':
        return render_template('contact.html',form=form)
        

    if request.method == "POST":    
        if form.validate_on_submit():
            subject = request.form['subject']
            name    = request.form['name']
            email   = request.form['email']
            message = request.form['message']
                   
            msg = Message(subject, sender=(name,"from@example.com "),recipients=[email])
            msg.body = message
            mail.send(msg)
            flash('Your e-mail was successfully sent!','success')
            return redirect(url_for('home')) 
            
        return render_template('contact.html',form=form)

        


    


###
# The functions below should be applicable to all Flask apps.
###


# Flash errors from the form if validation fails
def flash_errors(form):
    for field, errors in form.errors.items():
        for error in errors:
            flash(u"Error in the %s field - %s" % (
                getattr(form, field).label.text,
                error
            ), 'danger')


@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="8080")
