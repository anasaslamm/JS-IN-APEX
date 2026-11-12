# JS-IN-APEX

Reusable JavaScript, CSS, and PL/SQL components for Oracle APEX, built from real
enterprise applications (ERP, finance, logistics).

## Components

### 🔔 Notification Center
An in-app notification system for APEX applications.

- Bell icon in the navigation bar with a live unread count
- Dropdown list showing title, detail, and timestamp
- Unread indicators and "Mark all as read"
- Clicking a notification redirects to the target page and reduces the unread count
- Designed for record changes, deletions, and approval requests

![Notification Center](screenshots/notification-center.png)

### 🎨 Modern Theme (planned)
Style layer to give existing APEX apps a cleaner, more modern look.

## Requirements
- Oracle APEX <version>
- Oracle Database <version>

## Installation
1. <create the notification table / run the SQL script>
2. <add the JS and CSS files to your app>
3. <add the region/navbar entry>

## Usage
<short example of creating a notification from PL/SQL>

## Roadmap
- [ ] Package as an APEX plug-in
- [ ] Approval workflow notifications
- [ ] Modern theme
- [ ] Demo application

## Author
Anas, Oracle APEX Developer
