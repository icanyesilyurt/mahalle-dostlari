# Mahalle Dostları — İstanbul'a özel parçalar (Blender, komut satırından):
#   blender -b --factory-startup -P web/tools/blender/istanbul_pieces.py -- <çıktı.glb>
# Stil: Kenney "Modular Buildings" ile aynı. Her yüzün UV'si Kenney renk atlasındaki
# (colormap.png, 512x512) bir renk karesinin ortasına bakar; oyunda aynı doku/malzeme kullanılır.
# "krem" kareleri ev rengiyle boyanır (oyundaki örnek-başı renk), bu yüzden cumba gövdesi evin rengini alır.
# Ölçü: metre. Blender'da +Z yukarı, -Y ön (glTF'te +Z ön olur).
import bpy, bmesh, math, sys
from mathutils import Vector, Matrix

OUT = sys.argv[sys.argv.index('--') + 1] if '--' in sys.argv else 'istanbul-pieces.glb'

# Kenney colormap kareleri (piksel x, y) — glTF UV = (x/512, y/512), sol üst köken
SW = {
    'yesil': (16, 320), 'yesil_k': (48, 376), 'sari': (80, 320), 'turuncu': (144, 320), 'kirmizi': (208, 320),
    'mavi': (272, 320), 'mavi_k': (304, 376), 'acik_mavi': (336, 320), 'mor': (400, 320),
    'koyu': (16, 448), 'gri': (80, 448), 'mavi_gri': (144, 448), 'mavi_gri_k': (176, 480), 'beyaz': (208, 448), 'beyaz_g': (240, 470),
    'kiremit': (272, 448), 'kiremit_k': (304, 490), 'kahve': (336, 448), 'kahve_k': (368, 490),
    'ten': (400, 448), 'ten_k': (432, 480), 'krem': (464, 448), 'krem_k': (496, 490),
}

def clear():
    bpy.ops.wm.read_factory_settings(use_empty=True)

def paint(obj, sw):
    """Nesnenin tüm yüzlerini bir renk karesine bağla."""
    me = obj.data
    if not me.uv_layers: me.uv_layers.new(name='UVMap')
    uv = me.uv_layers.active.data
    x, y = SW[sw]
    # Blender UV kökeni sol alt; glTF dışa aktarımı v'yi çevirir: v_blender = 1 - y/512
    u, v = x / 512.0, 1.0 - y / 512.0
    for l in uv: l.uv = (u, v)
    for p in me.polygons: p.use_smooth = False
    return obj

def _done(o, sw, name='p'):
    o.name = name
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    return paint(o, sw)

def box(sw, sx, sy, sz, x=0, y=0, z=0, rz=0.0):
    """sx,sy,sz tam boyut; z = alt yüz."""
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x, y, z + sz / 2), rotation=(0, 0, rz))
    o = bpy.context.object; o.scale = (sx, sy, sz)
    return _done(o, sw)

def cyl(sw, r, h, x=0, y=0, z=0, n=16, r2=None, rx=0.0, ry=0.0):
    if r2 is None:
        bpy.ops.mesh.primitive_cylinder_add(vertices=n, radius=r, depth=h, location=(x, y, z + h / 2), rotation=(rx, ry, 0))
    else:
        bpy.ops.mesh.primitive_cone_add(vertices=n, radius1=r, radius2=r2, depth=h, location=(x, y, z + h / 2), rotation=(rx, ry, 0))
    return _done(bpy.context.object, sw)

def dome(sw, r, x=0, y=0, z=0, sz=1.0, seg=16, rings=6):
    """Yarım küre (alt yüzü açık), z tabanda."""
    bpy.ops.mesh.primitive_uv_sphere_add(segments=seg, ring_count=rings * 2, radius=r, location=(x, y, z))
    o = bpy.context.object
    bm = bmesh.new(); bm.from_mesh(o.data)
    bmesh.ops.delete(bm, geom=[v for v in bm.verts if v.co.z < -1e-4], context='VERTS')
    bm.to_mesh(o.data); bm.free()
    o.scale = (1, 1, sz)
    return _done(o, sw)

