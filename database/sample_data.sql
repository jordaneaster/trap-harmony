-- Insert sample categories with conflict resolution
INSERT INTO categories (slug, name, description, is_active, sort_order) VALUES
('hoodies', 'Hoodies', 'Premium streetwear hoodies and sweatshirts', true, 1),
('t-shirts', 'T-Shirts', 'Graphic tees and street style t-shirts', true, 2),
('jackets', 'Jackets', 'Urban outerwear and street jackets', true, 3),
('accessories', 'Accessories', 'Streetwear accessories and extras', true, 4),
('bottoms', 'Bottoms', 'Pants, shorts, and streetwear bottoms', true, 5),
('tops', 'Tops', 'Various street style tops and shirts', true, 6)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active,
  sort_order = EXCLUDED.sort_order,
  updated_at = NOW();

-- Clear existing products and related data to start fresh
DELETE FROM order_items WHERE product_id IN (SELECT id FROM products);
DELETE FROM cart_items WHERE product_id IN (SELECT id FROM products);
DELETE FROM product_variants WHERE product_id IN (SELECT id FROM products);
DELETE FROM product_images WHERE product_id IN (SELECT id FROM products);
DELETE FROM products;

-- Reset the sequence for products table
ALTER SEQUENCE products_id_seq RESTART WITH 1;

-- Insert sample products with real images from S3
INSERT INTO products (
  name, slug, description, short_description, price, sale_price, sku, 
  category_id, brand, is_active, is_featured, stock_quantity, stock_status
) VALUES
-- Hoodies
('Urban Shadow Hoodie', 'urban-shadow-hoodie', 
 'Premium heavyweight hoodie with distinctive streetwear aesthetic. Features a comfortable oversized fit perfect for layering and street style looks.', 
 'Premium heavyweight streetwear hoodie', 89.99, 74.99, 'TH-HOD-001', 
 (SELECT id FROM categories WHERE slug = 'hoodies'), 'Trap Harmony', true, true, 25, 'in_stock'),

('Midnight Graphic Hoodie', 'midnight-graphic-hoodie',
 'Bold graphic hoodie featuring unique urban artwork. Made from premium cotton blend for ultimate comfort and durability.',
 'Bold graphic hoodie with urban artwork', 94.99, null, 'TH-HOD-002', 
 (SELECT id FROM categories WHERE slug = 'hoodies'), 'Trap Harmony', true, true, 18, 'in_stock'),

('Street Legend Hoodie', 'street-legend-hoodie',
 'Classic streetwear hoodie with vintage-inspired graphics. Perfect for everyday wear with a relaxed comfortable fit.',
 'Classic streetwear hoodie with vintage graphics', 79.99, 69.99, 'TH-HOD-003', 
 (SELECT id FROM categories WHERE slug = 'hoodies'), 'Trap Harmony', true, false, 30, 'in_stock'),

-- T-Shirts
('Trap Wave Tee', 'trap-wave-tee',
 'Signature graphic tee featuring exclusive Trap Harmony artwork. Made from premium cotton for comfort and style.',
 'Signature graphic tee with exclusive artwork', 34.99, null, 'TH-TEE-001', 
 (SELECT id FROM categories WHERE slug = 't-shirts'), 'Trap Harmony', true, true, 45, 'in_stock'),

('Urban Flow T-Shirt', 'urban-flow-tshirt',
 'Minimalist streetwear tee with subtle branding. Perfect for layering or wearing solo with a modern street aesthetic.',
 'Minimalist streetwear tee with subtle branding', 29.99, 24.99, 'TH-TEE-002', 
 (SELECT id FROM categories WHERE slug = 't-shirts'), 'Trap Harmony', true, true, 35, 'in_stock'),

