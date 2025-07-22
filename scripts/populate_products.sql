-- Add color_variant column to product_images if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product_images' AND column_name = 'color_variant') THEN
        ALTER TABLE product_images ADD COLUMN color_variant VARCHAR(50);
    END IF;
END $$;

-- First, clean up existing products created by the previous script
DELETE FROM product_images WHERE product_id IN (
  SELECT id FROM products WHERE created_at >= NOW() - INTERVAL '1 day'
);
DELETE FROM products WHERE created_at >= NOW() - INTERVAL '1 day';

-- Insert single products with variants for T-shirts
WITH category_ids AS (
  SELECT id as tees_id FROM categories WHERE slug = 'tees' AND is_active = true LIMIT 1
),
tee_product AS (
  INSERT INTO products (
    name, slug, description, short_description, price, sale_price, sku, 
    category_id, brand, is_active, is_featured, stock_quantity, manage_stock, 
    stock_status, meta_title, meta_description, created_at, updated_at
  )
  VALUES (
    'Gods Don''t Sleep Tee',
    'gods-dont-sleep-tee',
    'Premium quality t-shirt featuring the iconic "Gods Don''t Sleep" design. Made from soft, comfortable fabric perfect for everyday wear. Available in multiple colors.',
    'Premium Gods Don''t Sleep t-shirt - Available in Black, Red, White, and Yellow',
    29.99,
    NULL,
    'GODS-DONT-SLEEP-TEE-001',
    (SELECT tees_id FROM category_ids),
    'Trap Harmony',
    true,
    true,
    200,
    true,
    'in_stock',
    'Gods Don''t Sleep Tee - Premium T-shirt',
    'Premium quality t-shirt featuring the iconic "Gods Don''t Sleep" design. Made from soft, comfortable fabric perfect for everyday wear.',
    NOW(),
    NOW()
  )
  RETURNING id, name, slug
)
-- Insert all images for the single t-shirt product
INSERT INTO product_images (product_id, image_url, alt_text, is_primary, sort_order, color_variant)
SELECT 
  p.id,
  'trapnharmony/collection_001/tees/' || img.filename,
  p.name || ' - ' || img.color || ' - ' || img.view_type,
  img.is_primary,
  img.sort_order,
  img.color
FROM tee_product p
CROSS JOIN (
  -- Black t-shirt images (primary product images)
  SELECT 'GodsDontSleep-Black-Front.jpg' as filename, true as is_primary, 1 as sort_order, 'Black' as color, 'Front' as view_type
  UNION ALL SELECT 'GodsDontSleep-Black-Front-2.jpg', false, 2, 'Black', 'Front Alt'
  UNION ALL SELECT 'GodsDontSleep-Black-Back.jpg', false, 3, 'Black', 'Back'
  
  -- Red t-shirt images  
  UNION ALL SELECT 'GodsDontSleep-Red-Front.jpg', false, 4, 'Red', 'Front'
  UNION ALL SELECT 'GodsDontSleep-Red-Front-2.jpg', false, 5, 'Red', 'Front Alt'
  UNION ALL SELECT 'GodsDontSleep-Red-Back.jpg', false, 6, 'Red', 'Back'
  
  -- White t-shirt images
  UNION ALL SELECT 'GodsDontSleep-White-Front.jpg', false, 7, 'White', 'Front'
  UNION ALL SELECT 'GodsDontSleep-White-Front-2.jpg', false, 8, 'White', 'Front Alt'
  UNION ALL SELECT 'GodsDontSleep-White-Back.jpg', false, 9, 'White', 'Back'
  
  -- Yellow t-shirt images
  UNION ALL SELECT 'GodsDontSleep-Yellow-Front.jpg', false, 10, 'Yellow', 'Front'
  UNION ALL SELECT 'GodsDontSleep-Yellow-Front-2.jpg', false, 11, 'Yellow', 'Front Alt'
  UNION ALL SELECT 'GodsDontSleep-Yellow-Back.jpg', false, 12, 'Yellow', 'Back'
) img;

-- Insert single product for Hoodies
WITH category_ids AS (
  SELECT id as hoodies_id FROM categories WHERE slug = 'hoodies' AND is_active = true LIMIT 1
),
hoodie_product AS (
  INSERT INTO products (
    name, slug, description, short_description, price, sale_price, sku, 
    category_id, brand, is_active, is_featured, stock_quantity, manage_stock, 
    stock_status, meta_title, meta_description, created_at, updated_at
  )
  VALUES (
    'Premium Hoodie',
    'premium-hoodie',
    'Premium hoodie with exceptional construction and comfortable fit. Features quality materials and attention to detail. Available in Black, Red, and White colorways.',
    'Premium hoodie - Available in Black, Red, and White',
    59.99,
    NULL,
    'PREMIUM-HOODIE-001',
    (SELECT hoodies_id FROM category_ids),
    'Trap Harmony',
    true,
    true,
    90,
    true,
    'in_stock',
    'Premium Hoodie - Quality Construction',
    'Premium hoodie with exceptional construction and comfortable fit. Features quality materials and attention to detail.',
    NOW(),
    NOW()
  )
  RETURNING id, name, slug
)
-- Insert all images for the single hoodie product
INSERT INTO product_images (product_id, image_url, alt_text, is_primary, sort_order, color_variant)
SELECT 
  p.id,
  'trapnharmony/collection_001/hoodies/' || img.filename,
  p.name || ' - ' || img.color || ' - ' || img.view_type,
  img.is_primary,
  img.sort_order,
  img.color
