import { supabase } from './supabase'

export async function getCollection(slug) {
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching collection:', error)
    return null
  }

  return data
}

export async function getCollectionProducts(collectionSlug) {
  try {
    console.log('Fetching products for collection:', collectionSlug)
    
    const collection = await getCollection(collectionSlug)
    if (!collection) {
      console.log('Collection not found:', collectionSlug)
      return { collection: null, products: [] }
    }
    
    console.log('Found collection:', collection)
    
    // Fetch actual products from database with all related data
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select(`
        *,
        product_images!inner (
          id,
          image_url,
          alt_text,
          is_primary,
          sort_order,
          color_variant
        ),
        product_variants (
          id,
          name,
          sku,
          color,
          size,
          price,
          sale_price,
          stock_quantity,
          is_active
        )
      `)
      .eq('collection_id', collection.id)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (productsError) {
      console.error('Products query error:', productsError)
      throw productsError
    }

    console.log('Found products from database:', products)

    // Create variants based on actual product data or fallback to mock data
    if (products.length > 0) {
      const mainProduct = products[0]
      
      // Get unique color variants from the product
      const colorVariants = [...new Set(
        mainProduct.product_images
          .map(img => img.color_variant?.toLowerCase())
          .filter(Boolean)
      )]

      console.log('Available color variants:', colorVariants)

      // Create variants configuration from actual data
      const variantConfig = {
        black: { name: 'Midnight Black', color: '#000000', glow: 'rgba(255, 255, 255, 0.6)' },
        white: { name: 'Pure White', color: '#FFFFFF', glow: 'rgba(200, 200, 200, 0.8)' },
        red: { name: 'Sacred Red', color: '#DC2626', glow: 'rgba(220, 38, 38, 0.8)' },
        yellow: { name: 'Divine Gold', color: '#EAB308', glow: 'rgba(234, 179, 8, 0.8)' }
      }

      collection.variants = colorVariants.map(colorVariant => {
        const config = variantConfig[colorVariant] || { 
          name: colorVariant.charAt(0).toUpperCase() + colorVariant.slice(1), 
          color: '#666666', 
          glow: 'rgba(255, 255, 255, 0.6)' 
        }

        // Find matching product variant
        const matchingVariant = mainProduct.product_variants?.find(pv => 
          pv.color?.toLowerCase() === colorVariant
        )

        // Get images for this color variant, sorted by sort_order
        const variantImages = mainProduct.product_images
          .filter(img => img.color_variant?.toLowerCase() === colorVariant)
          .sort((a, b) => a.sort_order - b.sort_order)

        console.log(`Images for ${colorVariant}:`, variantImages.map(img => ({
          url: img.image_url,
          sort_order: img.sort_order
        })))

        // Use the second image (index 1) if available, otherwise first image
        const displayImage = variantImages.length > 1 ? variantImages[0] : variantImages[1]

        return {
          id: colorVariant,
          name: config.name,
          color: config.color,
          glow: config.glow,
          productSlug: mainProduct.slug,
          variantColor: colorVariant,
          sku: matchingVariant?.sku || `GODS-DONT-SLEEP-${colorVariant.toUpperCase()}-001`,
          price: matchingVariant?.price || mainProduct.price,
          images: displayImage ? [displayImage] : []
        }
      })

      console.log('Final variants with images:', collection.variants.map(v => ({
        color: v.variantColor,
        imageUrl: v.images[0]?.image_url,
        hasImage: v.images.length > 0
      })))
    } else {
      // Mock data fallback
      console.log('No products found in database, using mock data')
      
      const mockVariants = [
        {
          id: 'white',
          name: 'Pure White',
          color: '#FFFFFF',
          glow: 'rgba(200, 200, 200, 0.8)',
          productSlug: 'gods-dont-sleep-tee',
          variantColor: 'white',
          sku: 'GODS-DONT-SLEEP-WHITE-001',
          price: 49.99,
          images: [{
            image_url: 'https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_001/tees/GodsDontSleep-White-Front.jpg',
            alt_text: 'Pure White T-Shirt'
          }]
        },
        {
          id: 'black',
          name: 'Midnight Black',
          color: '#000000',
          glow: 'rgba(255, 255, 255, 0.6)',
          productSlug: 'gods-dont-sleep-tee',
          variantColor: 'black',
          sku: 'GODS-DONT-SLEEP-BLACK-001',
          price: 49.99,
          images: [{
            image_url: 'https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_001/tees/GodsDontSleep-Black-Front.jpg',
            alt_text: 'Midnight Black T-Shirt'
          }]
        },
        {
          id: 'red',
          name: 'Sacred Red',
          color: '#DC2626',
          glow: 'rgba(220, 38, 38, 0.8)',
          productSlug: 'gods-dont-sleep-tee',
          variantColor: 'red',
          sku: 'GODS-DONT-SLEEP-RED-001',
          price: 49.99,
          images: [{
            image_url: 'https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_001/tees/GodsDontSleep-Red-Front.jpg',
            alt_text: 'Sacred Red T-Shirt'
          }]
        },
        {
          id: 'yellow',
          name: 'Divine Gold',
          color: '#EAB308',
          glow: 'rgba(234, 179, 8, 0.8)',
          productSlug: 'gods-dont-sleep-tee',
          variantColor: 'yellow',
          sku: 'GODS-DONT-SLEEP-YELLOW-001',
          price: 49.99,
          images: [{
            image_url: 'https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_001/tees/GodsDontSleep-Yellow-Front.jpg',
            alt_text: 'Divine Gold T-Shirt'
          }]
        }
      ]

      collection.variants = mockVariants

      console.log('Final variants with images:', collection.variants.map(v => ({
        color: v.variantColor,
        imageUrl: v.images[0]?.image_url,
        hasImage: v.images.length > 0
      })))
    }

    return { collection, products }
  } catch (error) {
    console.error('Error fetching collection products:', error)
    throw error
  }
}

export async function getAllCollections() {
  const { data, error } = await supabase
    .from('collections')
    .select('id, name, slug, description')
    .eq('is_active', true)
    .order('created_at')

  if (error) {
    console.error('Error fetching collections:', error)
    return []
  }

  return data || []
}