def ball(sw, r, x=0, y=0, z=0, seg=10):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=seg, ring_count=max(4, seg // 2), radius=r, location=(x, y, z))
    return _done(bpy.context.object, sw)

def torus(sw, R, r, x=0, y=0, z=0, rx=0.0, maj=14, mn=6):
    bpy.ops.mesh.primitive_torus_add(major_radius=R, minor_radius=r, major_segments=maj, minor_segments=mn, location=(x, y, z), rotation=(rx, 0, 0))
    return _done(bpy.context.object, sw)

def pyramid(sw, w, d, h, x=0, y=0, z=0, top=0.0):
    """Kırma çatı/piramit: taban w x d, sırt uzunluğu top (0 = sivri)."""
    me = bpy.data.meshes.new('pyr')
    hw, hd, t = w / 2, d / 2, top / 2
    vs = [(-hw, -hd, 0), (hw, -hd, 0), (hw, hd, 0), (-hw, hd, 0), (-t, 0, h), (t, 0, h)]
    fs = [(0, 1, 5, 4), (1, 2, 5), (2, 3, 4, 5), (3, 0, 4), (3, 2, 1, 0)]
    me.from_pydata(vs, [], fs); me.update()
    o = bpy.data.objects.new('pyr', me); bpy.context.collection.objects.link(o)
    o.location = (x, y, z)
    bpy.context.view_layer.objects.active = o
    for ob in bpy.context.selected_objects: ob.select_set(False)
    o.select_set(True)
    bm = bmesh.new(); bm.from_mesh(me); bmesh.ops.recalc_face_normals(bm, faces=bm.faces); bm.to_mesh(me); bm.free()
    return _done(o, sw)

def arch_window(sw_frame, sw_glass, w, h, x, y, z, face='-y', depth=0.12):
    """Kemerli pencere: dikdörtgen + yarım daire üst; cepheden hafif dışarı."""
    parts = []
    rz = {'-y': 0, '+y': math.pi, '+x': math.pi / 2, '-x': -math.pi / 2}[face]
    m = Matrix.Rotation(rz, 4, 'Z')
    def place(o):
        o.matrix_world = Matrix.Translation((x, y, z)) @ m @ o.matrix_world
        bpy.context.view_layer.objects.active = o
        bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
        parts.append(o)
    place(box(sw_frame, w + 0.24, depth, h + 0.12, 0, 0, -0.06))
    place(cyl(sw_frame, (w + 0.24) / 2, depth, 0, depth / 2, h - 0.06, n=12, rx=math.pi / 2))
    place(box(sw_glass, w, depth, h - w / 2, 0, -0.03, 0))
    place(cyl(sw_glass, w / 2, depth, 0, depth / 2 - 0.03, h - w / 2, n=12, rx=math.pi / 2))
    return parts

def join(name, objs=None):
    objs = objs or [o for o in bpy.context.scene.objects if o.type == 'MESH' and o.get('asset') is None]
    for o in bpy.context.selected_objects: o.select_set(False)
    for o in objs: o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.object.join()
    o = bpy.context.object; o.name = name; o.data.name = name; o['asset'] = name
    # yinelenen köşeleri birleştirme: düz gölgelemede kenarlar keskin kalsın
    return o

def stash(o, x):
    """Bitmiş parçayı sahnede yana kaydır (dışa aktarımda konum sıfırlanır)."""
    o['ox'] = x

# ---------------------------------------------------------------------------------
clear()
assets = []

# ---------- CUMBA: bir kat yüksekliğinde (3 m), 3 m genişlik, 0.9 m derinlik. Ön = -Y. ----------
def cumba():
    W, D, H = 3.0, 0.9, 3.0
    p = []
    p.append(box('krem', W, D, H - 0.3, 0, -D / 2, 0.15))                     # gövde (ev rengi)
    p.append(box('kahve', W + 0.14, D + 0.1, 0.16, 0, -D / 2 - 0.02, 0.0))    # alt kuşak
    p.append(box('kahve', W + 0.14, D + 0.1, 0.18, 0, -D / 2 - 0.02, H - 0.18))  # üst kuşak
    for sx in (-1, 1):  # köşe dikmeleri
        p.append(box('kahve', 0.14, 0.14, H, sx * (W / 2 - 0.02), -D - 0.02, 0))
    # ön yüzde 3 pencere, yanlarda 1'er (beyaz çerçeve, mavi cam, kahve kepenk çıtası)
    for i in (-1, 0, 1):
        x = i * 0.95
        p.append(box('beyaz', 0.72, 0.08, 1.55, x, -D - 0.02, 0.95))
        p.append(box('acik_mavi', 0.56, 0.08, 1.38, x, -D - 0.05, 1.03))
        p.append(box('beyaz', 0.56, 0.1, 0.06, x, -D - 0.06, 1.68))           # orta kayıt
        p.append(box('kahve_k', 0.86, 0.14, 0.08, x, -D - 0.05, 0.9))          # denizlik
    for sx in (-1, 1):
        p.append(box('beyaz', 0.08, 0.5, 1.55, sx * (W / 2 + 0.02), -D / 2, 0.95))
        p.append(box('acik_mavi', 0.08, 0.36, 1.38, sx * (W / 2 + 0.05), -D / 2, 1.03))
    # tahta kaplama çizgileri (pencere altı)
    for k in range(3):
        p.append(box('kahve_k', W - 0.1, 0.04, 0.05, 0, -D - 0.02, 0.32 + k * 0.2))
    return join('cumba', p)

c = cumba(); assets.append(c)

def cumba_alt():
    """Cumba altı: üç eğik payanda + taban tahtası (genişlik 3 m'ye göre)."""
    p = [box('kahve', 3.1, 0.95, 0.14, 0, -0.45, -0.14)]
    for x in (-1.3, 0, 1.3):
        bpy.ops.mesh.primitive_cube_add(size=1, location=(x, -0.42, -0.55), rotation=(-0.62, 0, 0))
        o = bpy.context.object; o.scale = (0.14, 0.14, 0.95); p.append(_done(o, 'kahve_k'))
    return join('cumba_alt', p)

assets.append(cumba_alt())

def cumba_ust():
    p = [pyramid('kiremit', 3.4, 1.25, 0.45, 0, -0.45, 0, top=2.0), box('kiremit_k', 3.4, 1.25, 0.08, 0, -0.45, -0.02)]
    return join('cumba_ust', p)

assets.append(cumba_ust())

# ---------- ÇEŞME (meydan çeşmesi): 4.2 m kare gövde, geniş saçak, kurşun kubbe ----------
def cesme():
    p = []
    p.append(box('mavi_gri', 6.0, 6.0, 0.35, 0, 0, 0))          # taş zemin basamağı
    p.append(box('krem', 4.2, 4.2, 3.6, 0, 0, 0.35))             # gövde
    p.append(box('ten', 4.5, 4.5, 0.3, 0, 0, 0.35))              # taban silmesi
    p.append(box('ten', 4.4, 4.4, 0.22, 0, 0, 3.6))              # üst silme
    for f, (dx, dy, rz) in {'-y': (0, -1, 0), '+y': (0, 1, math.pi), '+x': (1, 0, math.pi / 2), '-x': (-1, 0, -math.pi / 2)}.items():
        # kemerli niş (yeşil-turkuaz çini), musluk, yalak
        p += arch_window('beyaz', 'yesil', 1.5, 2.3, dx * 2.12, dy * 2.12, 0.9, face=f)
        p.append(cyl('sari', 0.06, 0.35, dx * 2.3, dy * 2.3, 1.3, n=8, rx=math.pi / 2 if dx == 0 else 0, ry=math.pi / 2 if dx != 0 else 0))
        bx, by = (2.6 if dx else 2.0), (2.0 if dx else 2.6)
        p.append(box('mavi_gri', 2.0 if dx == 0 else 0.7, 0.7 if dx == 0 else 2.0, 0.55, dx * 2.5, dy * 2.5, 0.35))   # yalak
        p.append(box('mavi', 1.7 if dx == 0 else 0.45, 0.45 if dx == 0 else 1.7, 0.05, dx * 2.5, dy * 2.5, 0.86))      # su
        # köşe çini kuşak
        p.append(box('mavi', 3.6 if dx == 0 else 0.06, 0.06 if dx == 0 else 3.6, 0.35, dx * 2.11, dy * 2.11, 3.15))
    p.append(box('kahve', 6.6, 6.6, 0.22, 0, 0, 3.82))           # geniş ahşap saçak
    p.append(box('kahve_k', 6.3, 6.3, 0.12, 0, 0, 3.7))
    p.append(pyramid('mavi_gri', 6.6, 6.6, 0.9, 0, 0, 4.04, top=0.0))
    p.append(cyl('mavi_gri', 1.2, 0.6, 0, 0, 4.6, n=16))
    p.append(dome('mavi_gri', 1.25, 0, 0, 5.2, sz=0.9))
    for sx in (-1, 1):
        for sy in (-1, 1):
            p.append(dome('mavi_gri', 0.55, sx * 2.6, sy * 2.6, 4.04, sz=0.9, seg=12))
    p.append(cyl('sari', 0.05, 0.9, 0, 0, 6.2, n=6)); p.append(ball('sari', 0.13, 0, 0, 6.85))
    return join('cesme', p)

assets.append(cesme())

# ---------- SİMİT ARABASI: 1.5 x 0.8, yükseklik ~1.9; tekerlek -x tarafında, kol +x ----------
def simit():
    p = []
    p.append(box('kirmizi', 1.5, 0.8, 0.55, 0, 0, 0.55))           # alt dolap
    p.append(box('beyaz', 1.56, 0.86, 0.08, 0, 0, 1.1))             # tezgah
    p.append(box('sari', 1.5, 0.02, 0.12, 0, -0.41, 0.8))           # şerit
    p.append(box('sari', 1.5, 0.02, 0.12, 0, 0.41, 0.8))
    # cam vitrin
    for sx in (-1, 1):
        for sy in (-1, 1):
            p.append(box('beyaz', 0.05, 0.05, 0.6, sx * 0.72, sy * 0.37, 1.18))
    p.append(box('acik_mavi', 1.4, 0.7, 0.55, 0, 0, 1.18))
    p.append(box('kirmizi', 1.56, 0.86, 0.08, 0, 0, 1.78))          # tavan
    # vitrindeki ve tavandaki simitler
    for i in range(5):
        p.append(torus('ten_k', 0.1, 0.035, -0.5 + i * 0.25, -0.1, 1.24, maj=12, mn=5))
    for i in range(4):
        for j in range(2):
            p.append(torus('ten_k', 0.11, 0.04, -0.42 + i * 0.28, -0.18 + j * 0.36, 1.9 + (i + j) % 2 * 0.06, maj=12, mn=5))
    # tekerlekler + bacaklar + kol
    for sy in (-1, 1):
        p.append(cyl('koyu', 0.3, 0.08, -0.45, sy * 0.46, 0.3 - 0.04, n=14, rx=math.pi / 2))
        p.append(cyl('gri', 0.08, 0.1, -0.45, sy * 0.46, 0.25, n=8, rx=math.pi / 2))
        p.append(box('koyu', 0.06, 0.06, 0.55, 0.62, sy * 0.33, 0))
        p.append(box('koyu', 0.6, 0.05, 0.05, 1.0, sy * 0.33, 0.85))
    p.append(box('koyu', 0.05, 0.72, 0.05, 1.28, 0, 0.85))
    return join('simit_arabasi', p)

assets.append(simit())

# ---------- ÇAY OCAĞI: küçük ahşap kulübe + çizgili tente + semaver ----------
def cay():
    p = []
    W, D, H = 2.4, 1.8, 2.5
    p.append(box('kahve', W, D, H, 0, 0, 0))
    p.append(box('kahve_k', W + 0.1, D + 0.1, 0.12, 0, 0, 0))
    p.append(box('koyu', 1.8, 0.06, 1.0, 0, -D / 2, 1.1))            # servis penceresi (içi koyu)
    p.append(box('ten', 2.0, 0.5, 0.08, 0, -D / 2 - 0.2, 1.05))      # tezgah
    for k in range(4):  # tahta çıtalar
        p.append(box('kahve_k', W + 0.02, D + 0.02, 0.04, 0, 0, 0.25 + k * 0.22))
    # tente: kırmızı-beyaz şerit
    n = 8
    for i in range(n):
        bpy.ops.mesh.primitive_cube_add(size=1, location=(-W / 2 - 0.1 + (i + 0.5) * (W + 0.2) / n, -D / 2 - 0.45, H - 0.05), rotation=(-0.45, 0, 0))
        o = bpy.context.object; o.scale = ((W + 0.2) / n, 1.0, 0.05); p.append(_done(o, 'kirmizi' if i % 2 == 0 else 'beyaz'))
    p.append(pyramid('kiremit', W + 0.5, D + 0.5, 0.6, 0, 0, H, top=1.0))
    p.append(box('sari', 1.5, 0.05, 0.36, 0, -D / 2 - 0.03, H - 0.62))   # tabela
    # semaver + bardaklar
    p.append(cyl('mavi_gri', 0.13, 0.32, -0.6, -D / 2 - 0.2, 1.13, n=12))
    p.append(cyl('mavi_gri', 0.07, 0.12, -0.6, -D / 2 - 0.2, 1.45, n=10))
    p.append(cyl('kahve_k', 0.06, 0.1, -0.6, -D / 2 - 0.2, 1.57, n=10))
    for i in range(4):
        p.append(cyl('kiremit_k', 0.035, 0.09, -0.1 + i * 0.16, -D / 2 - 0.24, 1.13, n=8))
    # çatı bacası
    p.append(box('gri', 0.25, 0.25, 0.7, 0.7, 0.4, H + 0.1))
    return join('cay_ocagi', p)

assets.append(cay())

def cay_masa():
    """Alçak çay masası + 4 tabure."""
    p = [cyl('kahve', 0.35, 0.05, 0, 0, 0.5, n=14), cyl('koyu', 0.04, 0.5, 0, 0, 0, n=6), cyl('koyu', 0.22, 0.03, 0, 0, 0, n=10)]
    for i in range(2):
        p.append(cyl('kiremit_k', 0.035, 0.09, -0.08 + i * 0.16, 0.04, 0.55, n=8))
    for a in range(4):
        x, y = math.cos(a * math.pi / 2 + 0.4) * 0.65, math.sin(a * math.pi / 2 + 0.4) * 0.65
        p.append(box('kirmizi' if a % 2 else 'mavi', 0.32, 0.32, 0.05, x, y, 0.32))
        for sx in (-1, 1):
            for sy in (-1, 1):
                p.append(box('koyu', 0.03, 0.03, 0.32, x + sx * 0.12, y + sy * 0.12, 0))
    return join('cay_masa', p)

assets.append(cay_masa())

# ---------- MİNARE (tek): 40 m gövde + iki şerefe + kurşun külah (toplam ~47 m) ----------
def minare_parts(x=0, y=0):
    p = []
    p.append(cyl('krem', 1.35, 3.0, x, y, 0, n=8))                     # kaide
    p.append(cyl('krem', 0.95, 37.0, x, y, 3.0, n=16))                 # gövde
    for zz in (22.0, 31.0, 37.5):                                     # şerefeler
        p.append(cyl('ten', 1.55, 0.35, x, y, zz, n=16))
        p.append(cyl('krem', 1.5, 0.5, x, y, zz - 0.5, n=16, r2=1.0))
        p.append(cyl('beyaz', 1.5, 0.6, x, y, zz + 0.35, n=16))
    p.append(cyl('krem', 0.8, 2.5, x, y, 38.4, n=16))
    p.append(cyl('mavi_gri', 0.95, 7.0, x, y, 40.9, n=16, r2=0.02))      # külah
    p.append(cyl('sari', 0.06, 1.4, x, y, 47.6, n=6)); p.append(ball('sari', 0.18, x, y, 48.4, seg=8))
    return p

assets.append(join('minare', minare_parts()))

# ---------- CAMİ (Sultan Ahmet ölçüsünde): 34.5 m kare gövde, merkez kubbe, 4 yarım kubbe, 4 minare ----------
def cami():
    p = []
    S = 34.5
    p.append(box('mavi_gri', S + 2, S + 2, 0.8, 0, 0, 0))                 # taban
    p.append(box('krem', S, S, 13.0, 0, 0, 0.8))                          # gövde
    p.append(box('ten', S + 0.5, S + 0.5, 0.5, 0, 0, 13.3))               # saçak silmesi
    # cephelerde iki sıra kemerli pencere + kapı
    for f, (dx, dy) in {'-y': (0, -1), '+y': (0, 1), '+x': (1, 0), '-x': (-1, 0)}.items():
        for row, (z, h, w) in enumerate([(3.2, 3.0, 1.5), (8.4, 2.8, 1.3)]):
            for i in range(-3, 4):
                if row == 0 and i == 0: continue
                t = i * 4.3
                p += arch_window('beyaz', 'mavi_k', w, h, dx * (S / 2 + 0.02) + (t if dx == 0 else 0), dy * (S / 2 + 0.02) + (t if dy == 0 else 0), z, face=f)
        # ana kapı
        p += arch_window('ten', 'kahve_k', 3.2, 6.0, dx * (S / 2 + 0.05), dy * (S / 2 + 0.05), 0.8, face=f, depth=0.4)
    # köşe ağırlık kuleleri
    for sx in (-1, 1):
        for sy in (-1, 1):
            p.append(cyl('krem', 1.6, 4.5, sx * 15.0, sy * 15.0, 13.8, n=8))
            p.append(dome('mavi_gri', 1.7, sx * 15.0, sy * 15.0, 18.3, sz=1.0, seg=10, rings=4))
            p.append(cyl('sari', 0.06, 1.2, sx * 15.0, sy * 15.0, 19.9, n=6))
    # küçük köşe kubbeleri
    for sx in (-1, 1):
        for sy in (-1, 1):
            p.append(cyl('krem', 4.0, 1.4, sx * 10.0, sy * 10.0, 13.8, n=12))
            p.append(dome('mavi_gri', 4.1, sx * 10.0, sy * 10.0, 15.2, sz=0.75, seg=14, rings=5))
    # dört yarım kubbe (dış yüzde tam kubbe, merkez kasnağa gömülü)
    for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        p.append(cyl('krem', 7.2, 1.6, dx * 9.0, dy * 9.0, 13.8, n=20))
        p.append(dome('mavi_gri', 7.3, dx * 9.0, dy * 9.0, 15.4, sz=0.72, seg=20, rings=6))
    # merkez kasnak + pencere halkası + kubbe + alem
    p.append(cyl('krem', 11.3, 4.2, 0, 0, 13.8, n=28))
    for i in range(20):
        a = i / 20 * math.pi * 2
        bpy.ops.mesh.primitive_cube_add(size=1, location=(math.cos(a) * 11.32, math.sin(a) * 11.32, 15.9), rotation=(0, 0, a))
        o = bpy.context.object; o.scale = (0.1, 0.8, 1.6); p.append(_done(o, 'mavi_k'))
    p.append(cyl('ten', 11.6, 0.4, 0, 0, 18.0, n=28))
    p.append(dome('mavi_gri', 11.5, 0, 0, 18.3, sz=0.78, seg=28, rings=8))
    p.append(cyl('sari', 0.12, 3.0, 0, 0, 27.0, n=6))
    p.append(ball('sari', 0.45, 0, 0, 29.2, seg=10)); p.append(ball('sari', 0.32, 0, 0, 30.0, seg=8))
    # dört minare (köşelerde, gövdeden ayrı)
    for sx in (-1, 1):
        for sy in (-1, 1):
            p += minare_parts(sx * 19.5, sy * 19.5)
    return join('cami', p)

assets.append(cami())

# ---------- CAMİ AVLUSU: 26 x 34 m duvar, revak kubbecikleri, -x tarafında taç kapı (gövdenin -x yanına bitişir) ----------
def avlu():
    p = []
    L, Wd, H = 26.0, 34.0, 4.6
    for sy in (-1, 1):
        p.append(box('krem', L, 2.6, H, 0, sy * (Wd / 2 - 1.3), 0))
        for i in range(6):
            p.append(dome('mavi_gri', 1.2, -L / 2 + 2.2 + i * 4.3, sy * (Wd / 2 - 1.3), H, sz=0.8, seg=10, rings=4))
        for i in range(6):
            p += arch_window('beyaz', 'mavi_k', 1.1, 2.0, -L / 2 + 2.2 + i * 4.3, sy * (Wd / 2 + 0.02), 1.3, face='+y' if sy > 0 else '-y')
    p.append(box('krem', 2.6, Wd, H, -L / 2 + 1.3, 0, 0))
    for i in range(-3, 4):
        if i == 0: continue
        p.append(dome('mavi_gri', 1.2, -L / 2 + 1.3, i * 4.6, H, sz=0.8, seg=10, rings=4))
    # taç kapı
    p.append(box('krem', 4.4, 6.0, 7.5, -L / 2 + 1.3, 0, 0))
    p += arch_window('ten', 'kahve_k', 2.4, 4.6, -L / 2 - 0.95, 0, 0.0, face='-x', depth=0.35)
    p.append(dome('mavi_gri', 2.0, -L / 2 + 1.3, 0, 7.5, sz=0.9, seg=12, rings=4))
    # avlu ortasında şadırvan
    p.append(cyl('krem', 2.4, 1.0, 1.0, 0, 0, n=8))
    p.append(cyl('mavi_gri', 0.15, 2.6, 1.0 + 1.9, 0, 0, n=6))
    p.append(pyramid('mavi_gri', 6.0, 6.0, 1.2, 1.0, 0, 3.0))
    for sx in (-1, 1):
        for sy in (-1, 1):
            p.append(cyl('krem', 0.18, 3.0, 1.0 + sx * 2.6, sy * 2.6, 0, n=8))
    return join('cami_avlu', p)

assets.append(avlu())

# ---------- GALATA KULESİ: taş gövde (r 4.6, 40 m), revak katı, şerefe, konik kurşun külah ----------
def galata():
    p = []
    p.append(cyl('ten', 5.2, 2.0, 0, 0, 0, n=24))
    p.append(cyl('ten', 4.6, 38.0, 0, 0, 2.0, n=24))
    for zz in (10.0, 18.0, 26.0, 33.0):                        # küçük pencereler
        for i in range(6):
            a = i / 6 * math.pi * 2 + zz
            bpy.ops.mesh.primitive_cube_add(size=1, location=(math.cos(a) * 4.62, math.sin(a) * 4.62, zz + 0.8), rotation=(0, 0, a))
            o = bpy.context.object; o.scale = (0.1, 0.6, 1.4); p.append(_done(o, 'koyu'))
    for zz in (14.0, 30.0):
        p.append(cyl('ten_k', 4.75, 0.35, 0, 0, zz, n=24))
    p.append(cyl('krem', 4.8, 1.2, 0, 0, 38.8, n=24, r2=5.4))          # konsol
    p.append(cyl('krem', 4.7, 5.0, 0, 0, 40.0, n=24))                   # revak katı
    for i in range(12):
        a = i / 12 * math.pi * 2
        x, y = math.cos(a) * 4.72, math.sin(a) * 4.72
        bpy.ops.mesh.primitive_cube_add(size=1, location=(x, y, 42.0), rotation=(0, 0, a))
        o = bpy.context.object; o.scale = (0.12, 1.3, 2.8); p.append(_done(o, 'koyu'))
    p.append(cyl('ten', 5.7, 0.35, 0, 0, 40.0, n=24))                   # şerefe tabanı
    for i in range(36):                                                  # korkuluk dikmeleri
        a = i / 36 * math.pi * 2
        p.append(box('koyu', 0.08, 0.08, 1.1, math.cos(a) * 5.55, math.sin(a) * 5.55, 40.35))
    p.append(torus('koyu', 5.55, 0.06, 0, 0, 41.45, maj=36, mn=4))
    p.append(cyl('ten_k', 5.0, 0.4, 0, 0, 45.0, n=24))
    p.append(cyl('mavi_gri', 5.1, 13.0, 0, 0, 45.4, n=24, r2=0.15))     # külah
    p.append(cyl('sari', 0.08, 2.2, 0, 0, 58.3, n=6)); p.append(ball('sari', 0.3, 0, 0, 59.6, seg=8))
    return join('galata_kulesi', p)

assets.append(galata())

# ---------- dışa aktarım: her parça kendi düğümü, köken 0 ----------
for o in assets:
    o.location = (0, 0, 0)
    o.data.materials.clear()
mat = bpy.data.materials.new('colormap')
for o in assets: o.data.materials.append(mat)
for o in bpy.context.scene.objects: o.select_set(o in assets)
bpy.ops.export_scene.gltf(filepath=OUT, export_format='GLB', use_selection=True, export_yup=True,
                          export_apply=True, export_normals=True, export_texcoords=True, export_materials='PLACEHOLDER')
print('OK', OUT, [o.name for o in assets], [len(o.data.polygons) for o in assets])
