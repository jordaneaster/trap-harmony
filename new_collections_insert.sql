-- Insert Concrete Rose Collection
INSERT INTO "public"."collections" ("id", "name", "slug", "description", "theme_config", "hero_config", "is_active", "created_at", "updated_at") 
VALUES (
    'collection_002', 
    'Concrete Rose Collection', 
    'concrete-rose', 
    'Beauty emerging from urban grit - streetwear that celebrates resilience and growth', 
    '{"colors": {"accent": "#ff69b4", "primary": "#2d2d2d", "secondary": "#8b5a5a", "background": "linear-gradient(135deg, #2d2d2d 0%, #4a4a4a 50%, #2d2d2d 100%)"}, "effects": {"glow": "rgba(255, 105, 180, 0.3)", "shadow": "rgba(255, 105, 180, 0.1)"}, "typography": {"bodyFont": "font-sans", "headingFont": "font-mono"}}', 
    '{"title": "CONCRETE ROSE", "ctaText": "Bloom Through It", "features": ["Hand-drawn Rose Graphic", "Premium Cotton Blend", "Urban-Inspired Colorway", "Limited Edition Drop"], "subtitle": "Beauty From The Streets", "description": "Born from concrete but destined to bloom. The Concrete Rose tee represents the strength to thrive in harsh conditions. Featuring artistic rose imagery merged with urban elements, this piece speaks to those who find beauty in struggle.", "productImage": "https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_002/products/ConcreteRose-Front.jpg", "overlayOpacity": 0.7, "backgroundImage": "https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_002/logos/Logo-concrete-rose.jpg"}', 
    'true', 
    NOW(), 
    NOW()
);

-- Insert Beauty Reloaded Collection
INSERT INTO "public"."collections" ("id", "name", "slug", "description", "theme_config", "hero_config", "is_active", "created_at", "updated_at") 
VALUES (
    'collection_003', 
    'Beauty Reloaded Collection', 
    'beauty-reloaded', 
    'Redefining beauty standards through bold streetwear aesthetics', 
    '{"colors": {"accent": "#gold", "primary": "#1a1a1a", "secondary": "#d4af37", "background": "linear-gradient(135deg, #1a1a1a 0%, #2f2f2f 50%, #1a1a1a 100%)"}, "effects": {"glow": "rgba(212, 175, 55, 0.3)", "shadow": "rgba(212, 175, 55, 0.1)"}, "typography": {"bodyFont": "font-sans", "headingFont": "font-mono"}}', 
    '{"title": "BEAUTY RELOADED", "ctaText": "Redefine Standards", "features": ["Bold Graphic Design", "Heavyweight Cotton", "Luxe Gold Accents", "Statement Piece"], "subtitle": "Beauty On Your Terms", "description": "Challenge conventional beauty with this statement piece. Beauty Reloaded represents self-expression without limits. Bold graphics and premium materials combine to create a tee that demands attention and respect.", "productImage": "https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_003/products/BeautyReloaded-Front.jpg", "overlayOpacity": 0.75, "backgroundImage": "https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_003/logos/Logo-beauty-reloaded.jpg"}', 
    'true', 
    NOW(), 
    NOW()
);

-- Insert Concrete Rose Product
INSERT INTO "public"."products" ("collection_id", "name", "slug", "description", "price", "sku", "is_active", "created_at", "updated_at") 
VALUES (
    'collection_002', 
    'Concrete Rose Tee', 
    'concrete-rose-tee', 
    'Premium streetwear tee featuring artistic rose imagery emerging from urban concrete. Made from heavyweight cotton blend for durability and comfort.', 
    4500, 
    'CR-TEE-001', 
    'true', 
    NOW(), 
    NOW()
);

-- Insert Beauty Reloaded Product
INSERT INTO "public"."products" ("collection_id", "name", "slug", "description", "price", "sku", "is_active", "created_at", "updated_at") 
VALUES (
    'collection_003', 
    'Beauty Reloaded Tee', 
    'beauty-reloaded-tee', 
    'Statement streetwear piece that challenges beauty standards. Features bold graphics and premium materials for those who define beauty on their own terms.', 
    4500, 
    'BR-TEE-001', 
    'true', 
    NOW(), 
    NOW()
);

