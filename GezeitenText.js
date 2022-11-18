// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: random;
// Strengen Modus einleiten.
'use strict';
// Darkmode prüfen zur Farbanpassung.
const $DarkMode = Device.isUsingDarkAppearance();
// Link zur Station auf gezeiten-kalender.de,
// wird als Parameter im Widget übergeben.
let $Station = args.widgetParameter;
if (!$Station) $Station = 'http://gezeiten-kalender.de:9099/locations/123.html';

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
$Text = $Text.split('\n');

let $OrtQuery = `
document
  .querySelectorAll('pre')[1]
  .innerText
`;
let $Ort = await $Webview.evaluateJavaScript($OrtQuery);
$Ort = $Ort.split(', ');

// Widget ausgeben.
let $WidgetInhalt = new ListWidget();
$WidgetInhalt.setPadding(8, 12, 4, 8);

let $Hintergrund = new LinearGradient();
if ($DarkMode) {	
	// Hintergrund Nachts
	$Hintergrund.colors = [new Color('16296b'), new Color('021033'), new Color('021033'), new Color('113245')];	$Hintergrund.locations = [-0.5, 0.2, 0.5, 1];
}
else {
	// Hintergrund Tagsüber
	$Hintergrund.colors = [new Color('3a8cc1'), new Color('90c0df')];	
	$Hintergrund.locations = [0.0, 1];
}
$WidgetInhalt.backgroundGradient = $Hintergrund;

let $Kopf = $WidgetInhalt.addText($Ort[0]);
$Kopf.font = new Font('Arial-BoldMT', 16);
$Kopf.textColor = fSchriftfarbe();

let $Hals = $WidgetInhalt.addText($Ort[1]);
$Hals.font = new Font('ArialMT', 12);
$Hals.textColor = fSchriftfarbe();

$WidgetInhalt.addSpacer(5);

for (let $i = 3; $i < 9; $i++) {
	let $Daten = $Text[$i].split(' ');
	let $Zeit = `${$Daten[1]} Uhr   `;
	let $Zeile = $WidgetInhalt.addStack();
	let $Spalte1 = $Zeile.addStack();
	let $Spalte2 = $Zeile.addStack();
	$Zeile.addSpacer();
	let $Links = $Spalte1.addText($Zeit);
	$Links.font = new Font('ArialMT', 10);
	$Links.textColor = fSchriftfarbe();
	let $DatenPaket;
	if ($Daten.length === 9) {
		$DatenPaket = `${$Daten[8]}\n${$Daten[5]} ${$Daten[6]}`;
	}
	else {
		$DatenPaket = `${$Daten[5]}`;
	}		
	let $Rechts = $Spalte2.addText($DatenPaket);
	$Rechts.font = new Font('ArialMT', 10);
	$Rechts.textColor = fSchriftfarbe();
}

$WidgetInhalt.addSpacer();

// Letztes Update
let $Fuss = $WidgetInhalt.addStack();
$Fuss.addSpacer();
let $Zeit = $Fuss.addDate(new Date());
$Zeit.font = new Font('ArialMT', 8);
$Zeit.textColor = Color.gray();
$Zeit.applyTimeStyle();
$Fuss.addSpacer();

Script.setWidget($WidgetInhalt);
$WidgetInhalt.presentSmall();
Script.complete();

// Hilfsfunktionen
function fSchriftfarbe () {	
	return ($DarkMode ? Color.white() : Color.black());
}
