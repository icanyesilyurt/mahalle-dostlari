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
    'koyu': (16, 448), 'gri': (80, 448), 'mavi_gri': (144, 448), 'mavi_gri_k': (176, 480), 'beyaz': (208, 448), 'beyaz_g': (240, 470), 'krem_k2': (496, 470),
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

def ico(sw, r, x=0, y=0, z=0):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=r, location=(x, y, z))
    return _done(bpy.context.object, sw)

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

# ---------- MİNARE: ince, beyaz taş gövde, şerefe balkonları (korkuluklu), sivri kurşun külah ----------
def quarter_dome(sw, r, x, y, z, dx, dy, sz=1.0, seg=24, rings=8):
    """Yarım kubbe (çeyrek küre): (dx,dy) yönüne açılan dış kabuk; düz yüzü merkeze bakar."""
    bpy.ops.mesh.primitive_uv_sphere_add(segments=seg, ring_count=rings * 2, radius=r, location=(x, y, z))
    o = bpy.context.object
    bm = bmesh.new(); bm.from_mesh(o.data)
    kill = [v for v in bm.verts if v.co.z < -1e-4 or (v.co.x * dx + v.co.y * dy) < -1e-4]
    bmesh.ops.delete(bm, geom=kill, context='VERTS')
    bm.to_mesh(o.data); bm.free()
    o.scale = (1, 1, sz)
    return _done(o, sw)

def minare_parts(x=0, y=0, H=44.0, serefe=3, r=0.72):
    p = []
    p.append(cyl('beyaz_g', 1.25, 2.6, x, y, 0, n=12))                    # kaide
    p.append(cyl('beyaz', 1.0, 1.0, x, y, 2.6, n=16, r2=r))                # geçiş
    p.append(cyl('beyaz', r, H - 3.6, x, y, 3.6, n=16))                     # gövde
    top = H
    levels = [H * 0.55, H * 0.72, H * 0.88][3 - serefe:]
    for zz in levels:
        p.append(cyl('beyaz_g', r + 0.05, 0.7, x, y, zz - 0.7, n=16, r2=r + 0.6))  # mukarnas çıkma
        p.append(cyl('beyaz', r + 0.65, 0.18, x, y, zz, n=20))              # balkon tabanı
        for i in range(16):                                                 # korkuluk dikmeleri
            a = i / 16 * math.pi * 2
            p.append(box('beyaz_g', 0.07, 0.07, 0.8, x + math.cos(a) * (r + 0.58), y + math.sin(a) * (r + 0.58), zz + 0.18))
        p.append(torus('beyaz_g', r + 0.58, 0.05, x, y, zz + 1.0, maj=20, mn=4))
    p.append(cyl('beyaz', r * 0.9, 1.6, x, y, top, n=16))                   # külah altı
    p.append(cyl('gri', r * 1.05, 6.5, x, y, top + 1.6, n=16, r2=0.03))     # sivri kurşun külah
    p.append(cyl('sari', 0.05, 1.3, x, y, top + 8.0, n=6)); p.append(ball('sari', 0.16, x, y, top + 8.7, seg=8))
    return p

assets.append(join('minare', minare_parts()))

