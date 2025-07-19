-- Insert categories
INSERT INTO categories (slug, name, description, sort_order) VALUES
('hoodies', 'Hoodies', 'Premium oversized hoodies with street-inspired designs', 1),
('pants', 'Pants', 'Urban cargo pants and street wear bottoms', 2),
('jackets', 'Jackets', 'Denim jackets and outerwear for the streets', 3),
('accessories', 'Accessories', 'Snapbacks, chains, and essential street accessories', 4),
('shoes', 'Shoes', 'High-performance street running and casual shoes', 5),
('sets', 'Sets', 'Complete track suit sets and coordinated outfits', 6);

-- Insert products (based on your mock data)
INSERT INTO products (name, slug, description, price, category_id, sku, is_featured, stock_quantity) VALUES
(
  'Oversized Street Hoodie',
  'oversized-street-hoodie',
  'Premium oversized hoodie with street-inspired graphics. Made from high-quality cotton blend for maximum comfort and durability.',
  89.99,
  (SELECT id FROM categories WHERE slug = 'hoodies'),
  'TH-HOOD-001',
  true,
  50
),
(
  'Urban Cargo Pants',
  'urban-cargo-pants',
  'Tactical-inspired cargo pants with multiple pockets. Perfect for urban exploration and street style.',
  119.99,
  (SELECT id FROM categories WHERE slug = 'pants'),
  'TH-PANT-001',
  true,
  30
),
(
  'Trap King Snapback',
  'trap-king-snapback',
  'Premium snapback with embroidered logo. Adjustable fit with authentic street style.',
  45.99,
  (SELECT id FROM categories WHERE slug = 'accessories'),
  'TH-ACC-001',
  false,
  75
),
(
  'Distressed Denim Jacket',
  'distressed-denim-jacket',
  'Vintage-inspired distressed denim jacket. Pre-washed for authentic worn look.',
  149.99,
  (SELECT id FROM categories WHERE slug = 'jackets'),
  'TH-JACK-001',
  true,
  25
),
(
  'Harmony Track Suit',
  'harmony-track-suit',
  'Complete track suit set with premium materials. Includes matching jacket and pants.',
  199.99,
  (SELECT id FROM categories WHERE slug = 'sets'),
  'TH-SET-001',
  true,
  20
),
(
  'Street Runner Sneakers',
  'street-runner-sneakers',
  'High-performance street running shoes. Designed for comfort and style.',
  159.99,
  (SELECT id FROM categories WHERE slug = 'shoes'),
  'TH-SHOE-001',
  false,
  40
);

-- Insert product images
INSERT INTO product_images (product_id, image_url, alt_text, is_primary, sort_order) VALUES
((SELECT id FROM products WHERE slug = 'oversized-street-hoodie'), 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500', 'Oversized Street Hoodie', true, 1),
((SELECT id FROM products WHERE slug = 'urban-cargo-pants'), 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500', 'Urban Cargo Pants', true, 1),
((SELECT id FROM products WHERE slug = 'trap-king-snapback'), 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500', 'Trap King Snapback', true, 1),
((SELECT id FROM products WHERE slug = 'distressed-denim-jacket'), 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500', 'Distressed Denim Jacket', true, 1),
((SELECT id FROM products WHERE slug = 'harmony-track-suit'), 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500', 'Harmony Track Suit', true, 1),
((SELECT id FROM products WHERE slug = 'street-runner-sneakers'), 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500', 'Street Runner Sneakers', true, 1);

-- Insert product variants for sizes
INSERT INTO product_variants (product_id, name, sku, attributes, stock_quantity) VALUES
-- Hoodie variants
((SELECT id FROM products WHERE slug = 'oversized-street-hoodie'), 'Small', 'TH-HOOD-001-S', '{"size": "S"}', 10),
((SELECT id FROM products WHERE slug = 'oversized-street-hoodie'), 'Medium', 'TH-HOOD-001-M', '{"size": "M"}', 15),
((SELECT id FROM products WHERE slug = 'oversized-street-hoodie'), 'Large', 'TH-HOOD-001-L', '{"size": "L"}', 20),
((SELECT id FROM products WHERE slug = 'oversized-street-hoodie'), 'Extra Large', 'TH-HOOD-001-XL', '{"size": "XL"}', 15),

-- Cargo pants variants
((SELECT id FROM products WHERE slug = 'urban-cargo-pants'), 'Small', 'TH-PANT-001-S', '{"size": "S"}', 8),
((SELECT id FROM products WHERE slug = 'urban-cargo-pants'), 'Medium', 'TH-PANT-001-M', '{"size": "M"}', 10),
((SELECT id FROM products WHERE slug = 'urban-cargo-pants'), 'Large', 'TH-PANT-001-L', '{"size": "L"}', 12),

-- Denim jacket variants
((SELECT id FROM products WHERE slug = 'distressed-denim-jacket'), 'Small', 'TH-JACK-001-S', '{"size": "S"}', 5),
((SELECT id FROM products WHERE slug = 'distressed-denim-jacket'), 'Medium', 'TH-JACK-001-M', '{"size": "M"}', 8),
((SELECT id FROM products WHERE slug = 'distressed-denim-jacket'), 'Large', 'TH-JACK-001-L', '{"size": "L"}', 12),

-- Track suit variants
((SELECT id FROM products WHERE slug = 'harmony-track-suit'), 'Small', 'TH-SET-001-S', '{"size": "S"}', 4),
((SELECT id FROM products WHERE slug = 'harmony-track-suit'), 'Medium', 'TH-SET-001-M', '{"size": "M"}', 8),
((SELECT id FROM products WHERE slug = 'harmony-track-suit'), 'Large', 'TH-SET-001-L', '{"size": "L"}', 8),

-- Sneaker variants
((SELECT id FROM products WHERE slug = 'street-runner-sneakers'), 'Size 8', 'TH-SHOE-001-8', '{"size": "8"}', 8),
((SELECT id FROM products WHERE slug = 'street-runner-sneakers'), 'Size 9', 'TH-SHOE-001-9', '{"size": "9"}', 10),
((SELECT id FROM products WHERE slug = 'street-runner-sneakers'), 'Size 10', 'TH-SHOE-001-10', '{"size": "10"}', 12),
((SELECT id FROM products WHERE slug = 'street-runner-sneakers'), 'Size 11', 'TH-SHOE-001-11', '{"size": "11"}', 10);