('City Lights Graphic Tee', 'city-lights-graphic-tee',
 'Eye-catching graphic tee inspired by urban nightlife. Features high-quality print that won\'t fade or crack.',
 'Urban nightlife inspired graphic tee', 39.99, null, 'TH-TEE-003', 
 (SELECT id FROM categories WHERE slug = 't-shirts'), 'Trap Harmony', true, false, 28, 'in_stock'),

-- Jackets
('Street Runner Jacket', 'street-runner-jacket',
 'Versatile urban jacket perfect for any weather. Features multiple pockets and a modern streetwear silhouette.',
 'Versatile urban jacket with modern silhouette', 129.99, 109.99, 'TH-JAC-001', 
 (SELECT id FROM categories WHERE slug = 'jackets'), 'Trap Harmony', true, true, 15, 'in_stock'),

('Metro Bomber Jacket', 'metro-bomber-jacket',
 'Classic bomber style with contemporary streetwear details. Premium materials and construction for lasting wear.',
 'Classic bomber with streetwear details', 149.99, null, 'TH-JAC-002', 
 (SELECT id FROM categories WHERE slug = 'jackets'), 'Trap Harmony', true, false, 12, 'in_stock'),

-- Tops
('Harmony Flow Top', 'harmony-flow-top',
 'Stylish streetwear top with unique design elements. Comfortable fit perfect for casual wear and street styling.',
 'Stylish streetwear top with unique design', 54.99, 44.99, 'TH-TOP-001', 
 (SELECT id FROM categories WHERE slug = 'tops'), 'Trap Harmony', true, true, 22, 'in_stock'),

('Urban Edge Top', 'urban-edge-top',
 'Contemporary streetwear top with edgy design details. Made from premium materials for comfort and style.',
 'Contemporary streetwear top with edgy details', 49.99, null, 'TH-TOP-002', 
 (SELECT id FROM categories WHERE slug = 'tops'), 'Trap Harmony', true, false, 20, 'in_stock'),

-- Bottoms
('Street Flow Joggers', 'street-flow-joggers',
 'Premium streetwear joggers with tapered fit. Features comfortable elastic waistband and stylish details.',
 'Premium streetwear joggers with tapered fit', 69.99, 59.99, 'TH-BOT-001', 
 (SELECT id FROM categories WHERE slug = 'bottoms'), 'Trap Harmony', true, true, 25, 'in_stock'),

('Urban Cargo Pants', 'urban-cargo-pants',
 'Modern cargo pants with streetwear styling. Multiple pockets and comfortable fit for urban adventures.',
 'Modern cargo pants with streetwear styling', 84.99, null, 'TH-BOT-002', 
 (SELECT id FROM categories WHERE slug = 'bottoms'), 'Trap Harmony', true, false, 18, 'in_stock'),

-- Accessories
('Trap Harmony Cap', 'trap-harmony-cap',
 'Signature streetwear cap with embroidered logo. Adjustable fit and premium construction for lasting wear.',
 'Signature streetwear cap with embroidered logo', 24.99, 19.99, 'TH-ACC-001', 
 (SELECT id FROM categories WHERE slug = 'accessories'), 'Trap Harmony', true, true, 50, 'in_stock'),

('Urban Beanie', 'urban-beanie',
 'Classic streetwear beanie with subtle branding. Perfect for cold weather styling with any outfit.',
 'Classic streetwear beanie with subtle branding', 19.99, null, 'TH-ACC-002', 
 (SELECT id FROM categories WHERE slug = 'accessories'), 'Trap Harmony', true, false, 40, 'in_stock'),

('Street Essentials Bag', 'street-essentials-bag',
 'Versatile streetwear bag perfect for daily carry. Multiple compartments and durable construction.',
 'Versatile streetwear bag for daily carry', 44.99, 39.99, 'TH-ACC-003', 
 (SELECT id FROM categories WHERE slug = 'accessories'), 'Trap Harmony', true, true, 15, 'in_stock'),

