import click
from app.database.seeders import seed_products
from flask.cli import with_appcontext


@click.group(name="seed")
def seed_cli():
    """Seed commands for database population."""
    pass


@seed_cli.command("products")
@with_appcontext
def seed_products_command():
    """Add example products to the database."""
    seed_products()