# ---------- SULTAN AHMET CAMİİ: kademeli kubbeler (merkez + 4 yarım + 8 eksedra + 4 köşe), 4 minare gövde köşesinde ----------
def cami_body(minarets, name):
    p = []
    S = 34.5
    p.append(box('mavi_gri', S + 2, S + 2, 0.8, 0, 0, 0))
    p.append(box('krem', S, S, 12.0, 0, 0, 0.8))                             # gövde (açık taş)
    p.append(box('krem_k', S + 0.5, S + 0.5, 0.45, 0, 0, 12.6))              # saçak silmesi
    # cephelerde kemerli pencere sıraları + ortada taç kapı
    for f, (dx, dy) in {'-y': (0, -1), '+y': (0, 1), '+x': (1, 0), '-x': (-1, 0)}.items():
        for z, h, w in ((2.6, 2.6, 1.3), (6.6, 2.4, 1.2), (10.0, 1.8, 0.9)):
            for i in range(-3, 4):
                if z < 3 and i == 0: continue
                t = i * 4.3
                p += arch_window('beyaz', 'mavi_k', w, h, dx * (S / 2 + 0.02) + (t if dx == 0 else 0), dy * (S / 2 + 0.02) + (t if dy == 0 else 0), z, face=f)
        p += arch_window('krem_k', 'kahve_k', 3.0, 6.2, dx * (S / 2 + 0.05), dy * (S / 2 + 0.05), 0.8, face=f, depth=0.5)
    # 4 köşe kubbesi (en alt kademe)
    for sx in (-1, 1):
        for sy in (-1, 1):
            p.append(cyl('krem', 4.2, 1.6, sx * 11.8, sy * 11.8, 13.0, n=16))
            p.append(dome('gri', 4.3, sx * 11.8, sy * 11.8, 14.6, sz=0.8, seg=18, rings=6))
            p.append(cyl('sari', 0.06, 1.0, sx * 11.8, sy * 11.8, 18.0, n=6))
    # 4 yarım kubbe + her birinin iki yanında eksedra yarım kubbecikleri (orta kademe)
    for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        cx, cy = dx * 8.6, dy * 8.6
        p.append(box('krem', 17.4 if dx == 0 else 6.0, 17.4 if dy == 0 else 6.0, 3.0, cx + dx * 3.0, cy + dy * 3.0, 13.0))
        p.append(quarter_dome('gri', 8.6, cx, cy, 16.0, dx, dy, sz=0.95, seg=28, rings=9))
        for s in (-1, 1):
            ex, ey = cx + dx * 2.8 + (s * 5.6 if dx == 0 else 0), cy + dy * 2.8 + (s * 5.6 if dy == 0 else 0)
            odx, ody = (dx, dy)
            p.append(quarter_dome('gri', 3.3, ex, ey, 16.0, odx, ody, sz=0.95, seg=16, rings=6))
        # yarım kubbe kasnağında pencere dizisi
        for i in range(-3, 4):
            px = cx + dx * 8.62 + (i * 2.2 if dx == 0 else 0)
            py = cy + dy * 8.62 + (i * 2.2 if dy == 0 else 0)
            if abs(i) <= 2:
                p.append(box('mavi_k', 0.7 if dx == 0 else 0.1, 0.7 if dy == 0 else 0.1, 1.4, px, py, 14.0))
    # merkez kare kaide + 4 ağırlık kulesi (sekizgen, küçük kubbeli)
    p.append(box('krem', 23.0, 23.0, 4.0, 0, 0, 13.0))
    for sx in (-1, 1):
        for sy in (-1, 1):
            p.append(cyl('krem', 1.9, 9.5, sx * 11.0, sy * 11.0, 13.0, n=8))
            p.append(cyl('krem_k', 2.1, 0.4, sx * 11.0, sy * 11.0, 22.5, n=8))
            p.append(dome('gri', 1.9, sx * 11.0, sy * 11.0, 22.9, sz=1.1, seg=12, rings=4))
            p.append(cyl('sari', 0.06, 1.3, sx * 11.0, sy * 11.0, 24.9, n=6))
    # merkez kasnak (pencere halkası) + büyük kubbe + alem
    p.append(cyl('krem', 11.4, 4.6, 0, 0, 17.0, n=32))
    for i in range(28):
        a = i / 28 * math.pi * 2
        bpy.ops.mesh.primitive_cube_add(size=1, location=(math.cos(a) * 11.42, math.sin(a) * 11.42, 19.2), rotation=(0, 0, a))
        o = bpy.context.object; o.scale = (0.1, 0.75, 1.9); p.append(_done(o, 'mavi_k'))
    for i in range(28):  # payandalar
        a = (i + 0.5) / 28 * math.pi * 2
        bpy.ops.mesh.primitive_cube_add(size=1, location=(math.cos(a) * 11.6, math.sin(a) * 11.6, 19.3), rotation=(0, 0, a))
        o = bpy.context.object; o.scale = (0.8, 0.45, 4.6); p.append(_done(o, 'krem'))
    p.append(cyl('krem_k', 11.8, 0.45, 0, 0, 21.6, n=32))
    p.append(dome('gri', 11.6, 0, 0, 22.0, sz=0.82, seg=32, rings=10))
    p.append(cyl('sari', 0.12, 2.6, 0, 0, 31.4, n=6))
    p.append(ball('sari', 0.42, 0, 0, 33.4, seg=10)); p.append(ball('sari', 0.3, 0, 0, 34.2, seg=8))
    for mx, my in minarets:
        p += minare_parts(mx, my, H=44.0, serefe=3)
    return join(name, p)

def cami():
    return cami_body([(sx * 19.5, sy * 19.5) for sx in (-1, 1) for sy in (-1, 1)], 'cami')

assets.append(cami())

