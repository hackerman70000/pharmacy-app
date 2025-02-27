"""add_email_verification

Revision ID: 017a7e9a4716
Revises: d8c3dab8e779
Create Date: 2025-01-27 10:55:46.595490

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '017a7e9a4716'
down_revision = 'd8c3dab8e779'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('email_verified', sa.Boolean(), nullable=True))
        batch_op.add_column(sa.Column('verification_token', sa.String(length=100), nullable=True))
        batch_op.add_column(sa.Column('verification_token_expires', sa.DateTime(timezone=True), nullable=True))
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(length=256),
               type_=sa.String(length=255),
               existing_nullable=False)
        batch_op.create_unique_constraint(None, ['verification_token'])
        batch_op.drop_column('created_at')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.alter_column('password',
               existing_type=sa.String(length=255),
               type_=sa.VARCHAR(length=256),
               existing_nullable=False)
        batch_op.drop_column('verification_token_expires')
        batch_op.drop_column('verification_token')
        batch_op.drop_column('email_verified')

    # ### end Alembic commands ###
