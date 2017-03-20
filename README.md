# Ads Blocker Detector
## Complex ads blocker detection util

- user can set message in one or more languages
- user can display one or all defined messages
- user can remove content and display only message
- user can decide for internal or external CSS usage
- user can only detect ads blocker and use own action
- user can set own autostart timer, default time is 1s

## How to use Ads Blocker Detector
```
<script src="path\to\adsblockerdetector.js"><script>
```

Configure Ads Blocker Detector via _abc.set(property, value).
You will have 1 second time for own configuration. After 1s Ads Blocker Detector starts work. You can change this timer via configuration.

If you find a bug, please report it.

User can style default message via abd-message CSS class.

## Dependencies
jQuery library is required.

## Version 2.0
```
_abd.init(); // runs Ads Blocker Detector
```
timeout was increased to 1.5s (mobile devices latency problem)