('Harmony Chain Necklace', 'harmony-chain-necklace',
 'Statement streetwear necklace with unique design. Premium materials and adjustable length.',
 'Statement streetwear necklace with unique design', 34.99, null, 'TH-ACC-004', 
 (SELECT id FROM categories WHERE slug = 'accessories'), 'Trap Harmony', true, false, 25, 'in_stock'),

('Urban Wrist Band', 'urban-wrist-band',
 'Stylish streetwear wristband with logo details. Comfortable fit and durable materials.',
 'Stylish streetwear wristband with logo details', 14.99, 12.99, 'TH-ACC-005', 
 (SELECT id FROM categories WHERE slug = 'accessories'), 'Trap Harmony', true, false, 60, 'in_stock');

-- Insert product images using the correct storage paths
INSERT INTO product_images (product_id, image_url, alt_text, is_primary, sort_order) VALUES
-- Urban Shadow Hoodie
(1, 'trapnharmony/collection_001/516345337_1489224522428572_5623177442040038584_n.jpg', 'Urban Shadow Hoodie Front View', true, 1),
(1, 'trapnharmony/collection_001/517016137_1447611112924738_6942120108435701265_n.jpg', 'Urban Shadow Hoodie Detail', false, 2),

-- Midnight Graphic Hoodie
(2, 'trapnharmony/collection_001/516794669_1405786944271920_7233768240644253230_n.jpg', 'Midnight Graphic Hoodie Front', true, 1),
(2, 'trapnharmony/collection_001/517377797_1372356400506978_442292032489118811_n.jpg', 'Midnight Graphic Hoodie Back', false, 2),

-- Street Legend Hoodie
(3, 'trapnharmony/collection_001/517054143_598333876679756_3365907130832465045_n.jpg', 'Street Legend Hoodie', true, 1),
(3, 'trapnharmony/collection_001/517779848_739216608818580_7242524254794358789_n.jpg', 'Street Legend Hoodie Style', false, 2),

-- Trap Wave Tee
(4, 'trapnharmony/collection_001/517962274_4161725137483008_954722822349993528_n.jpg', 'Trap Wave Tee Front', true, 1),
(4, 'trapnharmony/collection_001/518243151_3937103249934270_8112915894639229487_n.jpg', 'Trap Wave Tee Detail', false, 2),

-- Urban Flow T-Shirt
(5, 'trapnharmony/collection_001/518977745_1231826451972379_7007495672871591211_n.jpg', 'Urban Flow T-Shirt', true, 1),
(5, 'trapnharmony/collection_001/519160168_1939945680109651_9173667152813354262_n.jpg', 'Urban Flow T-Shirt Style', false, 2),

-- City Lights Graphic Tee
(6, 'trapnharmony/collection_001/519676869_1985448182259505_8873342737390339287_n.jpg', 'City Lights Graphic Tee', true, 1),
(6, 'trapnharmony/collection_001/520823783_568854326163880_8278818079842208970_n.jpg', 'City Lights Tee Detail', false, 2),

-- Street Runner Jacket
(7, 'trapnharmony/collection_001/520929351_2378592569191990_5269214665682564198_n.jpg', 'Street Runner Jacket', true, 1),
(7, 'trapnharmony/collection_001/521001878_1111190484377691_1323746918228870502_n.jpg', 'Street Runner Jacket Detail', false, 2),

-- Metro Bomber Jacket
(8, 'trapnharmony/collection_001/521070688_754571897025619_8103432366640113246_n.jpg', 'Metro Bomber Jacket', true, 1),

-- Harmony Flow Top
(9, 'trapnharmony/collection_001/519160168_1939945680109651_9173667152813354262_n.jpg', 'Harmony Flow Top', true, 1),

-- Urban Edge Top
(10, 'trapnharmony/collection_001/518243151_3937103249934270_8112915894639229487_n.jpg', 'Urban Edge Top', true, 1),

