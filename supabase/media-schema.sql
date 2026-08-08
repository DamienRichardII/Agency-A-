-- ══════════════════════════════════════════════════════════════════
-- AGENCY A — Gestionnaire de Médias
-- Exécuter dans l'éditeur SQL Supabase (supabase.com → SQL Editor)
-- ══════════════════════════════════════════════════════════════════

-- ────────────────────────────────────────────────────────────────
-- 1. TABLE site_media
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_media (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  page             text        NOT NULL,           -- 'a-propos', 'portfolio', 'collaborateurs', 'boutique', 'accueil'
  section          text        NOT NULL,           -- 'valeurs', 'galerie', 'profils', 'tirages'
  slot             text        NOT NULL,           -- identifiant unique de l'emplacement sur la page
  media_type       text        NOT NULL DEFAULT 'image',
  storage_path     text,                           -- chemin dans le bucket: 'a-propos/valeurs/valeur-1.jpg'
  public_url       text,                           -- URL publique Supabase Storage (null = fallback local actif)
  local_fallback   text,                           -- chemin local: 'assets/...' (toujours conservé)
  title            text,                           -- titre éditorial (optionnel)
  caption          text,                           -- légende visible sur le site
  description      text,                           -- description longue
  alt_text         text,                           -- attribut alt de l'image
  object_position  text        DEFAULT 'center',   -- contrôle CSS object-position
  display_order    int         DEFAULT 0,
  is_structural    boolean     DEFAULT true,       -- si true, suppression interdite
  created_at       timestamptz DEFAULT now(),
  updated_at       timestamptz DEFAULT now(),
  UNIQUE(page, section, slot)
);

-- ────────────────────────────────────────────────────────────────
-- 2. Trigger updated_at
-- ────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_site_media_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS site_media_updated_at ON site_media;
CREATE TRIGGER site_media_updated_at
  BEFORE UPDATE ON site_media
  FOR EACH ROW EXECUTE FUNCTION update_site_media_updated_at();

-- ────────────────────────────────────────────────────────────────
-- 3. Row Level Security
-- ────────────────────────────────────────────────────────────────
ALTER TABLE site_media ENABLE ROW LEVEL SECURITY;

-- Lecture publique (visiteurs et site)
DROP POLICY IF EXISTS "public_read_site_media" ON site_media;
CREATE POLICY "public_read_site_media" ON site_media
  FOR SELECT USING (true);

-- Admin — toutes opérations
DROP POLICY IF EXISTS "admin_all_site_media" ON site_media;
CREATE POLICY "admin_all_site_media" ON site_media
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );

