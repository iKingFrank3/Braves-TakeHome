import sys, os

# Add the project directory to the Python path
INTERP = os.path.expanduser("/home/kfdigitals/virtualenv/Braves-TakeHome/3.12/bin/python")
if sys.executable != INTERP:
    os.execl(INTERP, INTERP, *sys.argv)

sys.path.append(os.getcwd())

# Import the Flask app
from app import app as application 