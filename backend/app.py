from app import create_app
from app.cli.commands import seed_cli
from flask.cli import FlaskGroup

application = create_app()
app = application
cli = FlaskGroup(create_app=create_app)

application.cli.add_command(seed_cli)

if __name__ == "__main__":
    application.run(host="0.0.0.0", debug=True)