# ---------- CAMİ AVLUSU: revaklı avlu (kubbecikler), taç kapı, şadırvan + avlunun dış köşelerinde 2 minare (toplam 6) ----------
def avlu():
    p = []
    L, Wd, H = 26.0, 34.0, 4.6
    for sy in (-1, 1):
        p.append(box('krem', L, 2.6, H, 0, sy * (Wd / 2 - 1.3), 0))
        for i in range(6):
            p.append(dome('gri', 1.25, -L / 2 + 2.2 + i * 4.3, sy * (Wd / 2 - 1.3), H, sz=0.85, seg=12, rings=4))
            p += arch_window('beyaz', 'mavi_k', 1.1, 2.0, -L / 2 + 2.2 + i * 4.3, sy * (Wd / 2 + 0.02), 1.3, face='+y' if sy > 0 else '-y')
    p.append(box('krem', 2.6, Wd, H, -L / 2 + 1.3, 0, 0))
    for i in range(-3, 4):
        if i == 0: continue
        p.append(dome('gri', 1.25, -L / 2 + 1.3, i * 4.6, H, sz=0.85, seg=12, rings=4))
    p.append(box('krem', 4.6, 6.4, 8.0, -L / 2 + 1.3, 0, 0))                 # taç kapı
    p += arch_window('krem_k', 'kahve_k', 2.4, 4.8, -L / 2 - 1.05, 0, 0.0, face='-x', depth=0.4)
    p.append(dome('gri', 2.2, -L / 2 + 1.3, 0, 8.0, sz=0.95, seg=14, rings=5))
    # avlu içi revak sütunları
    for sy in (-1, 1):
        for i in range(6):
            p.append(cyl('beyaz', 0.25, H - 0.4, -L / 2 + 2.2 + i * 4.3, sy * (Wd / 2 - 3.2), 0, n=8))
    # şadırvan
    p.append(cyl('krem', 2.4, 1.0, 1.0, 0, 0, n=8))
    for sx in (-1, 1):
        for sy in (-1, 1):
            p.append(cyl('beyaz', 0.18, 3.0, 1.0 + sx * 2.6, sy * 2.6, 0, n=8))
    p.append(pyramid('gri', 6.4, 6.4, 1.2, 1.0, 0, 3.0))
    p.append(dome('gri', 1.0, 1.0, 0, 4.1, seg=10, rings=4))
    # avlunun dış köşelerinde 2 minare (2 şerefeli)
    for sy in (-1, 1):
        p += minare_parts(-L / 2 + 0.9, sy * (Wd / 2 - 0.9), H=36.0, serefe=2)
    return join('cami_avlu', p)

assets.append(avlu())

# ---------- AYASOFYA: kırmızımsı gövde, basık büyük kubbe (40 pencereli kasnak), doğu-batı yarım kubbeler, payandalar, 4 minare ----------
def ayasofya():
    p = []
    L, W = 37.0, 31.0                                  # x boyunca uzun; giriş -x
    p.append(box('mavi_gri', L + 3, W + 3, 0.6, 0, 0, 0))
    p.append(box('krem', L, W, 11.0, 0, 0, 0.6))
    p.append(box('krem_k', L + 0.4, W + 0.4, 0.4, 0, 0, 11.6))
    # yan cephe pencereleri
    for sy in (-1, 1):
        for i in range(-4, 5):
            p += arch_window('beyaz', 'mavi_k', 1.2, 2.4, i * 3.9, sy * (W / 2 + 0.02), 2.4, face='+y' if sy > 0 else '-y')
            p += arch_window('beyaz', 'mavi_k', 1.0, 2.0, i * 3.9, sy * (W / 2 + 0.02), 7.2, face='+y' if sy > 0 else '-y')
    for sx in (-1, 1):
        for i in range(-3, 4):
            p += arch_window('beyaz', 'mavi_k', 1.2, 2.4, sx * (L / 2 + 0.02), i * 3.9, 6.0, face='+x' if sx > 0 else '-x')
    p += arch_window('krem_k', 'kahve_k', 3.2, 5.4, -L / 2 - 0.05, 0, 0.6, face='-x', depth=0.5)
    # dev payandalar (kuzey-güney)
    for sx in (-9.0, 9.0):
        for sy in (-1, 1):
            p.append(box('krem', 4.0, 6.0, 16.0, sx, sy * (W / 2 + 1.6), 0))
            p.append(pyramid('krem_k', 4.2, 6.2, 1.4, sx, sy * (W / 2 + 1.6), 16.0))
    # kare kaide + kasnak + basık kubbe
    p.append(box('krem', 24.0, 24.0, 5.0, 0, 0, 12.0))
    p.append(cyl('krem', 12.4, 2.6, 0, 0, 17.0, n=40))
    for i in range(40):
        a = i / 40 * math.pi * 2
        bpy.ops.mesh.primitive_cube_add(size=1, location=(math.cos(a) * 12.42, math.sin(a) * 12.42, 18.2), rotation=(0, 0, a))
        o = bpy.context.object; o.scale = (0.1, 0.55, 1.3); p.append(_done(o, 'mavi_k'))
        a2 = (i + 0.5) / 40 * math.pi * 2
        bpy.ops.mesh.primitive_cube_add(size=1, location=(math.cos(a2) * 12.6, math.sin(a2) * 12.6, 18.3), rotation=(0, 0, a2))
        o = bpy.context.object; o.scale = (0.6, 0.35, 2.6); p.append(_done(o, 'krem'))
    p.append(dome('gri', 12.5, 0, 0, 19.6, sz=0.55, seg=40, rings=10))
    p.append(cyl('sari', 0.1, 1.8, 0, 0, 26.4, n=6)); p.append(ball('sari', 0.3, 0, 0, 28.3, seg=8))
    # doğu ve batı yarım kubbeler + eksedralar (kademeli)
    for dx in (1, -1):
        p.append(box('krem', 8.0, 22.0, 4.0, dx * 14.0, 0, 11.6))
        p.append(quarter_dome('gri', 11.0, dx * 12.0, 0, 15.2, dx, 0, sz=0.6, seg=32, rings=9))
        for s in (-1, 1):
            p.append(quarter_dome('gri', 4.2, dx * 15.5, s * 7.0, 12.0, dx, 0, sz=0.75, seg=16, rings=6))
    # 4 minare (Ayasofya'nınkiler; 1 şerefeli)
    for sx, sy in ((-21, -18), (-21, 18), (21, -18), (21, 18)):
        p += minare_parts(sx, sy, H=32.0, serefe=1, r=0.8)
    return join('ayasofya', p)