-- Insert Product Images for Concrete Rose
INSERT INTO "public"."product_images" ("product_id", "image_url", "alt_text", "sort_order", "is_primary", "created_at") 
VALUES 
    ((SELECT id FROM products WHERE sku = 'CR-TEE-001'), 'https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_002/products/ConcreteRose-Front.jpg', 'Concrete Rose Tee Front View', 1, true, NOW()),
    ((SELECT id FROM products WHERE sku = 'CR-TEE-001'), 'https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_002/products/ConcreteRose-Back.jpg', 'Concrete Rose Tee Back View', 2, false, NOW()),
    ((SELECT id FROM products WHERE sku = 'CR-TEE-001'), 'https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_002/products/ConcreteRose-Detail.jpg', 'Concrete Rose Tee Detail View', 3, false, NOW());

-- Insert Product Images for Beauty Reloaded
INSERT INTO "public"."product_images" ("product_id", "image_url", "alt_text", "sort_order", "is_primary", "created_at") 
VALUES 
    ((SELECT id FROM products WHERE sku = 'BR-TEE-001'), 'https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_003/products/BeautyReloaded-Front.jpg', 'Beauty Reloaded Tee Front View', 1, true, NOW()),
    ((SELECT id FROM products WHERE sku = 'BR-TEE-001'), 'https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_003/products/BeautyReloaded-Back.jpg', 'Beauty Reloaded Tee Back View', 2, false, NOW()),
    ((SELECT id FROM products WHERE sku = 'BR-TEE-001'), 'https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_003/products/BeautyReloaded-Detail.jpg', 'Beauty Reloaded Tee Detail View', 3, false, NOW());

-- Insert Product Variants for Concrete Rose
INSERT INTO "public"."product_variants" ("product_id", "name", "size", "color", "sku", "price", "stock_quantity", "is_active", "created_at") 
VALUES 
    ((SELECT id FROM products WHERE sku = 'CR-TEE-001'), 'Concrete Rose Tee - S', 'S', 'Concrete Gray', 'CR-TEE-S-CG', 4500, 25, true, NOW()),
    ((SELECT id FROM products WHERE sku = 'CR-TEE-001'), 'Concrete Rose Tee - M', 'M', 'Concrete Gray', 'CR-TEE-M-CG', 4500, 30, true, NOW()),
    ((SELECT id FROM products WHERE sku = 'CR-TEE-001'), 'Concrete Rose Tee - L', 'L', 'Concrete Gray', 'CR-TEE-L-CG', 4500, 35, true, NOW()),
    ((SELECT id FROM products WHERE sku = 'CR-TEE-001'), 'Concrete Rose Tee - XL', 'XL', 'Concrete Gray', 'CR-TEE-XL-CG', 4500, 20, true, NOW());

-- Insert Product Variants for Beauty Reloaded
INSERT INTO "public"."product_variants" ("product_id", "name", "size", "color", "sku", "price", "stock_quantity", "is_active", "created_at") 
VALUES 
    ((SELECT id FROM products WHERE sku = 'BR-TEE-001'), 'Beauty Reloaded Tee - S', 'S', 'Midnight Black', 'BR-TEE-S-MB', 4500, 25, true, NOW()),
    ((SELECT id FROM products WHERE sku = 'BR-TEE-001'), 'Beauty Reloaded Tee - M', 'M', 'Midnight Black', 'BR-TEE-M-MB', 4500, 30, true, NOW()),
    ((SELECT id FROM products WHERE sku = 'BR-TEE-001'), 'Beauty Reloaded Tee - L', 'L', 'Midnight Black', 'BR-TEE-L-MB', 4500, 35, true, NOW()),
    ((SELECT id FROM products WHERE sku = 'BR-TEE-001'), 'Beauty Reloaded Tee - XL', 'XL', 'Midnight Black', 'BR-TEE-XL-MB', 4500, 20, true, NOW());