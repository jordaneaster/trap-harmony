import { supabase } from './supabaseClient'

// Helper function to get the full public URL for an image
function getPublicImageUrl(imagePath) {
  if (!imagePath) return null
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  
  // Construct the public URL using the correct Supabase storage format
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const fullUrl = `${supabaseUrl}/storage/v1/object/public/${imagePath}`
  
  // Debug logging
  console.log('Original image path:', imagePath)
  console.log('Constructed URL:', fullUrl)
  
  return fullUrl
}

// Helper function to format product images
function formatProductImages(product) {
  if (!product.product_images) return product
  
  return {
    ...product,
    product_images: product.product_images.map(image => ({
      ...image,
      image_url: getPublicImageUrl(image.image_url)
    }))
  }
}

// Helper function to get unique colors for a product
function getProductColors(product) {
  if (!product.product_images) return []
  
  const colors = [...new Set(
    product.product_images
      .filter(img => img.color_variant)
      .map(img => img.color_variant)
  )]
  
  return colors
}

// Helper function to format product with color info
function formatProductWithColors(product) {
  if (!product.product_images) return product
  
  const formattedProduct = formatProductImages(product)
  
  return {
    ...formattedProduct,
    available_colors: getProductColors(product),
    primary_image: product.product_images.find(img => img.is_primary),
    front_images: product.product_images.filter(img => 
      img.image_url.includes('Front') && !img.image_url.includes('Front')
    ),
    back_images: product.product_images.filter(img => 
      img.image_url.includes('Back')
    )
  }
}

// Helper function to format a single product array
function formatProductsArray(products) {
  return (products || []).map(formatProductImages)
}

// Fetch all active categories
export async function getCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// Fetch products with optional category filter
export async function getProducts(categorySlug = null, limit = null) {
  try {
    let query = supabase
      .from('products')
      .select(`
        *,
        categories(id, slug, name),
        product_images(image_url, alt_text, is_primary, sort_order, color_variant)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) throw error
    return (data || []).map(formatProductWithColors)
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Fetch featured products
export async function getFeaturedProducts(limit = 6) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(id, slug, name),
        product_images(image_url, alt_text, is_primary, sort_order, color_variant)
      `)
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    
    console.log('Raw featured product data from Supabase:', data)
    const formattedData = (data || []).map(formatProductWithColors)
    console.log('Formatted featured product data:', formattedData)
    
    return formattedData
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

// Fetch single product by ID (numeric)
export async function getProductById(id) {
  const numericId = parseInt(id, 10)
  
  if (!numericId || isNaN(numericId)) {
    console.error('Invalid or missing product ID provided:', id)
    return null
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(id, slug, name),
        product_images(image_url, alt_text, is_primary, sort_order, color_variant),
        product_variants(*)
      `)
      .eq('id', numericId)
      .eq('is_active', true)
      .single()

    if (error) throw error
    
    console.log('Raw product data by ID:', data)
    const formattedData = data ? formatProductWithColors(data) : null
    console.log('Formatted product data by ID:', formattedData)
    
    return formattedData
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

// Fetch single product by slug
export async function getProductBySlug(slug) {
  if (!slug || typeof slug !== 'string') {
    console.error('Invalid or missing product slug provided:', slug)
    return null
  }

  console.log('Querying Supabase for product with slug:', slug)

  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(id, slug, name),
        product_images(image_url, alt_text, is_primary, sort_order, color_variant, variant_id),
        product_variants(*)
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    console.log('Supabase query result:', { data, error })

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }
    
    console.log('Raw product data by slug:', data)
    const formattedData = data ? formatProductWithColors(data) : null
    console.log('Formatted product data by slug:', formattedData)
    
    return formattedData
  } catch (error) {
    console.error('Error fetching product by slug:', error)
    return null
  }
}

// Fetch products by category slug
export async function getProductsByCategory(categorySlug) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories!inner(id, slug, name),
        product_images(image_url, alt_text, is_primary, sort_order, color_variant)
      `)
      .eq('is_active', true)
      .eq('categories.slug', categorySlug)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data || []).map(formatProductWithColors)
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}

// New function to get images by color variant
export async function getProductImagesByColor(productId, colorVariant) {
  try {
    const { data, error } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', productId)
      .eq('color_variant', colorVariant)
      .order('sort_order', { ascending: true })

    if (error) throw error
    
    return (data || []).map(image => ({
      ...image,
      image_url: getPublicImageUrl(image.image_url)
    }))
  } catch (error) {
    console.error('Error fetching product images by color:', error)
    return []
  }
}

export async function getCollections() {
  try {
    const { data, error } = await supabase.storage
      .from('trapnharmony')
      .list('', {
        limit: 100,
        offset: 0
      })

    if (error) throw error

    // Filter for collection folders
    const collections = data
      .filter(item => item.name.startsWith('collection_'))
      .map(item => ({
        id: item.name,
        name: item.name.replace('_', ' ').toUpperCase(),
        image: `https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/${item.name}/logos/Trap&Harmony-Final-Logo-Square.svg`,
        description: 'Premium Streetwear Collection'
      }))

    return collections
  } catch (error) {
    console.error('Error fetching collections:', error)
    return []
  }
}

// New function specifically for collection variants
export async function getCollectionVariants(collectionId) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        slug,
        price,
        product_variants (
          id,
          name,
          sku,
          color,
          price
        ),
        product_images (
          id,
          image_url,
          alt_text,
          sort_order,
          color_variant
        )
      `)
      .eq('collection_id', collectionId)
      .eq('is_active', true)
      .single()

    if (error) throw error

    // Process the data to create clean variant objects
    const variants = {}
    
    if (data.product_images) {
      data.product_images.forEach(image => {
        const color = image.color_variant?.toLowerCase()
        if (!color) return

        if (!variants[color]) {
          variants[color] = {
            images: [],
            variant: null
          }
        }
        variants[color].images.push(image)
      })
    }

    if (data.product_variants) {
      data.product_variants.forEach(variant => {
        const color = variant.color?.toLowerCase()
        if (color && variants[color]) {
          variants[color].variant = variant
        }
      })
    }

    // Sort images and select display image for each variant
    Object.keys(variants).forEach(color => {
      variants[color].images.sort((a, b) => a.sort_order - b.sort_order)
      // Use second image if available, otherwise first
      variants[color].displayImage = variants[color].images.length > 1 
        ? variants[color].images[1] 
        : variants[color].images[0]
    })

    return {
      productSlug: data.slug,
      productPrice: data.price,
      variants
    }

  } catch (error) {
    console.error('Error fetching collection variants:', error)
    return null
  }
}