assets.append(ayasofya())

# ---------- GÜVERCİN (0.3 m): gri gövde, koyu baş; oyunda gagalar ve yaklaşınca uçar ----------
def guvercin():
    p = []
    bpy.ops.mesh.primitive_uv_sphere_add(segments=8, ring_count=5, radius=0.1, location=(0, 0, 0.14))
    o = bpy.context.object; o.scale = (0.9, 1.5, 0.85); p.append(_done(o, 'mavi_gri'))
    p.append(ball('gri', 0.06, 0, -0.15, 0.24, seg=7))
    bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=0.02, radius2=0.0, depth=0.05, location=(0, -0.21, 0.235), rotation=(math.pi / 2, 0, 0))
    p.append(_done(bpy.context.object, 'turuncu'))
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0.17, 0.16), rotation=(-0.3, 0, 0))
    o = bpy.context.object; o.scale = (0.1, 0.14, 0.02); p.append(_done(o, 'gri'))
    for s in (-1, 1):
        bpy.ops.mesh.primitive_cube_add(size=1, location=(s * 0.085, 0.02, 0.17), rotation=(0, s * 0.2, 0))
        o = bpy.context.object; o.scale = (0.03, 0.2, 0.08); p.append(_done(o, 'gri'))
        p.append(box('kiremit', 0.015, 0.015, 0.07, s * 0.035, 0.0, 0))
    return join('guvercin', p)

assets.append(guvercin())

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

# ---------- PENCERE TAKIMI: taş söve + beyaz çerçeve + kayıtlar (2/4/6 bölme) + koyu cam; kepenk, saksı, balkon ----------
# Köken: pencerenin alt-orta noktası, duvar yüzü (Blender y=0); her şey duvarın önünde (-Y = glTF +Z).
# Cam = 'cam' karesi: oyundaki shader koyu lacivert-yeşil + hafif yansıma yapar.
SW['cam'] = (336, 320)
PW, PH = 1.0, 1.7

def _f(sw, sx, sz, x, z, d0, d1):
    """ön yüz düzleminde dikdörtgen kutu: x merkez, z alt, d0..d1 duvardan uzaklık (pozitif = dışarı)."""
    return box(sw, sx, d1 - d0, sz, x, -(d0 + d1) / 2, z)

def window_core(p, W=PW, H=PH, bars=(1, 1), arch=False):
    p.append(_f('beyaz_g', W + 0.36, H + 0.34, 0, -0.17, 0.0, 0.05))            # söve
    p.append(_f('cam', W, H, 0, 0, 0.05, 0.07))                              # cam
    t = 0.07
    for x in (-(W - t) / 2, (W - t) / 2): p.append(_f('beyaz', t, H, x, 0, 0.05, 0.12))
    for z in (0, H - t): p.append(_f('beyaz', W, t, 0, z, 0.05, 0.12))
    vx, hz = bars
    for i in range(1, vx + 1): p.append(_f('beyaz', 0.045, H, -W / 2 + i * W / (vx + 1), 0, 0.05, 0.1))
    for j in range(1, hz + 1): p.append(_f('beyaz', W, 0.045, 0, j * H / (hz + 1) + (0.12 if hz == 1 else 0), 0.05, 0.1))
    p.append(_f('beyaz_g', W + 0.5, 0.1, 0, -0.12, 0.0, 0.22))                  # denizlik
    if arch:
        p.append(cyl('beyaz_g', (W + 0.36) / 2, 0.05, 0, -0.025, H, n=14, rx=math.pi / 2))
        p.append(cyl('cam', W / 2, 0.02, 0, -0.06, H, n=14, rx=math.pi / 2))
        p.append(_f('beyaz', 0.045, W / 2, 0, H, 0.05, 0.1))
    else:
        p.append(_f('beyaz_g', W + 0.5, 0.16, 0, H + 0.12, 0.0, 0.14))          # alınlık
    return p

