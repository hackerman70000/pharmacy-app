from app import create_app
from app.cli.commands import seed_cli
from flask.cli import FlaskGroup

app = create_app()
cli = FlaskGroup(create_app=create_app)

app.cli.add_command(seed_cli)

if __name__ == "__main__":
    cli()
