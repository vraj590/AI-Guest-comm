import sqlite3

DB_PATH = "suiteop.db"

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    db = get_db()
    db.executescript("""
        CREATE TABLE IF NOT EXISTS properties (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            checkin_time TEXT,
            checkout_time TEXT,
            wifi_name TEXT,
            wifi_password TEXT,
            address TEXT,
            rules TEXT,
            max_guests INTEGER,
            updated_at TEXT
        );

        CREATE TABLE IF NOT EXISTS conversations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            property_id INTEGER,
            guest_message TEXT NOT NULL,
            draft_reply TEXT,
            sentiment TEXT,
            is_issue INTEGER DEFAULT 0,
            severity TEXT,
            staff_action TEXT,
            category TEXT,
            created_at TEXT
        );

        INSERT OR IGNORE INTO properties (id, name, checkin_time, checkout_time, wifi_name, wifi_password, address, rules, max_guests, updated_at)
        VALUES (1, 'Oceanview Suite', '3:00 PM', '11:00 AM', 'OceanViewGuest', 'Welcome2024!',
                '123 Beachfront Drive, Miami, FL 33101',
                'No smoking. No parties. Quiet hours after 10pm. No pets.',
                6, datetime('now'));
    """)
    db.commit()
    db.close()