def shutters(p, sw, open_, W=PW, H=PH):
    sw2 = W / 2
    for s in (-1, 1):
        if open_:
            cx, d0 = s * (W / 2 + 0.18 + sw2 / 2), 0.0
        else:
            cx, d0 = s * sw2 / 2, 0.12
        p.append(_f(sw, sw2 - 0.03, H, cx, 0, d0, d0 + 0.04))
        for k in range(4):                                                   # panjur çıtaları
            p.append(_f(sw + '_k' if sw + '_k' in SW else sw, sw2 - 0.12, 0.05, cx, 0.2 + k * (H - 0.4) / 3, d0 + 0.04, d0 + 0.06))

def flowerbox(p, W=PW):
    p.append(_f('kiremit_k', W + 0.15, 0.24, 0, -0.02, 0.22, 0.5))
    for i in range(4):
        x = -W / 2 + 0.15 + i * (W - 0.3) / 3
        p.append(ico('yesil' if i % 2 else 'yesil_k', 0.15, x, -0.36, 0.32))
        p.append(ico(['kirmizi', 'mor', 'sari', 'kirmizi'][i], 0.08, x + 0.03, -0.44, 0.44))

SW['kahve_k'] = SW['kahve_k']; SW['yesil_k'] = SW['yesil_k']
for name, bars, extra in [
    ('pen_2', (1, 0), None), ('pen_4', (1, 1), None), ('pen_6', (1, 2), None), ('pen_kemer', (1, 1), 'arch'),
    ('pen_kepenk_yesil_acik', (1, 1), ('yesil', True)), ('pen_kepenk_kahve_acik', (1, 1), ('kahve', True)),
    ('pen_kepenk_yesil_kapali', (1, 1), ('yesil', False)), ('pen_kepenk_kahve_kapali', (1, 1), ('kahve', False)),
    ('pen_saksi', (1, 1), 'saksi'),
]:
    p = window_core([], bars=bars, arch=(extra == 'arch'))
    if isinstance(extra, tuple): shutters(p, extra[0], extra[1])
    if extra == 'saksi': flowerbox(p)
    assets.append(join(name, p))

# uzak mesafe (LOD): yalnız ön yüz — söve düzlemi + cam düzlemi + orta kayıt (6 üçgen)
def quad(sw, w, h, x, z, d):
    bpy.ops.mesh.primitive_plane_add(size=1, location=(x, -d, z + h / 2), rotation=(math.pi / 2, 0, 0))
    o = bpy.context.object; o.scale = (w, h, 1)
    return _done(o, sw)
assets.append(join('pen_lod', [quad('beyaz_g', PW + 0.36, PH + 0.34, 0, -0.17, 0.02), quad('cam', PW, PH, 0, 0, 0.05), quad('beyaz', 0.06, PH, 0, 0, 0.06)]))

def balkon():
    p = []
    W, H = 1.3, 2.35
    p.append(_f('beyaz_g', W + 0.36, H + 0.3, 0, -0.02, 0.0, 0.05))
    p.append(_f('cam', W, H, 0, 0, 0.05, 0.07))
    for x in (-(W - 0.07) / 2, 0, (W - 0.07) / 2): p.append(_f('beyaz', 0.07, H, x, 0, 0.05, 0.12))
    for z in (0.9, 1.6, H - 0.07): p.append(_f('beyaz', W, 0.05, 0, z, 0.05, 0.1))
    p.append(_f('beyaz_g', 2.3, 0.14, 0, -0.14, 0.0, 0.95))                      # balkon döşemesi
    for x in (-1.1, 1.1): p.append(_f('koyu', 0.05, 0.95, x, 0, 0.05, 0.1))  # yan korkuluk
    p.append(_f('koyu', 2.25, 0.05, 0, 0.92, 0.88, 0.94))                    # küpeşte
    for s in (-1, 1): p.append(box('koyu', 0.05, 0.85, 0.05, s * 1.1, -0.5, 0.92))
    for i in range(14):                                                      # ferforje çubuklar
        x = -1.05 + i * 2.1 / 13
        p.append(_f('koyu', 0.025, 0.92, x, 0, 0.88, 0.91))
    for i in range(6):                                                       # ferforje halkalar
        p.append(torus('koyu', 0.09, 0.015, -0.9 + i * 0.36, -0.9, 0.5, rx=math.pi / 2, maj=10, mn=3))
    for x in (-0.85, 0.85):                                                  # saksılar
        p.append(cyl('kiremit_k', 0.13, 0.22, x, -0.65, 0, n=8))
        p.append(ball('yesil', 0.16, x, -0.65, 0.32, seg=6)); p.append(ball('kirmizi', 0.07, x + 0.05, -0.7, 0.42, seg=6))
    return join('balkon', p)

