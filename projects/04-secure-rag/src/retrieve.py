"""Permission-filtered retrieval with citation tracking."""
from dataclasses import dataclass


@dataclass
class Chunk:
    doc_id: str
    text: str
    allowed_roles: set[str]


def retrieve(query: str, chunks: list[Chunk], user_roles: set[str], k: int = 5) -> list[Chunk]:
    """Return only chunks the user is permitted to see.

    Permission filtering happens BEFORE ranking so restricted content never leaks.
    """
    visible = [c for c in chunks if c.allowed_roles & user_roles]
    # TODO: replace naive match with vector similarity ranking.
    ranked = sorted(visible, key=lambda c: query.lower() in c.text.lower(), reverse=True)
    return ranked[:k]