-- For remaining products
(11, 'trapnharmony/collection_001/516345337_1489224522428572_5623177442040038584_n.jpg', 'Street Flow Joggers', true, 1),
(12, 'trapnharmony/collection_001/516794669_1405786944271920_7233768240644253230_n.jpg', 'Urban Cargo Pants', true, 1),
(13, 'trapnharmony/collection_001/517016137_1447611112924738_6942120108435701265_n.jpg', 'Trap Harmony Cap', true, 1),
(14, 'trapnharmony/collection_001/517054143_598333876679756_3365907130832465045_n.jpg', 'Urban Beanie', true, 1),
(15, 'trapnharmony/collection_001/517377797_1372356400506978_442292032489118811_n.jpg', 'Street Essentials Bag', true, 1),
(16, 'trapnharmony/collection_001/517779848_739216608818580_7242524254794358789_n.jpg', 'Harmony Chain Necklace', true, 1),
(17, 'trapnharmony/collection_001/517962274_4161725137483008_954722822349993528_n.jpg', 'Urban Wrist Band', true, 1);

-- Insert product variants for sizes
INSERT INTO product_variants (product_id, name, sku, attributes, stock_quantity, is_active) VALUES
-- Hoodies
(1, 'Urban Shadow Hoodie - XS', 'TH-HOD-001-XS', '{"size": "XS"}', 3, true),
(1, 'Urban Shadow Hoodie - S', 'TH-HOD-001-S', '{"size": "S"}', 5, true),
(1, 'Urban Shadow Hoodie - M', 'TH-HOD-001-M', '{"size": "M"}', 8, true),
(1, 'Urban Shadow Hoodie - L', 'TH-HOD-001-L', '{"size": "L"}', 6, true),
(1, 'Urban Shadow Hoodie - XL', 'TH-HOD-001-XL', '{"size": "XL"}', 3, true),

(2, 'Midnight Graphic Hoodie - S', 'TH-HOD-002-S', '{"size": "S"}', 4, true),
(2, 'Midnight Graphic Hoodie - M', 'TH-HOD-002-M', '{"size": "M"}', 6, true),
(2, 'Midnight Graphic Hoodie - L', 'TH-HOD-002-L', '{"size": "L"}', 5, true),
(2, 'Midnight Graphic Hoodie - XL', 'TH-HOD-002-XL', '{"size": "XL"}', 3, true),

-- T-Shirts
(4, 'Trap Wave Tee - S', 'TH-TEE-001-S', '{"size": "S"}', 8, true),
(4, 'Trap Wave Tee - M', 'TH-TEE-001-M', '{"size": "M"}', 12, true),
(4, 'Trap Wave Tee - L', 'TH-TEE-001-L', '{"size": "L"}', 15, true),
(4, 'Trap Wave Tee - XL', 'TH-TEE-001-XL', '{"size": "XL"}', 10, true),

(5, 'Urban Flow T-Shirt - S', 'TH-TEE-002-S', '{"size": "S"}', 7, true),
(5, 'Urban Flow T-Shirt - M', 'TH-TEE-002-M', '{"size": "M"}', 10, true),
(5, 'Urban Flow T-Shirt - L', 'TH-TEE-002-L', '{"size": "L"}', 12, true),
(5, 'Urban Flow T-Shirt - XL', 'TH-TEE-002-XL', '{"size": "XL"}', 6, true),

-- Accessories (One Size)
(13, 'Trap Harmony Cap - One Size', 'TH-ACC-001-OS', '{"size": "One Size"}', 50, true),
(14, 'Urban Beanie - One Size', 'TH-ACC-002-OS', '{"size": "One Size"}', 40, true),
(15, 'Street Essentials Bag - One Size', 'TH-ACC-003-OS', '{"size": "One Size"}', 15, true),
(16, 'Harmony Chain Necklace - One Size', 'TH-ACC-004-OS', '{"size": "One Size"}', 25, true),
(17, 'Urban Wrist Band - One Size', 'TH-ACC-005-OS', '{"size": "One Size"}', 60, true);