assets.append(balkon())

# ---------- YENİ CAMİ (Eminönü): Sultanahmet ile aynı dil, 2 minare (ön tarafta) ----------
def yeni_cami():
    o = cami_body(minarets=[(-19.5, 19.5), (19.5, 19.5)], name='yeni_cami')
    return o

assets.append(yeni_cami())

# ---------- MISIR ÇARŞISI: 57.4 x 22.4 m uzun çarşı, iki yanda kemerli dükkânlar, çatıda kubbecik sıraları, uçlarda taç kapı ----------
def misir():
    p = []
    L, W, H = 57.4, 22.4, 7.4
    p.append(box('mavi_gri', L + 1, W + 1, 0.4, 0, 0, 0))
    p.append(box('krem', L, W, H, 0, 0, 0.4))
    p.append(box('krem_k', L + 0.4, W + 0.4, 0.45, 0, 0, H + 0.4))
    for sy in (-1, 1):
        for i in range(12):
            x = -L / 2 + 2.6 + i * (L - 5.2) / 11
            f = '+y' if sy > 0 else '-y'
            p += arch_window('ten', 'koyu', 2.6, 3.0, x, sy * (W / 2 + 0.02), 0.4, face=f, depth=0.14)
            p.append(box('kahve' if i % 3 else 'kirmizi', 2.4, 0.08, 0.5, x, sy * (W / 2 + 0.22), 3.3))     # dükkân tabelası
            p += arch_window('ten', 'cam', 1.0, 1.4, x, sy * (W / 2 + 0.02), 4.9, face=f)
    for sx in (-1, 1):                                                       # taç kapılar
        p.append(box('krem', 3.0, 10.0, 10.5, sx * (L / 2 + 0.8), 0, 0))
        p += arch_window('ten', 'koyu', 4.0, 6.2, sx * (L / 2 + 2.32), 0, 0.4, face='+x' if sx > 0 else '-x', depth=0.3)
        p.append(dome('gri', 2.2, sx * (L / 2 + 0.8), 0, 10.5, sz=0.9, seg=12, rings=4))
    for row in (-1, 1):                                                      # çatı kubbecikleri
        for i in range(10):
            x = -L / 2 + 3.5 + i * (L - 7) / 9
            p.append(cyl('krem', 1.55, 0.6, x, row * 5.2, H + 0.8, n=12))
            p.append(dome('gri', 1.6, x, row * 5.2, H + 1.4, sz=0.85, seg=12, rings=4))
    for i in range(5):                                                       # orta sırt ve bacalar
        p.append(box('ten', 0.6, 0.6, 1.4, -L / 2 + 6 + i * 11.5, 0, H + 0.8))
    return join('misir_carsisi', p)

assets.append(misir())

# ---------- GALATA KÖPRÜSÜ parçası: 10 m (z boyunca), 16 m genişlik; döşeme üstü y=0 ----------
def kopru():
    p = []
    Wd, L = 16.0, 10.0
    p.append(box('mavi_gri', Wd, L, 0.7, 0, 0, -0.7))                        # döşeme
    p.append(box('gri', 10.5, L, 0.02, 0, 0, 0.0))                           # asfalt
    for s in (-1, 1):
        p.append(box('beyaz_g', 2.6, L, 0.16, s * 6.6, 0, 0.0))              # yaya kaldırımı
        p.append(box('koyu', 0.08, L, 0.08, s * 7.9, 0, 1.0))                # küpeşte
        for k in range(8): p.append(box('koyu', 0.06, 0.06, 1.0, s * 7.9, -L / 2 + 0.6 + k * 1.25, 0.0))
        p.append(box('koyu', 0.04, L, 0.04, s * 7.9, 0, 0.5))
        # iki kollu fener
        p.append(cyl('koyu', 0.1, 4.6, s * 7.6, 0, 0.0, n=8))
        p.append(box('koyu', 1.2, 0.08, 0.08, s * 7.6, 0, 4.4))
        for dx in (-0.55, 0.55):
            p.append(cyl('beyaz', 0.14, 0.42, s * 7.6 + dx, 0, 4.0, n=8)); p.append(cyl('koyu', 0.16, 0.1, s * 7.6 + dx, 0, 4.42, n=8))
    for s in (-1, 1):                                                        # ayaklar
        p.append(cyl('krem_k', 1.1, 6.0, s * 5.0, 0, -6.7, n=10))
    p.append(box('krem_k', 11.0, 1.4, 1.2, 0, 0, -1.9))
    return join('kopru', p)

