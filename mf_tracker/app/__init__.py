from flask import Flask

from .config import Config
from .extensions import db


def create_app() -> Flask:
    app = Flask(
        __name__,
        template_folder="../templates",
        static_folder="../static",
        static_url_path="/static",
    )
    app.config.from_object(Config)

    db.init_app(app)

    from .routes import web

    app.register_blueprint(web)

    @app.cli.command("init-db")
    def init_db() -> None:
        """Create database tables."""
        with app.app_context():
            db.create_all()
            print("Database tables created.")

    return app