-- ────────────────────────────────────────────────────────────────
-- 4. SEED — médias actuellement utilisés sur le site
-- (public_url = null → fallback local actif tant qu'Anaïs ne remplace pas)
-- ────────────────────────────────────────────────────────────────
INSERT INTO site_media (page, section, slot, alt_text, local_fallback, display_order, is_structural)
VALUES
  -- À PROPOS → Nos Valeurs (5 photos)
  ('a-propos', 'valeurs', 'valeur-1', 'Photographie Agency A — Valeur 1', 'assets/AnaisDescomps_AgencyA_CM-16.jpg', 1, true),
  ('a-propos', 'valeurs', 'valeur-2', 'Photographie Agency A — Valeur 2', 'assets/AnaisDescomps_AgencyA_CM-13.jpg', 2, true),
  ('a-propos', 'valeurs', 'valeur-3', 'Photographie Agency A — Valeur 3', 'assets/AnaisDescomps_AgencyA_CM-3.jpg',  3, true),
  ('a-propos', 'valeurs', 'valeur-4', 'Photographie Agency A — Valeur 4', 'assets/AnaisDescomps_AgencyA_CM-6.jpg',  4, true),
  ('a-propos', 'valeurs', 'valeur-5', 'Photographie Agency A — Valeur 5', 'assets/AnaisDescomps_AgencyA_CM-39.jpg', 5, true),

  -- PORTFOLIO → Galerie (8 photos)
  ('portfolio', 'galerie', 'photo-1', 'Paris Fashion Week — Agency A', 'assets/photos/paris-fashion-week/PFW25-11MARS-32.JPG',              1, true),
  ('portfolio', 'galerie', 'photo-2', 'Portrait Mode — Agency A',       'assets/photos/mode/081225_Elfie_AgencyA_Nocollection0-21.jpg',      2, true),
  ('portfolio', 'galerie', 'photo-3', 'Défilé Monteiro — Agency A',     'assets/photos/defile-monteiro/defile-mars-2025-436.jpg',            3, true),
  ('portfolio', 'galerie', 'photo-4', 'Produit Bulgari — Agency A',     'assets/photos/produit/BVLGARI-rose-goldea_AnaisDescomps_AgencyA_0.jpg', 4, true),
  ('portfolio', 'galerie', 'photo-5', 'Portrait Anaïs — Agency A',      'assets/portraits/Anais-22.jpg',                                     5, true),
  ('portfolio', 'galerie', 'photo-6', 'Portrait Céline — Agency A',     'assets/nos talents - galerie/celine-polas-25.jpg',                  6, true),
  ('portfolio', 'galerie', 'photo-7', 'Culinaire — Agency A',           'assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire_0.jpg',     7, true),
  ('portfolio', 'galerie', 'photo-8', 'Sport — Agency A',               'assets/photos/sport/NM1-28MARS.JPG',                               8, true),

  -- COLLABORATEURS → Profils (3 profils)
  ('collaborateurs', 'profils', 'elfie',   'Elfie — Mannequin',   'assets/nos talents - galerie/29012026_Elfie_AnaisDescomps_AgencyA_-9.jpg',        1, false),
  ('collaborateurs', 'profils', 'celine',  'Céline — Mannequin',  'assets/nos talents - galerie/celine-polas-25.jpg',                                  2, false),
  ('collaborateurs', 'profils', 'chaimaa', 'Chaïmaa — Mannequin', 'assets/photos/mode/2025-11-03_Chaimaa_mannequin_agence_mademoiselle_04.jpg',        3, false),

  -- BOUTIQUE → Tirages (6 photos)
  ('boutique', 'tirages', 'tirage-1', 'Série Défilé I',    'assets/photos/defile-monteiro/defile-mars-2025-426.jpg',           1, true),
  ('boutique', 'tirages', 'tirage-2', 'Portrait Mode I',   'assets/photos/mode/081225_Elfie_AgencyA_Nocollection0-21.jpg',     2, true),
  ('boutique', 'tirages', 'tirage-3', 'Still Life I',      'assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire_0.jpg',    3, true),
  ('boutique', 'tirages', 'tirage-4', 'Série Défilé II',   'assets/nos talents - galerie/celine-polas-25.jpg',                 4, true),
  ('boutique', 'tirages', 'tirage-5', 'Portrait Galerie',  'assets/nos talents - galerie/29012026_Elfie_AnaisDescomps_AgencyA_-9.jpg', 5, true),
  ('boutique', 'tirages', 'tirage-6', 'Collection Beauté', 'assets/portraits/Anais-22.jpg',                                    6, true)
ON CONFLICT (page, section, slot) DO NOTHING;

-- ────────────────────────────────────────────────────────────────
-- 5. SUPABASE STORAGE — bucket "site-media"
-- Exécuter SÉPARÉMENT dans SQL Editor (ou via Dashboard Storage)
-- ────────────────────────────────────────────────────────────────

-- Créer le bucket public (ou le créer manuellement dans Dashboard → Storage)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-media',
  'site-media',
  true,  -- lecture publique
  52428800,  -- 50 Mo max par fichier
  ARRAY['image/jpeg','image/jpg','image/png','image/webp','image/avif']
)
ON CONFLICT (id) DO NOTHING;

-- Politique lecture publique sur Storage
DROP POLICY IF EXISTS "public_read_site_media_storage" ON storage.objects;
CREATE POLICY "public_read_site_media_storage" ON storage.objects
  FOR SELECT USING (bucket_id = 'site-media');

-- Politique upload admin
DROP POLICY IF EXISTS "admin_insert_site_media_storage" ON storage.objects;
CREATE POLICY "admin_insert_site_media_storage" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'site-media' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );

-- Politique update admin
DROP POLICY IF EXISTS "admin_update_site_media_storage" ON storage.objects;
CREATE POLICY "admin_update_site_media_storage" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'site-media' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );

-- Politique delete admin
DROP POLICY IF EXISTS "admin_delete_site_media_storage" ON storage.objects;
CREATE POLICY "admin_delete_site_media_storage" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'site-media' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );
