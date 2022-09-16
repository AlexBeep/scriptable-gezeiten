// Strengen Modus einleiten.
'use strict';
// Darkmode prüfen zur Farbanpassung.
const $DarkMode = Device.isUsingDarkAppearance();
// Konstanten
const $Schrift = new Font('ArialMT', 9);
const $SchriftKursiv = new Font('Arial-ItalicMT', 10);
const $SchriftKopf = new Font('Arial-BoldMT', 14);
const $SchriftHals = new Font('ArialMT', 10);
// Link zur Station auf gezeiten-kalender.de,
// wird als Parameter im Widget übergeben.
let $Station = args.widgetParameter;
if (!$Station) $Station = 'http://gezeiten-kalender.de:9099/locations/2797.html';

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
$Kopf.font = $SchriftKopf;
$Kopf.textColor = fSchriftfarbe();

let $Hals = $WidgetInhalt.addText($Ort[1]);
$Hals.font = $SchriftHals;
$Hals.textColor = fSchriftfarbe();

// $WidgetInhalt.addSpacer(5);

let $Tag = [];
let $Tage = 0;

for (let $i = 3; $i < 25; $i++) {
	let $Daten = $Text[$i].split(' ');
	if ($Daten.length === 9) {
		if ($Tag.indexOf($Daten[0]) < 0) {
			if ($Tage === 2) break;
			$Tage++;
			$WidgetInhalt.addSpacer(5);
			let $Datum = $WidgetInhalt.addText(`${$Daten[0]} ${$Daten[2]}`);
			$Datum.font = $SchriftKursiv;
			$Tag.push($Daten[0]);
		}

		let $Zeile = $WidgetInhalt.addStack();
		let $Spalte1 = $Zeile.addStack();
		let $Spalte2 = $Zeile.addStack();
		$Zeile.addSpacer();
		
		let $Zeit = `${$Daten[1]} Uhr   `;
		let $Links = $Spalte1.addText($Zeit);	
		$Links.font = $Schrift;	
		$Links.textColor = fSchriftfarbe();

		let $Rechts = $Spalte2.addText($Daten[8]);	
		$Rechts.font = $Schrift;	
		$Rechts.textColor = fSchriftfarbe()
	}
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
