// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: random;
// Strengen Modus einleiten
'use strict';
// Link zur Station auf gezeiten-kalender.de,
// wird als Parameter im Widget übergeben.
let $Station = args.widgetParameter;
// $Station = 'http://gezeiten-kalender.de:9099/locations/2797.html';

// Inhalte der gewählten Station auslesen
let $Webview = new WebView();
await $Webview.loadURL($Station);

// Die Werte stehen im ersten <pre></pre> Abschnitt,
// der Stationsname im zweiten.
let $TextQuery = `
document
  .querySelectorAll('pre')[0]
  .innerText
`;
let $Text = await $Webview.evaluateJavaScript($TextQuery);
let $OrtQuery = `
document
  .querySelectorAll('pre')[1]
  .innerText
`;
let $Ort = await $Webview.evaluateJavaScript($OrtQuery);
console.log($Ort);
$Ort = $Ort.split(', ');

// Das erste Bild ist Werbung, wir wollen das zweite Bild. 
let $BildQuery = `
document
  .querySelectorAll('img')[1]
  .src
`;
let $BildURL = await $Webview.evaluateJavaScript($BildQuery);

// Das Bild laden, zuschneiden und ausgeben.  
let $BildAnfrage = new Request($BildURL);
let $Bild = await $BildAnfrage.loadImage();
let $BildDaten = new DrawContext();
$BildDaten.opaque = true;
$BildDaten.size = new Size(160, 160);
$BildDaten.drawImageAtPoint($Bild, new Point(0, 0));
// Beschriftung aufdrucken.
$BildDaten.drawText($Ort[0], new Point(25, 25));
$BildDaten.drawText($Ort[1], new Point(25, 43));
let $Ausgabe = $BildDaten.getImage();

// Widget ausgeben.
let $WidgetInhalt = new ListWidget();
$WidgetInhalt.setPadding(0, 0, 0, 0);
let $Stapel = $WidgetInhalt.addStack();
let $Bildstapel = $Stapel.addImage($Ausgabe);

Script.setWidget($WidgetInhalt);
$WidgetInhalt.presentSmall();
Script.complete();