assets.append(kopru())

# ---------- ARAÇLAR (ön = -Y Blender = glTF +Z). Boyalı yüzeyler 'krem' karesi: oyunda seçilen renge boyanır. ----------
def teker(name, r, w):
    p = [cyl('koyu', r, w, 0, 0, -w / 2, n=18, ry=math.pi / 2)]
    p[0].location = (0, 0, 0)
    p.append(cyl('gri', r * 0.55, w + 0.02, 0, 0, -(w + 0.02) / 2, n=12, ry=math.pi / 2))
    for i in range(4):
        bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0), rotation=(i * math.pi / 4, 0, 0))
        o = bpy.context.object; o.scale = (w * 0.5, r * 1.6, 0.03); p.append(_done(o, 'beyaz_g'))
    return join(name, p)

assets.append(teker('teker_ince', 0.33, 0.05))
assets.append(teker('teker_orta', 0.24, 0.1))
assets.append(teker('teker_kalin', 0.36, 0.22))

def bisiklet():
    p = []
    def bar(sw, a, b, r=0.025):
        a, b = Vector(a), Vector(b); d = b - a
        bpy.ops.mesh.primitive_cylinder_add(vertices=8, radius=r, depth=d.length, location=(a + b) / 2)
        o = bpy.context.object; o.rotation_mode = 'QUATERNION'; o.rotation_quaternion = Vector((0, 0, 1)).rotation_difference(d.normalized())
        return _done(o, sw)
    # kadro (boyalı)
    fy, ry_ = -0.62, 0.62          # ön/arka teker merkezleri (y), yükseklik 0.33
    p += [bar('krem', (0, ry_, 0.33), (0, 0.05, 0.75)), bar('krem', (0, ry_, 0.33), (0, -0.05, 0.36)), bar('krem', (0, -0.05, 0.36), (0, 0.05, 0.75)),
          bar('krem', (0, 0.05, 0.75), (0, -0.48, 0.82)), bar('krem', (0, -0.05, 0.36), (0, -0.5, 0.82)), bar('krem', (0, -0.5, 0.82), (0, fy, 0.33))]
    p.append(bar('gri', (0, 0.05, 0.75), (0, 0.12, 0.86), 0.02))
    p.append(box('koyu', 0.16, 0.28, 0.06, 0, 0.14, 0.86))                     # sele
    p.append(bar('gri', (0, -0.5, 0.82), (0, -0.46, 0.98), 0.02))
    p.append(bar('koyu', (-0.28, -0.46, 0.98), (0.28, -0.46, 0.98), 0.018))    # gidon
    for sx in (-1, 1): p.append(cyl('koyu', 0.026, 0.1, sx * 0.3, -0.46, 0.93, n=8, ry=math.pi / 2))
    p.append(bar('gri', (0, 0.62, 0.33), (0, 0.62, 0.55), 0.02))                # arka çamurluk desteği
    p.append(box('krem', 0.08, 0.5, 0.025, 0, 0.62, 0.66))                     # arka çamurluk
    # ön sepet (hasır): hayvan burada taşınır
    p.append(box('kahve', 0.42, 0.36, 0.03, 0, -0.78, 0.74))
    for sx in (-1, 1): p.append(box('kahve', 0.03, 0.36, 0.24, sx * 0.205, -0.78, 0.74))
    for sy in (-1, 1): p.append(box('kahve', 0.42, 0.03, 0.24, 0, -0.78 + sy * 0.165, 0.74))
    for k in range(3): p.append(box('kahve_k', 0.43, 0.37, 0.02, 0, -0.78, 0.8 + k * 0.07))
    p.append(cyl('beyaz', 0.05, 0.06, 0, -0.62, 0.86, n=10, rx=math.pi / 2))   # far
    return join('bisiklet', p)

assets.append(bisiklet())

