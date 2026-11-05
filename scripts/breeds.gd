extends RefCounted
## Irk kataloğu: 22 köpek, 19 kedi. Hem sokaktaki hayvanlarda hem sahiplenmede kullanılır.
## Köpek alanları: model, size, squash (bacak kısalığı), long (gövde uzunluğu), head, ears, floppy, chest, neck, tail,
##   main, light, mark, spots, saddle, mask, puff
## Kedi alanları: size, base, second, pattern, eyes, fluff, head, ears, fold, flat, legs, tail, hairless, tufts

const DOGS := {
	"sokak": {"name": "Sokak Köpeği", "price": 500, "model": "shiba", "size": 1.1, "main": "#d9b46a", "light": "#f0e2c0"},
	"kangal": {"name": "Kangal", "price": 1500, "model": "husky", "size": 1.4, "main": "#d8c39a", "light": "#ece0c4", "mark": "#2a2422", "mask": 1.0, "chest": 1.2, "floppy": 1.2, "head": 1.1},
	"alman_kurdu": {"name": "Alman Kurdu", "price": 1000, "model": "husky", "size": 1.2, "main": "#b0723a", "light": "#c99257", "mark": "#231c18", "saddle": 1.0, "mask": 0.7, "ears": 1.2},
	"golden": {"name": "Golden Retriever", "price": 1000, "model": "shiba", "size": 1.2, "main": "#d9a25a", "light": "#ecc888", "floppy": 1.4, "tail": 1.3, "chest": 1.1},
	"labrador": {"name": "Labrador", "price": 900, "model": "shiba", "size": 1.2, "main": "#e2c48e", "light": "#ecd8ae", "floppy": 1.4, "chest": 1.15},
	"kara_labrador": {"name": "Siyah Labrador", "price": 900, "model": "shiba", "size": 1.2, "main": "#2b2624", "light": "#3a3431", "floppy": 1.4, "chest": 1.15},
	"husky": {"name": "Husky", "price": 1200, "model": "husky", "size": 1.1, "main": "#5d6066", "light": "#f2f0ea"},
	"shiba": {"name": "Shiba Inu", "price": 1100, "model": "shiba", "size": 0.95, "main": "#c9792f", "light": "#f4ead8"},
	"akita": {"name": "Akita", "price": 1300, "model": "shiba", "size": 1.3, "main": "#c98a4a", "light": "#f2e8d8", "chest": 1.2, "head": 1.1},
	"beagle": {"name": "Beagle", "price": 700, "model": "shiba", "size": 0.85, "main": "#a8662e", "light": "#f4eee2", "mark": "#2a2422", "saddle": 1.0, "floppy": 1.5, "ears": 1.2},
	"dalmacyali": {"name": "Dalmaçyalı", "price": 900, "model": "shiba", "size": 1.15, "main": "#f2f0ea", "light": "#f8f6f0", "mark": "#1f1c1b", "spots": 0.55, "floppy": 1.3},
	"corgi": {"name": "Corgi", "price": 900, "model": "shiba", "size": 0.95, "squash": 0.62, "long": 1.1, "main": "#d9893a", "light": "#f6eee2", "ears": 1.35, "tail": 0.4, "head": 1.15},
	"sosis": {"name": "Sosis Köpeği", "price": 700, "model": "shiba", "size": 0.9, "squash": 0.58, "long": 1.3, "main": "#7a3a1e", "light": "#a0582f", "floppy": 1.5, "ears": 1.3},
	"pug": {"name": "Pug", "price": 800, "model": "shiba", "size": 0.75, "squash": 0.8, "main": "#d9c09a", "light": "#e6d2b0", "mark": "#2a2422", "mask": 1.0, "head": 1.35, "neck": 0.5, "floppy": 1.2, "ears": 0.8, "chest": 1.25},
	"chihuahua": {"name": "Chihuahua", "price": 600, "model": "shiba", "size": 0.55, "main": "#e0b07a", "light": "#f0d4ac", "head": 1.45, "ears": 1.8},
	"pomeranian": {"name": "Pomeranian", "price": 800, "model": "shiba", "size": 0.6, "squash": 0.8, "main": "#e89a4a", "light": "#f4c58a", "chest": 1.5, "head": 1.25, "tail": 1.3},
	"samoyed": {"name": "Samoyed", "price": 1200, "model": "husky", "size": 1.1, "main": "#f2efe8", "light": "#ffffff", "chest": 1.35, "tail": 1.3},
	"rottweiler": {"name": "Rottweiler", "price": 1100, "model": "husky", "size": 1.25, "main": "#1f1b1a", "light": "#8a4a22", "chest": 1.3, "floppy": 1.3, "head": 1.1},
	"doberman": {"name": "Doberman", "price": 1000, "model": "shiba", "size": 1.25, "main": "#1f1b1a", "light": "#8f4e26", "ears": 1.35, "tail": 0.3, "long": 0.95},
	"border_collie": {"name": "Border Collie", "price": 900, "model": "husky", "size": 1.0, "main": "#1f1b1a", "light": "#f2f0ea", "floppy": 0.8},
	"saint_bernard": {"name": "Saint Bernard", "price": 1400, "model": "husky", "size": 1.45, "main": "#a0522d", "light": "#f4ece0", "chest": 1.35, "floppy": 1.4, "head": 1.2},
	"kanis": {"name": "Kaniş", "price": 900, "model": "shiba", "size": 0.85, "main": "#f2ece2", "light": "#f8f4ee", "floppy": 1.5, "ears": 1.3, "puff": true},
	"bulldog": {"name": "Bulldog", "price": 1000, "model": "shiba", "size": 0.95, "squash": 0.68, "main": "#d9c09a", "light": "#f4ece0", "chest": 1.5, "head": 1.35, "neck": 0.5, "floppy": 1.0, "ears": 0.8, "tail": 0.3},
}