FROM hoodie_product p
CROSS JOIN (
  -- Black hoodie images (primary product images)
  SELECT 'BlackHoodie-Front.jpg' as filename, true as is_primary, 1 as sort_order, 'Black' as color, 'Front' as view_type
  UNION ALL SELECT 'BlackHoodie-Back.jpg', false, 2, 'Black', 'Back'
  UNION ALL SELECT 'BlackHoodie-RedLogo.jpg', false, 3, 'Black', 'Logo Detail'
  
  -- Red hoodie images  
  UNION ALL SELECT 'RedHoodie-Front.jpg', false, 4, 'Red', 'Front'
  UNION ALL SELECT 'RedHoodie-Back.jpg', false, 5, 'Red', 'Back'
  UNION ALL SELECT 'RedHoodie-WhiteLogo.jpg', false, 6, 'Red', 'Logo Detail'
  
  -- White hoodie images
  UNION ALL SELECT 'WhiteHoodie-Front.jpg', false, 7, 'White', 'Front'
  UNION ALL SELECT 'WhiteHoodie-Back.jpg', false, 8, 'White', 'Back'
  UNION ALL SELECT 'WhiteHoodie-RedLogo.jpg', false, 9, 'White', 'Logo Detail'
) img;

-- Insert single product for Shorts
WITH category_ids AS (
  SELECT id as shorts_id FROM categories WHERE slug = 'shorts' AND is_active = true LIMIT 1
),
shorts_product AS (
  INSERT INTO products (
    name, slug, description, short_description, price, sale_price, sku, 
    category_id, brand, is_active, is_featured, stock_quantity, manage_stock, 
    stock_status, meta_title, meta_description, created_at, updated_at
  )
  VALUES (
    'Fire Shorts',
    'fire-shorts',
    'Stylish shorts with eye-catching fire design. Comfortable fit perfect for casual wear and active lifestyle. Available in multiple colorways including Black Orange, Black, Green, and Off White.',
    'Fire Shorts - Available in multiple colors',
    39.99,
    NULL,
    'FIRE-SHORTS-001',
    (SELECT shorts_id FROM category_ids),
    'Trap Harmony',
    true,
    true,
    160,
    true,
    'in_stock',
    'Fire Shorts - Stylish Design',
    'Stylish shorts with eye-catching fire design. Comfortable fit perfect for casual wear and active lifestyle.',
    NOW(),
    NOW()
  )
  RETURNING id, name, slug
)
-- Insert all images for the single shorts product
INSERT INTO product_images (product_id, image_url, alt_text, is_primary, sort_order, color_variant)
SELECT 
  p.id,
  'trapnharmony/collection_001/shorts/' || img.filename,
  p.name || ' - ' || img.color,
  img.is_primary,
  img.sort_order,
  img.color
FROM shorts_product p
CROSS JOIN (
  -- Black Orange shorts (primary product image)
  SELECT 'Fire-Shorts-Black-Orange.jpg' as filename, true as is_primary, 1 as sort_order, 'Black Orange' as color
  UNION ALL SELECT 'Fire-Shorts-Black.jpg', false, 2, 'Black'
  UNION ALL SELECT 'Fire-Shorts-Green.jpg', false, 3, 'Green'
  UNION ALL SELECT 'Fire-Shorts-OffWhite.jpg', false, 4, 'Off White'
) img;

-- Update existing records to have color_variant values
UPDATE product_images SET color_variant = 
  CASE 
    WHEN image_url LIKE '%Black%' THEN 'Black'
    WHEN image_url LIKE '%Red%' THEN 'Red'
    WHEN image_url LIKE '%White%' THEN 'White'
    WHEN image_url LIKE '%Yellow%' THEN 'Yellow'
    WHEN image_url LIKE '%Green%' THEN 'Green'
    WHEN image_url LIKE '%OffWhite%' THEN 'Off White'
    WHEN image_url LIKE '%Black-Orange%' THEN 'Black Orange'
    ELSE 'Default'
  END
WHERE color_variant IS NULL;

-- Display summary of created products
SELECT 
  c.name as category,
  p.name as product_name,
  COUNT(pi.id) as total_images,
  COUNT(CASE WHEN pi.is_primary THEN 1 END) as primary_images,
  STRING_AGG(DISTINCT pi.color_variant, ', ' ORDER BY pi.color_variant) as available_colors
FROM products p
JOIN categories c ON p.category_id = c.id
LEFT JOIN product_images pi ON p.id = pi.product_id
WHERE p.created_at >= NOW() - INTERVAL '1 minute'
GROUP BY c.name, p.name, p.id
ORDER BY c.name, p.name;