def scooter():
    p = []
    p.append(box('krem', 0.36, 1.1, 0.22, 0, 0.1, 0.28))                       # taban
    bpy.ops.mesh.primitive_uv_sphere_add(segments=16, ring_count=10, radius=0.4, location=(0, 0.42, 0.55))
    o = bpy.context.object; o.scale = (0.55, 1.05, 0.62); p.append(_done(o, 'krem'))   # arka gövde (Vespa)
    p.append(box('koyu', 0.3, 0.56, 0.1, 0, 0.3, 0.78))                        # sele
    p.append(box('krem', 0.4, 0.14, 0.75, 0, -0.5, 0.3))                       # ön kalkan
    p.append(cyl('krem', 0.05, 0.55, 0, -0.56, 0.62, n=10))                    # direksiyon borusu
    p.append(box('koyu', 0.62, 0.06, 0.05, 0, -0.56, 1.15))                    # gidon
    p.append(cyl('beyaz', 0.08, 0.06, 0, -0.62, 1.05, n=12, rx=math.pi / 2))   # far
    p.append(box('krem', 0.16, 0.42, 0.08, 0, -0.62, 0.42))                    # ön çamurluk
    # arka hayvan sandığı
    p.append(box('kahve', 0.44, 0.42, 0.03, 0, 0.82, 0.8))
    for sx in (-1, 1): p.append(box('kahve', 0.03, 0.42, 0.26, sx * 0.215, 0.82, 0.8))
    for sy in (-1, 1): p.append(box('kahve', 0.44, 0.03, 0.26, 0, 0.82 + sy * 0.2, 0.8))
    p.append(box('kirmizi', 0.1, 0.03, 0.06, 0, 0.84, 0.55))                   # stop lambası
    return join('scooter', p)

assets.append(scooter())

def pikap():
    p = []
    L, W = 4.2, 1.8
    p.append(box('gri', W, L, 0.25, 0, 0, 0.35))                               # şasi
    p.append(box('krem', W, 1.3, 0.6, 0, -1.45, 0.55))                         # kaput
    p.append(box('krem', W, 1.4, 0.65, 0, -0.1, 0.55))                         # kabin alt
    p.append(box('krem', W - 0.08, 1.25, 0.6, 0, -0.05, 1.2))                  # kabin üst
    p.append(box('cam', W - 0.04, 0.05, 0.45, 0, -0.69, 1.25))                 # ön cam
    for sx in (-1, 1): p.append(box('cam', 0.05, 0.8, 0.42, sx * (W / 2 - 0.03), -0.1, 1.27))
    p.append(box('krem', W - 0.04, 1.3, 0.06, 0, -0.05, 1.8))                  # tavan
    # kasa: taban + yan ve arka kapaklar
    p.append(box('kahve_k', W - 0.1, 1.95, 0.06, 0, 1.6, 0.6))
    for sx in (-1, 1): p.append(box('krem', 0.08, 2.0, 0.45, sx * (W / 2 - 0.04), 1.6, 0.6))
    p.append(box('krem', W, 0.08, 0.45, 0, 2.58, 0.6))
    # tampon, farlar, ızgara
    p.append(box('gri', W + 0.06, 0.14, 0.18, 0, -2.12, 0.42)); p.append(box('gri', W + 0.06, 0.12, 0.16, 0, 2.64, 0.42))
    for sx in (-1, 1):
        p.append(cyl('beyaz', 0.12, 0.05, sx * 0.62, -2.11, 0.86, n=12, rx=math.pi / 2))
        p.append(box('kirmizi', 0.16, 0.04, 0.12, sx * 0.7, 2.64, 0.82))
    p.append(box('koyu', 0.8, 0.04, 0.22, 0, -2.11, 0.75))
    # çamurluk kemerleri
    for sy in (-1.35, 1.6):
        for sx in (-1, 1): p.append(box('koyu', 0.06, 0.95, 0.3, sx * (W / 2 + 0.01), sy, 0.62))
    return join('pikap', p)

assets.append(pikap())

# aksesuarlar
assets.append(join('aks_bayrak', [cyl('gri', 0.012, 1.1, 0, 0, 0, n=6), pyramid('kirmizi', 0.02, 0.4, 0.3, 0, 0.2, 0.8)]))
assets.append(join('aks_cicek', [box('kiremit_k', 0.36, 0.12, 0.12, 0, 0, 0)] + [ico(['kirmizi', 'sari', 'mor', 'beyaz', 'kirmizi'][i], 0.06, -0.14 + i * 0.07, 0, 0.16) for i in range(5)] + [ico('yesil', 0.05, -0.1 + i * 0.1, 0.02, 0.12) for i in range(3)]))
assets.append(join('aks_zil', [cyl('sari', 0.045, 0.03, 0, 0, 0, n=12), ball('sari', 0.04, 0, 0, 0.035, seg=10)]))

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
