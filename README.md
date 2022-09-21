# Tides Widget for Scriptable on iOS
Three iOS-Widgets for Scriptable showing tides for one spot per widget, textual or graphical.

Data is taken from http://gezeiten-kalender.de. Just chose a destination (e.g. http://gezeiten-kalender.de:9099/locations/2797.html oder http://gezeiten-kalender.de:9099/locations/norddeich) and add the URL as a widget parameter.

1.) GezeitenText

Textual widget including high/low tides and moon/sun set/rise for the next six occurrences.

2.) GezeitenBild

Graphical widget including high/low tides and moon/sun set/rise for the next 14 hours. When refreshed the left border ist the current time.

3.) GezeitenTextPur

Only high and low tides for the present day and the next day.
When refreshed elapsed times are not displayed unless you add "?GanzerTag=Ja" at the end of the URL (e.g. http://gezeiten-kalender.de:9099/locations/2797.html?GanzerTag=Ja)

Example:

![IMG_9206](https://user-images.githubusercontent.com/94117520/191450870-e080797b-ad4b-4071-8d7f-15f42c0ea7b7.jpg)

Example Dark Mode:

![IMG_9207](https://user-images.githubusercontent.com/94117520/191450958-189f6537-653b-4346-a382-d3400d6f6d38.jpg)


# Instructions
1. Download http://scriptable.app on your device.
2. Open App and tap on blue plus on top right corner.
3. Copy and paste one of the scripts and tap "Done" top left.
4. Add a Scriptable widget: https://support.apple.com/en-us/HT207122 and choose smallest size.
5. Edit your widget (see same page as 4.) and use these settings:
    - Script: chose script you saved at 3.
    - When Interacting: Open URL
    - URL: copy and paste your destination (e.g. http://gezeiten-kalender.de:9099/locations/2797.html)
    - Parameter: same as URL


![IMG_9203](https://user-images.githubusercontent.com/94117520/190148864-63f5f580-7fe6-442a-b82d-18434267d0bf.jpg)

6. Done. When you tap on the widget the URL with all details opens in your favorite browser.
