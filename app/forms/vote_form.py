from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import Question


class VoteForm(FlaskForm):
    voteDirection = StringField('voteDirection', validators=[DataRequired()])
