# Web dışa aktarımından sonra: paket adına sürüm ekler ki tarayıcı eski sürümü önbellekten açmasın
import re, sys
ver = sys.argv[1]
p = 'docs/index.html'
s = open(p, encoding='utf-8').read()
s = re.sub(r'"mainPack":"[^"]*",', '', s)
s = s.replace('"executable":"index",', '"executable":"index","mainPack":"index.pck?v=%s",' % ver, 1)
open(p, 'w', encoding='utf-8').write(s)
print('mainPack v', ver)
