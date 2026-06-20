from datetime import datetime

from .extensions import db


class Fund(db.Model):
    __tablename__ = "funds"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    entries = db.relationship(
        "FundEntry",
        back_populates="fund",
        cascade="all, delete-orphan",
        order_by="FundEntry.date",
    )

    @property
    def latest_entry(self):
        if not self.entries:
            return None
        return self.entries[-1]


class FundEntry(db.Model):
    __tablename__ = "fund_entries"

    id = db.Column(db.Integer, primary_key=True)
    fund_id = db.Column(db.Integer, db.ForeignKey("funds.id"), nullable=False, index=True)
    date = db.Column(db.Date, nullable=False, index=True)
    principal = db.Column(db.Float, nullable=False)
    current_value = db.Column(db.Float, nullable=False)
    gains = db.Column(db.Float, nullable=False)
    gains_percent = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    fund = db.relationship("Fund", back_populates="entries")