const CATS := {
	"tekir": {"name": "Tekir", "price": 500, "base": "#8b8d92", "second": "#4d4f53", "pattern": "tekir"},
	"sarman": {"name": "Sarman", "price": 500, "base": "#e8a04a", "second": "#b96a22", "pattern": "tekir"},
	"van": {"name": "Van Kedisi", "price": 1000, "base": "#f6f4ee", "pattern": "solid", "eyes": ["#e8b53a", "#6fb3d6"], "fluff": 0.3, "size": 1.1},
	"ankara": {"name": "Ankara Kedisi", "price": 1000, "base": "#f6f4ee", "pattern": "solid", "eyes": ["#6fb3d6", "#6fb3d6"], "fluff": 0.7, "tail": 1.2},
	"smokin": {"name": "Smokin", "price": 500, "base": "#2b2828", "second": "#f2efe9", "pattern": "smokin"},
	"kara": {"name": "Kara Kedi", "price": 500, "base": "#232121", "pattern": "solid", "eyes": ["#e8b53a", "#e8b53a"]},
	"uc_renk": {"name": "Üç Renkli", "price": 600, "base": "#f2efe9", "second": "#e58a3a", "pattern": "uc_renk"},
	"british": {"name": "British Shorthair", "price": 900, "base": "#8e97a3", "pattern": "solid", "eyes": ["#e8a43a", "#e8a43a"], "size": 1.15, "head": 1.15, "ears": 0.8, "fluff": 0.2},
	"scottish": {"name": "Scottish Fold", "price": 1100, "base": "#b9b3aa", "second": "#7f786f", "pattern": "tekir", "fold": true, "head": 1.1},
	"siyam": {"name": "Siyam", "price": 900, "base": "#efe2c8", "second": "#4a3428", "pattern": "points", "eyes": ["#5aa8e8", "#5aa8e8"], "ears": 1.2, "size": 0.95},
	"maine_coon": {"name": "Maine Coon", "price": 1300, "base": "#8a6a4a", "second": "#4a3424", "pattern": "tekir", "size": 1.35, "fluff": 0.8, "tufts": true, "tail": 1.3},
	"iran": {"name": "İran Kedisi", "price": 1200, "base": "#f0e6d8", "pattern": "solid", "fluff": 1.0, "flat": true, "ears": 0.7, "eyes": ["#e8a43a", "#e8a43a"]},
	"sfenks": {"name": "Sfenks", "price": 1200, "base": "#e8b8a8", "pattern": "solid", "hairless": true, "ears": 1.5, "eyes": ["#9ccf5a", "#9ccf5a"]},
	"bengal": {"name": "Bengal", "price": 1100, "base": "#d9a256", "second": "#4a2f1c", "pattern": "benek", "size": 1.05},
	"ragdoll": {"name": "Ragdoll", "price": 1200, "base": "#f2ece2", "second": "#6a5a50", "pattern": "points", "eyes": ["#5aa8e8", "#5aa8e8"], "fluff": 0.8, "size": 1.15},
	"rus_mavisi": {"name": "Rus Mavisi", "price": 1000, "base": "#7d8794", "pattern": "solid", "eyes": ["#7cc46a", "#7cc46a"], "ears": 1.15},
	"norvec": {"name": "Norveç Orman Kedisi", "price": 1300, "base": "#9a8a7a", "second": "#5a4a3c", "pattern": "tekir", "fluff": 1.0, "size": 1.3, "tufts": true, "tail": 1.3},
	"habes": {"name": "Habeş Kedisi", "price": 1000, "base": "#b9733a", "second": "#7a4422", "pattern": "solid", "ears": 1.4, "legs": 1.15, "eyes": ["#c9a03a", "#c9a03a"]},
	"munchkin": {"name": "Munchkin", "price": 1000, "base": "#d8a874", "second": "#9a6a3c", "pattern": "tekir", "legs": 0.55},
}

static func get_breed(cat: bool, id: String) -> Dictionary:
	return (CATS if cat else DOGS).get(id, {})

## Sokaktaki bir hayvana (harita verisinden gelen renk/desen) en yakın ırkı seç
static func street_breed(cat: bool, pattern: String, color: Color, rnd: float) -> String:
	if cat:
		match pattern:
			"tekir": return "sarman" if color.r > color.b + 0.2 else "tekir"
			"smokin": return "smokin"
			"uc_renk": return "uc_renk"
		if color.get_luminance() < 0.2: return "kara"
		if color.get_luminance() > 0.85: return "van" if rnd < 0.3 else ("ankara" if rnd < 0.5 else "")
		return ""
	if rnd < 0.25:
		return ["kangal", "golden", "labrador", "husky", "alman_kurdu", "akita", "border_collie"][int(rnd * 28.0) % 7]
	return ""
