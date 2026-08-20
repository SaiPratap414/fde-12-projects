"""Detect and mask common PII before data is processed downstream."""
import re
import sys

PATTERNS = {
    "EMAIL": re.compile(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"),
    "PHONE": re.compile(r"\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b"),
    "SSN": re.compile(r"\b\d{3}-\d{2}-\d{4}\b"),
    "CREDIT_CARD": re.compile(r"\b(?:\d[ -]*?){13,16}\b"),
}


def redact(text: str) -> tuple[str, dict[str, int]]:
    """Return masked text and a count of each PII type found."""
    counts: dict[str, int] = {}
    for label, pattern in PATTERNS.items():
        matches = pattern.findall(text)
        if matches:
            counts[label] = len(matches)
            text = pattern.sub(f"[REDACTED_{label}]", text)
    return text, counts


if __name__ == "__main__":
    sample = " ".join(sys.argv[1:]) or "Reach jane@example.com / 555-123-4567"
    masked, found = redact(sample)
    print(masked)
    print("Redacted:", found)
